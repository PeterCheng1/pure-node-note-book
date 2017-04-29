	/*
	 * @author Sheldon
	 *静态资源服务	
	 */

	// let context = {
	//     req: request,
	//     reqCtx: {},
	//     res: response,
	//     resCtx: {}
	// }参数格式

	const path = require('path');
	const fs = require('fs');
	const mime = require('mime');

	let getPath = url => path.resolve(process.cwd(), 'public', `.${url}`); //处理path


	let staticFun = ctx => {
	        let { url } = ctx.req;
	        let { resCtx } = ctx;
	        return new Promise((resolve, reject) => {
	            if (url.match(/\./) && !url.match('action')) {
	                let _path = getPath(url);
	                resCtx.headers = Object.assign(resCtx.headers, {
	                    "Content-Type": mime.lookup(_path)
	                });
	                fs.readFile(_path, (err, data) => {
	                    if (err) {
	                        resCtx.body = `NOT FOUND ${err.stack}`
	                    } else {
	                        resCtx.body = data;
	                    }
	                    resolve();
	                })
	            } else {
	                resolve()
	            }

	        })
	    }
	    //对静态资源的请求进行封装处理
	module.exports = staticFun;
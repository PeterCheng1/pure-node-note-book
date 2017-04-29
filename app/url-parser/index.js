    /**
     * author : Sheldon-yee
     * url-parser:处理客户端数据
     * request:query + body + method 
     */
    // let context = {
    //     req: request,
    //     reqCtx: {},
    //     res: response,
    //     resCtx: {}
    // }参数格式
    const Url = require('url');

    module.exports = (ctx) => {
        let { method, url } = ctx.req;
        let { reqCtx } = ctx;
        /*
         * query是对象
         * pathname是路径
        */
        method = method.toLowerCase();
        Object.assign(reqCtx,Url.parse(url,true),{method:method});
        return Promise.resolve({
            then: (resolve, reject) => {
                if (method === 'post') {
                    //request原型链 readable stream eventEmitter Object
                    // BS模型 B(浏览器) post数据 以Stream形式通过管道 ==socket== 达到服务器  S(服务器)
                    let data = [];
                    //stream可以分为paused(死河) 和 flow(会流动的河)两种状态
                    ctx.req.on('data', (chunk) => {
                        data.push(chunk);
                    }).on('end', () => {
                        let endData = Buffer.concat(data).toString();
                        reqCtx.body = JSON.parse(endData);
                        //通知下一个流程
                        resolve()
                    })
                } else {
                    resolve()
                }
            }
        })
    }
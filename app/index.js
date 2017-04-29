	/*
	 *主要核心逻辑入口
	 */

	const fs = require('fs');

	const path = require('path');

	class App {

	    constructor() {
	        this.middlewareArr = [];
	        //设计一个空的Promise
	        this.middlewareChain = Promise.resolve();
	    }
	    use(middleware) {
	        this.middlewareArr.push(middleware)
	    }

	    //创建Promise链
	    composeMiddleWare(context) {
	        let { middlewareArr } = this;
	        for (let middleware of middlewareArr) {
	            this.middlewareChain = this.middlewareChain.then(() => {
	                return middleware(context);
	            })
	        }
	        //根据中间件创建Promise链条
	        return this.middlewareChain;
	    }
	    initServer(request, response) {

	        //初始化工作区域

	        return (request, response) => {
	            //所有中间件只依赖三块东西: Promise request response

	            let context = {
	                    req: request,
	                    reqCtx: {
	                        body: '', //处理POST请求的数据
	                        query: {} //处理客户端get请求
	                    },
	                    res: response,
	                    resCtx: {
							hasUser : false,//用来标识用户
	                        statusMessage: 'resolve ok', //状态信息
	                        statusCode: 200, //状态码
	                        headers: {}, //返回response报文
	                        body: '' //返回内容给前端
	                    }
	                } //模型抽象，对response 和 request对象进行处理
	            this.composeMiddleWare(context).then(() => {
	                let base = { 'x-powered-by': 'Node.js' };
	                let { body, headers, statusCode, statusMessage } = context.resCtx;


	                response.writeHeader(statusCode, statusMessage, Object.assign(base, headers))
	                response.end(body);
	            }); //实现koa框架的调用形式


	            // urlParser(context).then(() => {
	            //     return apiServer(context)
	            // }).then(() => {
	            //     return staticServer(context);
	            // }).then(data => {
	            //     let base = { 'x-powered-by': 'Node.js' };
	            //     let { body, headers } = context.resCtx;
	            //     response.writeHeader(200, 'ok', Object.assign(base, headers))
	            //     response.end(body);
	            // })
	        }
	    }
	}

	module.exports = App;
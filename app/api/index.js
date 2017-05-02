/*
 *api server @author:Sheldon-Yee
 */
//当处理程序进入到此中间件,首先require到路由和ajax文件，而ajax文件主要是对路由文件的Router
//的映射表存入对应的pathName和对应的handle,待handle处理程序处理完毕将程序返回给后序的then
//返回给前端
let Router = require('./router');
require('./ajax');
module.exports = (ctx) => {
    let { resCtx, reqCtx } = ctx;
    let {pathname} = reqCtx;//将url调整为使用pathname
        //Situation 1:Promise.resolve([]);
        //Situation 2:Promise.resolve(undefined); 
    return Promise.resolve({
        then:(resolve,reject)=>{
            if(pathname.match('action')){
                return Router.routes(ctx).then(val=>{
                    resCtx.body = JSON.stringify(val);
                    resCtx.headers = Object.assign(resCtx.headers,{
                        "Content-Type":"application/json"
                    })
                    resolve()
                })
            }else{
                resolve()
            }
        }
    })
}
//request原型链 readable stream eventEmitter Object
// BS模型 B(浏览器) post数据 以Stream形式通过管道 ==socket== 达到服务器  S(服务器)
//stream可以分为paused(死河) 和 flow(会流动的河)两种状态
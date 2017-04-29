/*
 *api server @author:Sheldon-Yee
 */

let Router = require('./router');
require('./ajax');
module.exports = (ctx) => {
    let { resCtx, reqCtx } = ctx;
    let {pathname} = reqCtx;
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
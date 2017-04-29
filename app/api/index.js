/*
 *api server
 */


module.exports = (ctx) => {
    let { url, method } = ctx.req;
    let { resCtx, reqCtx } = ctx;
    let urlMap = {
        '/shop.action': ['Macbook', 'Iphone8', 'nokia', 'book'],
        '/Users.action': ['SheldonYee', '21', 'senior']
    }
    method = method.toLowerCase()
        //Situation 1:Promise.resolve([]);
        //Situation 2:Promise.resolve(undefined); 
    return Promise.resolve().then(() => {
        if (url.match('action')) {
            if (method === 'get') {
                resCtx.body = JSON.stringify(urlMap[url])
            } else {
                let { body } = reqCtx;
                resCtx.body = JSON.stringify(body);
                //request原型链 readable stream eventEmitter Object
                // BS模型 B(浏览器) post数据 以Stream形式通过管道 ==socket== 达到服务器  S(服务器)
                //stream可以分为paused(死河) 和 flow(会流动的河)两种状态
            }
            let header = { "Content-Type": "application/json" };
            resCtx.headers = Object.assign(resCtx.headers, header)
        }
    })
}
/*
 * Cookie-parser 处理Cookie
 * Author:Sheldon-Yee
 */

//映射表 ejs动态渲染数据
const cookie_parser = require('cookie');
const whiteName = ['/name_SheldonYee'] //设置白名单，即是可以登录的名单
module.exports = (ctx) => {
    let { pathname } = ctx.reqCtx;
    let { cookie } = ctx.req.headers;
    let { resCtx, res } = ctx;
    let cookieObj = cookie_parser.parse(cookie);
    return Promise.resolve().then(() => {
        //实现逻辑
        let cookieStr = (time) => `authd=Sheldon;Max-Age=${time};HttpOnly;`;
        if (cookieObj['authd']) {
            resCtx.hasUser = true;
            res.setHeader('Set-Cookie', cookieStr(3600)); //刷新的时候，如果是authd成功，则延长时间
        }
        if (whiteName.indexOf(pathname) > -1) {
            res.setHeader('Set-Cookie', cookieStr(3600));
        }
        if (pathname === '/logout') {
            res.setHeader('Set-Cookie', cookieStr(0)); //登出，直接设置cookie的生存时间为0；
        }
    })
}
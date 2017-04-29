/*
 * view-serve
 * Author:Sheldon-Yee
 */

//映射表 ejs动态渲染数据

const ejs = require('ejs')
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const urlrewriteMap = require('./urlrewrite');


module.exports = (ctx) => {
    let { req, resCtx } = ctx;
    let { url } = req;
    return Promise.resolve().then(() => {
        if (url.match('action') || url.match(/\./)) {
            return;
        } else {
            const viewPath = path.resolve(__dirname, 'ejs');
            let ejsName = urlrewriteMap[url];
            if (ejsName) {
                let layoutPath = path.resolve(viewPath, 'layout.ejs');
                let layoutHtml = fs.readFileSync(layoutPath, 'utf8');
                let render = ejs.compile(layoutHtml, {
                    compileDebug: true,
                    filename: layoutPath
                })
                let html = render({
                    templateName: ejsName,
                    hasUser : resCtx.hasUser
                })
                resCtx.headers = Object.assign(resCtx.headers, {
                    "Content-Type": 'text/html'
                })
                resCtx.body = html;
            } else {
                //重定向
                resCtx.headers = Object.assign(resCtx.headers, {
                    'location': '/'
                })
                resCtx.statusCode = 302;
                resCtx.statusMessage = "redirect";
                resCtx.body = '';
            }
        }
    })
}
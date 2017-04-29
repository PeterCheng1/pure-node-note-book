/*
 * 学习Cookie
 */

const http = require('http');
const cookie = require('./cookie');
const directiveCookie = require('./directive-cookie');

http.createServer((req, res) => {
    let cookieBody = directiveCookie(req, res);
    res.writeHead(200, 'ok');
    res.end(JSON.stringify(cookieBody));
}).listen(3000)
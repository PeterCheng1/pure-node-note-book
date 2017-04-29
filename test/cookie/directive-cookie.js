/*
 * 测试Cookie指令，例如Max-age and Expire等等
 */

module.exports = (req, res) => {
    let Expires = `Expires = ${(new Date(9231231231999)).toUTCString()}`;
    let Maxage = 'Max-age = 3600';
    let httponly = 'HttpOnly';
    let secure = 'Secure';
    let sessionCookie = [
        `userId = SheldonYee`,
        Maxage,
        // Expires,
        httponly,
        secure //在非https和SSL协议下，会导致cookie失效
    ].join(';')
    res.setHeader('Set-Cookie', sessionCookie);
    return req.headers;
}
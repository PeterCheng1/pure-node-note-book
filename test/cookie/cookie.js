/*
 * 测试Cookie
*/

module.exports = (req,res)=>{
    let sessionCookie =  'userId=SheldonYee;Max-age=5;'
    res.setHeader('Set-Cookie',sessionCookie);
    return req.headers;
}

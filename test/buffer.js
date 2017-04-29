const assert = require('assert'); //断言

//---------学习Buffer.from()参数及数据转换-----------

//1.(string , encoding)

//1.encoding

// const testEncoding = "Hello Node.js"

// let buf1 = Buffer.from(testEncoding, 'utf8');

// console.log(buf1);

// let buf2 = Buffer.from([0x68, 0x65, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c])

// console.log(buf2.toString())

// let test = "你好";
// console.log(Buffer.from(test, 'utf8'))


//-------Buffer应用场景
/*1.stream读取字节丢失问题，Node做了兼容*/
const fs = require('fs')
let data = fs.createReadStream('./test/tmp', {
    highWaterMark: 1
});
let out = [];
data.on('data', (chunk) => {
    // out += chunk; //==>out = out.toString()+chunk.toString()
    out.push(chunk);
}).on('end', () => {
    out = Buffer.concat(out).toString();
    console.log(out)
});

const buf = Buffer.from('buffer')

console.log(buf)
const express = require('express');
const server = express();
const expressStatic = require('express-static');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

server.use(cookieParser('adhdsjkfhsdhf'));

server.use('/', function(req, res) {
    // 给cookie加秘钥
    req.secret = 'adhdsjkfhsdhf';   // s%3Ajack.gYhETkLt8TFSGz%2FRoahJGAd9c6OV%2FnikQNpQxnxvbFU
    // 发送cookie
    res.cookie('name', 'jack', {path: '/', maxAge: 24 * 30 * 3600 * 1000, signed: true});

    console.log(req.signedCookies);   // 签名过的cookie
    console.log(req.cookies);         // 无签名的cookie
    
    // 删除cookie
    res.clearCookie('user');
    res.send('ok');
})

server.listen(8080);
server.use(expressStatic(__dirname + '/www'));
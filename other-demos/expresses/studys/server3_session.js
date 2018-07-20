const express = require('express');
const server = express();
const expressStatic = require('express-static');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

server.use(cookieParser());

server.use(cookieSession({
    name: 'sess',
    keys: ['aaa', 'bbb', 'ccc'],
    maxAge: 24*3600*1000,
}))

server.use('/', function(req, res) {
    res.cookie('name', 'bob', {path: '/', maxAge: 10*20020})
    if(req.session['count'] == null) {
        req.session['count'] = 1;
    } else {
        req.session['count'] ++;
    }

    console.log(req.session['count']);

    delete req.session;
    res.send('ok');
})

server.listen(8080);
server.use(expressStatic(__dirname + '/www'));


/*
    cookie 
        存在客户端的4K的数据；
    session
        存在服务器端，安全；
        基于cookie，存入cookie里一个id；
*/
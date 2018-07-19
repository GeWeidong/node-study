const express = require('express');
const server = express();
const expressStatic = require('express-static');

var users = {
    'aaa': '123',
    'bbb': '234',
    'ccc': '345',
}

server.get('/login', function(req, res) {
    const queryObj = req.query;
    if(!users[queryObj.user]) {
        res.send({ok: false, msg: '该用户不存在'});
    } else {
        if(users[queryObj.user] !== queryObj.pass) {
            res.send({ok: false, msg: '密码错误'});
        }
        if(users[queryObj.user] == queryObj.pass) {
            res.send({ok: false, msg: '成功'});
        }
    }
})

server.listen(8080);
server.use(expressStatic(__dirname + '/www'));
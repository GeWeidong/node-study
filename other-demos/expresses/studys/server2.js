const express = require('express');
const server = express();
const expressStatic = require('express-static');
const bodyParser = require('body-parser');

server.use(function(req, res, next) {
    let str = '';
    req.on('data', function(data) {
        str += data;
    });
    req.on('end', function() {
        req.body = str;
        next();
    })
})

// server.use(bodyParser.urlencoded());

server.use('/', function(req, res) {
    console.log(req.body);
})

server.listen(8080);
server.use(expressStatic(__dirname + '/www'));
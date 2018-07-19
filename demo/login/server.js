var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var urlLib = require('url');

var userObj = {};

var server = http.createServer(function(req, res) {

    // 解析数据
    var str = '';
    req.on('data', function(data) {
        str += data;

    })

    req.on('end', function() {
        var objUrl = urlLib.parse(req.url, true);
        console.log(objUrl)
        var url   = objUrl.pathname;
        var query = objUrl.query;

        if(url == '/user') {
            switch(query.act) {
                case 'reg':
                    if(userObj[query.user]) {
                        res.write(' {"ok": false, "msg": "此用户已经存在"} ');
                    } else {
                        userObj[query.user] = query.pass;
                        res.write(' {"ok": true, "msg": "注册成功！"} ');
                    }
                    break;
                case 'login':
                    if(userObj[query.user]) {
                        res.write(' {"ok": true, "msg": "登录成功"} ');
                    } else {
                        res.write(' {"ok": false, "msg": "此用户不存在，请注册"} ');
                    }
                    break;
                default: 
                    res.write(' {"ok": false, "msg": "此用户不存在"} ')
                    break;
            }

            res.end();
        } else {
            // console.log(url);
            var file_name = './www' + url;
            console.log(file_name)
            fs.readFile(file_name, function(err, data) {
                if(err) {
                    res.write('404');
                } else {
                    res.write(data);
                }

                res.end();
            })
        }
    })

    
});

server.listen(9527);




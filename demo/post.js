var http = require('http');
var querystring = require('querystring');

http.createServer(function(req, res) {
    var str = ''; // 接收数据
    var n = 0;
    req.on('data', function(data) {
        // post数据量很大   ---》  分段接收数据
        console.log(`第${n++}次接收数据`)
        str += data;
    });
    req.on('end', function() {
        // 接受完成
        console.log(str)    //  user=gewd&pass=sdfsdfsdfsdf
        const str2 = querystring.parse(str);
        console.log(str2);  // { user: 'gewd水电费水电费', pass: 'sdfsdfsdfs' }
    })
}).listen(8080) 
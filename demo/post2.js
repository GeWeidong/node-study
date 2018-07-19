var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var urlLib = require('url');

http.createServer(function(req, res) {
    // GET
    var obj = urlLib.parse(req.url, true);

    var url = obj.pathname;
    var GET = obj.query;

    // POST
    var str = '';
    req.on('data', function(data) {
        str += data;
    })
    req.on('end', function() {
        const POST = querystring.parse(str);

        var fileName = './www' + url;

        fs.readFile(fileName, function(err, data) {
            if(err) {
                console.log(err);
                res.write('404');
            } else {
                res.write(data);
            }

            res.end();
        })
    })
}).listen(8080) 
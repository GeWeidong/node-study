// Hello World HTTP服务器 
/*方式一：*/
var http = require('http');
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('hi http!');
}).listen(3000);

/*方式二：*/
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
	re.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('hi http!')
});

server.listen(3000);

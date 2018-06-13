/*
	POST请求体字符串缓存
*/

var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
	switch (req.method) {
		case 'POST':
			var item = "";
			req.setEncoding('utf8');
			req.on('data', function (chunk) {
				item += chunk;
			});
			req.on('end', function () {
				items.push(item);
				res.end('OK\n');
			})
			break;
		case 'GET':
			var body = items.map(function(item, index) {
				return i + ') ' + item;
			}).join('\n');
			res.setHeader('Content-Length', Buffer.byteLength(body));
			res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
			res.end(body);
			break;
	}
})

// require('url').parse('http://localhost:8000/1?api-key=foobar')
// ------>输出
// Url {
  // protocol: 'http:',
  // slashes: true,
  // auth: null,
  // host: 'localhost:8000',
  // port: '8000',
  // hostname: 'localhost',
  // hash: null,
  // search: '?api-key=foobar',
  // query: 'api-key=foobar',
  // pathname: '/1',
  // path: '/1?api-key=foobar',
  // href: 'http://localhost:8000/1?api-key=foobar' }
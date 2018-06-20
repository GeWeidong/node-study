var http = require('http');

var req = http.request({
	method: 'POST',
	port: 8000,
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': 40 * 1024
	}
})

req.write('[');
var n = 300000;
while(n--) {
	req.write('"foo", ');
}
req.write(']');

req.end();


// 报错：  request entity too large 
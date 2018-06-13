/*
	最基本的ReadStream静态文件服务器
*/

var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;  // E:\demoSpace\nodeStudy\GewdGithub\node-study\other-demos\demo2

var server = http.createServer(function(req, res) {

	var url = parse(req.url);  
	// 构造绝对路径
	var path = join(root, url.pathname);
	var stream = fs.createReadStream(path);
	// 将文件数据写到响应中
	stream.on('data', function(chunk) {
		res.write(chunk);
	});
	// 文件写完后结束响应
	stream.on('end', function() {
		res.end();
	});
});

server.listen(3000);

/*
	使用pipe优化代码
	Stream.pipe() 数据流管道概念
	ReadableStream.pipe(WritableStream);  ---->   表示将ReadableStream写到WritableStream文件中
*/

var server = http.createServer(function(req, res) {

	var url = parse(req.url);  
	// 构造绝对路径
	var path = join(root, url.pathname);
	var stream = fs.createReadStream(path);
	stream.pipe(res);
	// 添加错误机制
	stream.on('error', function (err) {
		res.statusCode = 500;
		res.end('Internal Server Error');
	});

});

// ||
// ||
// ||
// ||用fs.stat()实现先发制人的错误处理
// ||
// ||
// ||
// ||
// ||
// \/

var server = http.createServer(function(req, res) {
	var url = parse(req.url);  
	// 构造绝对路径
	var path = join(root, url.pathname);
	// 检查静态资源文件是否存在
	fs.stat(path, function (err, stat) {
		if(err) {
			// 文件不存在
			if('ENOENT' == err.code) {
				res.statusCode = 404;
				res.end('Not Found');
			} else {
				// 其他错误
				res.statusCode = 500;
				res.end('Internal Server Error');
			}
		} else {
			res.setHeader('Content-Length', stat.size);
			var stream = fs.createReadStream(path);
			stream.pipe(res);
			stream.on('error', function (err) {
				res.statusCode = 500;
				res.end('Internal Server Error');
			});
		} 
	})

});
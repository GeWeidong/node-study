var http = require('http');

var fs = require('fs');

var path = require('path');
// 附加的mime模块有根据文件扩展名 得出MIME类型的能力 
var mime = require('mime');
// 用来缓存文件内容
var cache = {}



function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

function sendFile(response, filePath, fileContent) {
	response.writeHead(200, {'content-Type': mime.getType(path.basename(filePath))});
	response.end(fileContent);
}

function serverStatic(response, cache, absPath) {
	if(cache[absPath]) {
		// 从内存中返回文件
		sendFile(response, absPath, cache[absPath]);
	} else { 
		// 检验文件是否存在
		fs.exists(absPath, function(exists) {
			if(exists) {
				// 硬盘中读取文件
				fs.readFile(absPath, function(err, data) {
					if(err) {
						send404(response);
					} else {
						// 从硬盘中读取文件并返回
						cache[absPath] = data;

						sendFile(response, absPath, data);
					}
				})
			} else {
				// 硬盘中无文件 发送http 404 响应
				send404(response);
			}
		})
	}
}

// 创建HTTP服务器
var server = http.createServer(function (req, res) {
	var filePath = false;

	if(req.url == '/') {
		// 返回默认的html文件
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + req.url;
	}

	var absPath = './' + filePath;
	serverStatic(res, cache, absPath);
})

// 启动服务器
server.listen(3000, function() {
	console.log('server listening on port 3000 by gewd!');
})
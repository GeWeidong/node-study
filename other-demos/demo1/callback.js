var fs = require('fs');
var http = require('http');

// 简单回调 获取JSON文件中的标题并渲染Web页面
http.createServer(function(req, res) {
	if(req.url == '/') {
		fs.readFile('./title.json', function(err, data) {
			if(err) {
				console.error(err);
				res.end('Server Error');
			} else {
				var title = JSON.parse(data.toString());

				fs.readFile('./templ.html', function(err, data) {
					if(err) {
						console.error(err);
						res.end('Server Error');
					} else {
						var templ = data.toString();
						var html = templ.replace('%', title.join('</li><li>'));
						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					}
				})
			}
		})
	}
}).listen(8000);

/*
   ||
   ||
   ||
   || 转化为：
   ||
   || 减少嵌套
   ||
   ||
   \/
*/


var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {
	getTitles(res);
}).listen(8000);

function getTitles(res) {
	fs.readFile('./title.json', function(err, data) {
		if(err) {
			handleError(err, res);
		} else {
			getTemplt(res, JSON.parse(data.toString()));
		}
 	})
}

function handleError(err, res) {
	console.error(err);
	res.end('Server Error');
}

function getTemplt(res, titles) {
	fs.readFile('./templ.html', function(err, data) {
		if(err) {
			handleError(err, res);
		} else {
			formatHtml(data.toString(), titles, res)
		}
	})
}

function formatHtml(templ, titles, res) {
	var html = templ.replace('%', titles.join('</li><li>'));
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(html);
}


/*
   ||
   ||
   ||
   || 转化为：
   ||
   || 尽早返回 减少嵌套
   ||
   ||
   \/
*/

var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {
	getTitles(res);
}).listen(8000);

function getTitles(res) {
	fs.readFile('./title.json', function(err, data) {
		// 返回  减少嵌套
		if(err) return handleError(err, res);
		getTemplt(res, JSON.parse(data.toString()));
 	})
}

function handleError(err, res) {
	console.error(err);
	res.end('Server Error');
}

function getTemplt(res, titles) {
	fs.readFile('./templ.html', function(err, data) {
		if(err) return handleError(err, res);
		formatHtml(data.toString(), titles, res)
	})
}

function formatHtml(templ, titles, res) {
	var html = templ.replace('%', titles.join('</li><li>'));
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(html);
}
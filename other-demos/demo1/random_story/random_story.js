var fs = require('fs');
var request = require('request');// request模块是个经过简化的HTTP客户端,你可以用它获取RSS数据
var htmlParser = require('htmlparser');// htmlparser模块能把原始的RSS数据转换成JavaScript数据结构
var configFilename = './rss_feeds.txt';

function checkForRSSFile () {
	fs.exists(configFilename, function(exists) {
		if(!exists) {
			return next(new Error('Missing RSS file: ' + configFilename));
		}
		next(null, configFilename);
	})
}

function next(err, result) {
	if(err) throw err;
	var currentTask = tasks.shift();
	if(currentTask) {currentTask(result);}
}

function readRssFile (configFilename) {
	fs.readFile(configFilename, function(err, feedList) {
		if(err) return next(err);
		feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split("\n");
		var random = Math.floor(Math.random() * feedList.length);
		next(null, feedList[random]);
	})
}

function downLoadRssFeed(feedUrl) {
	request({uri: feedUrl}, function (err, res, body) {
		if(err) return next(err);
		if(res.statusCode == 200) {
			return next(new Error('Abnormal response status code'));
		}
		return next(null, body);
	})
}

function parseRssFeed(rss) {
	var handler = new htmlParser.RssHandler();
	var parser = new htmlParser.Parser(handler);
	parser.parseComplete(rss);
	if(!handler.dom.items.length) {
		return next(new Error('NO RSS items found'));
	}
	var items = handler.dom.items.shift();
}
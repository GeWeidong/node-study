var fs = require('fs');
var request = require('request');// request模块是个经过简化的HTTP客户端,你可以用它获取RSS数据
var htmlParser = require('htmlparser');// htmlparser模块能把原始的RSS数据转换成JavaScript数据结构。
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
		
	})
}
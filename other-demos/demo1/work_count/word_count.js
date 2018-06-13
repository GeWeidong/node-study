var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';

// 当所有任务结束时 列出文件中用到的单词以及次数
function checkIfComplete() {
	completedTasks ++;
	if(completedTasks == tasks.length) {
		for(var key in wordCounts) {
			console.log(key + " : " + wordCounts[key]);
		}
	}
}

// 对出现的单词进行计数
function countWordsInText(text) {
	var words = text.toString().toLowerCase().split(/\W+/).sort();
	for(var index in words) {
		var word = words[index];
		if(word) {
			wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
		}
	}
}

// 读取txt文件 提取单词 输出每个单词出现的次数
fs.readdir(filesDir, function (err, files) {
	if(err) throw new Error('读取文件出错');
	for(var index in files) {
		var file = files[index];
		var task = (function (file) {
			return function() {
				fs.readFile(file, function(err, data) {
					if(err) throw new Error('读取单个文件出错');
					console.log(data.toString());
					countWordsInText(data);
					checkIfComplete();
				})
			}
		})(filesDir + '/' + file);
		tasks.push(task);
	}

	for(var task in tasks) {
		tasks[task]();
	}
})

 

 /*
 	社区中的很多附加模块都提供了方便好用的流程控制工具。其中比较流行的有Nimble、Step和Seq三个
 */
var express = require('express');
var router = express.Router();

var photos = [];
photos.push({
	name: 'NodeJsLogo',
	path: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3629413807,3398946834&fm=173&app=25&f=JPEG?w=637&h=382&s=8F8226C34620BB5B429E41AC0300704B',
});

photos.push({
	name: 'cry',
	path: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1356159088,2018222206&fm=173&app=25&f=JPEG?w=500&h=281&s=4883489C104A07578060FB810300308C'
})

var Photo = require('../models/Photo');
var path = require('path');
var formidable = require("formidable");
var fs = require('fs');
var join = path.join;  // 引用path.join，这样你就可以用“path”命名变量

exports.showPicList = function(req, res, next) {
	Photo.find({}, function(err, photos) {   // {}查出photo集合中的所有记录
		console.log(photos);
		if(err) return next(err);
		res.render('photos', {
			title: '世界杯',
			photos: photos
		})
	})
}

exports.form = function(req, res) {
	res.render('photos/upload', {
		title: '上传世界杯照片'
	})
}

exports.submit = function (dir) {
	return function(req, res, next) {
		var form = new formidable.IncomingForm();
	    form.parse(req, function(error, fields, files) {
	        var imgName = files['photo'].name;
	        var imgPath = files['photo'].path;
	        var path = join(dir, imgName);
	   
	        fs.writeFileSync(path, fs.readFileSync(imgPath));
        	Photo.create({
				name: imgName,
				path: imgName
			}, function(err) {
				if(err) return next(err);
				// 重定向到首页
				res.redirect('/');
			})
	    });
		
	}
}


// 下载
exports.download = function(dir) {
	return function(req, res, next) {
		var id = req.params.id;
		Photo.findById(id, function(err, photo) {
			if(err) return next(err);
			// 构造指向文件的绝对路径
			var path = join(dir, photo.path);
			// 传输文件  这个方法只会让浏览器预览图片
			res.sendfile(path);  
			// 下载图片 这个会自动调用下载方法
			res.download(path, photo.name);
		})
	}
}
var express = require('express');
var router = express.Router();
var User = require('../lib/user');

exports.form = function(req, res) {
	res.render('register', {title: 'Register'});
}

exports.submit = function(req, res, next) {
	var data = req.body;
	User.getByName(data.name, function(err, user) {
		if(err) return next(err);
		if(user.id) {
			res.error('用户已经被注册');
			res.redirect('back');
		} else { 
			user = new User({
				name: data.name,
				pass: data.pass
			});

			user.save(function(err) {
				if(err) return next(err);
				// 为认证保存uid
				res.session.uid = user.id;
				res.redirect('/');
			})
		}
	})
}
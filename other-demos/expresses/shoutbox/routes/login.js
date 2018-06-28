var User = require('../lib/user');
// 注册
exports.submit = function(req, res, next) {
	var data = req.body;
	User.authenticate(data.name, data.pass, function(err, user) {
		if(err) return next(err);
		if(user) {
			// 为认证存储uid
			req.session.uid = user.id;
			res.redirect('/');
		} else {
			res.error('对不起  非法数据');
			// 重定向回登录表单
			res.redirect('back');
		}
	})
}

// 用户直接退出登录
exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		if(err) throw err;
		res.redirect('/');
	})
}

// 登录
exports.form = function(req, res, next) {
	res.render('login', {title: 'Login'});
}


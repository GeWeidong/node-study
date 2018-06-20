var User = require('../user');

module.exports = function(req, res, next) {
	// console.log(req.session.uid)
	var uid = req.session.uid;
	if(!uid) return next();

	User.get(uid, function(err, user) {
		if(err) return next(err);
		// 将用户数据输出到响应对象中  res.locals是Express提供的请求层对象，可以将数据输出给模板
		req.user = res.locals.user = user;
		next();
	})
}
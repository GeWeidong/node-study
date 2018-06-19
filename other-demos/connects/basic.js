var connect = require('connect');

// 可以输出每个HTTP请求的方法和URL
function logger(req, res, next) {
	console.log('%$ %$', req.method, req.url);
	next();
}
// 用“hello world”响应HTTP请求
function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello');
}

// 实现HTTP Basic认证的中间件组件
function restrict(req, res, next) {
	var authorization = req.headers.authorization;
	console.log(req.headers)
	if(!authorization) {return next(new Error('Unauthorized'))};

	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
	// 根据数据库中的记录检查认证信息的函数
	authenticateWithDatabase(user, pass, function (err) {
		if(err) return next(err);

		next();
	})
}

// 路由admin请求
function admin(req, res, next) {
	switch(req.url) {
		case '/':
			res.end('try/users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(['tobi', 'loki', 'jane']));
			break;
	}
}

// 定义可配置的logger中间件
function setUp(format) {
	var regexp = /:(\w+)/g;
	return function (req, res, next) {
		var str = format.replace(regexp, function (match, property) {
			return req[property];
		});

		console.log(str);

		next();
	}
}

var app = connect();
app.use(setUp(':method:url'))
	.use(admin)
	.use(restrict)
	.use(hello);
app.listen(8000);
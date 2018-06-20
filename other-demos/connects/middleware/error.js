var http = require('http');
var url = require('url');
var connect = require('connect');

// connect中错误处理中间件
function errorHandle() {
	var env = process.env.NODE_ENV || 'development';
	return function (err, req, res, next) {
		res.statusCode = 500;
		switch(env) {
			case 'development':
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(err))
				break;
			default:
				res.end('Server error');
				break;
		}
	}
}


// hello中间件
function hello (req, res, next) {
	if(req.url.match(/\/hello/)) {
		res.end('Hello World\n');
	}
	next();
}

var db = {
	users: [
		{ name: 'tobi' },
		{ name: 'loki' },
		{ name: 'jane' },
		
	]
}

// 在数据库中搜索用户的组件
function users(req, res, next) {
	var match = req.url.match(/\/user\/(.+)/);
	if(match) {
		var user = db.users[match[1]];
		if(user) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.parse(user));
		} else {
			var err = new Error('User not found');
			err.notFound = true;
			next(err);
		}
	} else {
		next();
	}
}

// 实现pets中间件组件
function pets(req, res, next) {
	if(req.url.match(/^\/pets\/(.+)/)) {
		foo();
	} else {
		next();
	}
}

// 实现errorHandler中间件组件
function errorHandler(err, req, res, next) {
	console.error(err.stack);
	res.setHeader('Content-Type', 'application/json');
	if(err.notFound) {
		res.resultCode = 404;
		res.end(JSON.stringify({ error: err.message }));
	} else {
		res.resultCode = 500;
		res.end(JSON.stringify({ error: 'Internal Server Error' }));
	}
}



// main application
var api = connect()
	.use(users)
	.use(pets)
	.use(errorHandler);

var app = connect()
	.use(hello)
	.use('/api', api)
	.listen(8000);
console.log('listen to 8000');
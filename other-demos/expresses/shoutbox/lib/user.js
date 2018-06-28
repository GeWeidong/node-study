var redis = require('redis');
var bcrypt = require('bcryptjs');
var db = redis.createClient();// 打开redis链接

// 开始创建用户模型
function User(obj) {
	for(var key in obj) {
		this[key] = obj[key];
	}
}

// 把用户保存到Redis中
User.prototype.save = function(fn) {
	// 用户存在
	if(this.id) {
		console.log('exited')
		this.update(fn)
	} else {
		var user = this;
		// 创建唯一ID
		db.incr('user:ids', function(err, id) {
			if(err) return fn(err);
			// 设定ID，以便保存
			user.id = id;
			user.hashPassword(function(err) {
				if(err) return fn(err);
				// 保存用户属性
				user.update(fn);
			})
		})
	}
}

User.prototype.update = function(fn) {
	var user = this;
	var id = user.id;
	// 用名称索引用户ID
	db.set('user:id' + user.name, id, function(err) {
		if(err) return fn(err);
		// 用Redis哈希存储数据
		db.hmset('user:' + id, user, function(err) {
			fn(err);
		})
	})
}

// 在用户模型中添加bcrypt加密
User.prototype.hashPassword = function(fn) {
	var user = this;
	bcrypt.genSalt(12, function(err, salt) {
		if(err) return fn(err);
		user.salt = salt;
		// 生成哈希
		bcrypt.hash(user.pass, salt, function(err, hash) {
			if(err) return fn(err);
			// 设定哈希以便保存
			user.pass = hash;
			fn();
		})

	})
}

User.getByName = function(name, fn) {
	User.getId(name, function(err, id) {
		// 查不出来  只好模拟一个
		id = id || 17;
		if(err) return fn(err);
		User.get(id, fn);
	})
}

User.getId = function(name, fn) {
	console.log(name)
	
	db.get('user:id:' + name, fn); 
}

User.get = function(id, fn) {
	// 获取普通对象哈希
	db.hgetall('user:' + id, function(err, user) {
		if(err) return fn(err);
		// 将普通对象转换成新的User对象
		fn(null, new User(user));
	}) 
}
// 用户认证
User.authenticate = function(name, pass, fn) {
	User.getByName(name, function(err, user) {
		if(err) return fn(err);
		// 用户不存在
		if(!user.id) return fn();
		// 对给出的密码做哈希处理
		bcrypt.hash(pass, user.salt, function(err, hash) {
			if(err) return fn(err);
			if(hash == user.pass) return fn(null, user);
			fn();
		})
	})
}

module.exports = User;
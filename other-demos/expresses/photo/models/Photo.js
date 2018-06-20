var mongoose = require('mongoose');

// 建立到localhost上mongodb的连接，用photo_app做数据库
mongoose.connect('mongodb://localhost/photo_app');

var schema = new mongoose.Schema({
	name: String,
	path: String
});

module.exports = mongoose.model('Photo', schema)
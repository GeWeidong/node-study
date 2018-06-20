var express = require('express');
var router = express.Router();

exports.form = function(req, res) {
	res.render('register', {title: 'Register'});
}
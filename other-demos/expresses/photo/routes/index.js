var express = require('express');
var router = express.Router();

var photos = require('./photo');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', photos.showPicList);

module.exports = router;

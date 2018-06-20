var connect = require('connect');
var bodyParser = require('body-parser');

console.log(connect)

var app = connect()
	.use(bodyParser())
	.listen(8000);

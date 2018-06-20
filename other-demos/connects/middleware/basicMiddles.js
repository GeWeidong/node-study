var connect = require('connect');
// Since version 2.21.0 (2014-06-20) of Connect they deprecated cookie-parser integration   ---> npm install cookie-parser --save
var cookieParser = require('cookie-parser');

/* cookieParser()：解析HTTP cookie */
var app = connect()
	.use(cookieParser('tobi is a cool ferret'))
	.use(function (req, res) {
		res.setHeader('Set-Cookie', 'foo=bar');
		res.setHeader('Set-Cookie', 'tobi=ferret;Expires=Tue, 08 Jun 2020 00:00:00 GMT');
		console.log(req.cookies)
		console.log(req.signedCookies);
		res.end('iioioio');
	})
	// .listen(8000)

/* bodyParser()：解析请求主体 */

// 解析JSON数据
// 解析常规的<FORM>数据
// 解析MULTIPART <FORM>数据
var app = connect()
	.use(bodyParser())
	.use(function(req, res) {
		res.end('Registered new user: ' + req.body.username);
	});

/* limit()：请求主体的限制 */
/* query()：查询字符串解析 */
// /song-Search?artist=Bob%20Marley&track=Jammin    ------>    { artist: 'Bob Marley', track: 'Jammin' }

/* 实现Web 程序核心功能的中间件 */
logger()：记录请求
favicon()：提供favicon
methodOverride()：伪造HTTP方法
vhost()：虚拟主机
session()：会话管理
basicAuth()：HTTP基本认证
csrf()：跨站请求伪造防护
errorHandler()：开发错误处理

static()：静态文件服务
compress()：压缩静态文件  压缩出站数据
directory()：目录列表


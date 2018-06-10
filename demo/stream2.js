var fs = require('fs');
var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'image/png'});
	// 设置一个从读取流到 写出流的管道 
	fs.createReadStream('./assets/image.png').pipe(res);
}).listen(3000);


/*在这行代码中，数据从文件中读进来（fs.createReadStream），
然后数据随着进来就被 送到（.pipe）客户端（res）。
在数据流动时，事件轮询还能处理其他事件。 
*/

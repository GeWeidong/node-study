// 创建事件发射器
// var EventEmitter = require('events').EventEmitter;

// var channel = new EventEmitter();
// 事件只是个键，可以是任何字符串
// channel.on('join', function () {
// 	console.log('Welcome');
// });

// channel.emit('join');

/* 用事件发射器实现一个简单的聊天服务器 */

var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, data) {
	this.clients[id] = client;
	this.subscriptions[id] = function(serderId, message) {
		if(id != serderId) {
			this.clients[id].write(message);
		}
	}
	this.on('broadcast', this.subscriptions[id]);

	// 移除监听器
});

channel.on('leave', function(id) {
	channel.removeListener('broadcast', this.subscriptions[id]);
	channel.emit('broadcast', id, id + " has left the chat .\n");
})

channel.on('shutdown', function () {
	channel.emit('broadcast', '', 'chat has shut down.\n');
	channel.removeAllListeners('broadcast');
})

var server = net.createServer(function(client) {
	var id = client.remoteAddress + ":" + client.remotePort;
	channel.on('connect', function() {
		channel.emit('join', id, client);
	});
	// 用户发送数据时
	client.on('data', function(data) {
		data = data.toString();
		if(data == 'shutdown\r\n'){
			channel.emit('shutdown');
		}
		channel.emit('broadcast', id, data);
	});
	// 断开连接时
	client.on('close', function () {
		channel.emit('leave', id);
	})
});

server.listen(8000);
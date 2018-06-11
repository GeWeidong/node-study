// function asyncFunction(callback) {
// 	setTimeout(callback, 200)
// }

// var color = 'blue';

// asyncFunction(function() {
// 	console.log(color)
// });

// color = 'Green';

// 会打印出Green

/*
   ||
   ||
   ||
   || 转化为：
   ||
   || 闭包形式保留全局变量
   ||
   ||
   \/
*/

function asyncFunction(callback) {
	setTimeout(callback, 200)
}

var color = 'blue';

(function(color) {
	asyncFunction(function() {
		console.log(color)
	});
})(color);

color = 'Green';

// 输出 blue


/*************** 异步逻辑的顺序化****************** */
/*
	1.串行
	2.并行
 */

// 特制工具实现串行化流程控制的例子  Nimble
var flow = require('Nimble');

// 给Nimble一个数组，便会一个接一个的执行函数
flow.series([
	function () {},
	function () {},
	function () {},
	function () {},
])


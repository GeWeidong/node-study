/*数据流*/

// Node在数据流和数据流动上也很强大。你可以把数据流看成特殊的数组，
// 只不过数组中的数 据分散在空间上，而数据流中的数据是分散在时间上的。
// 通过将数据一块一块地传送，开发人员 可以每收到一块数据就开始处理，
// 而不用等所有数据都到全了再做处理。

var stream = fs.createReadStream('./resource.json');

stream.on('data', function(chunk) {
	// 数据块准备好就执行data事件
});

stream.on('end', function() {
	// 所有的数据块都加载完后触发end事件
});
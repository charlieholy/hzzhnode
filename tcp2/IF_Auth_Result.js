
//
var HOST = '127.0.0.1'
//HOST = '223.223.223.174'
var PORT = 2403
var net = require('net')
var client = new net.Socket();

var fi = require('./IFrameSystemSettingPasswdRsp')
//var fi = require('./IFrameSystemSettingLogUpdateUrl')
//var fi = require('./IFrameLogSummonRsp')
var iframe = fi.get("1101010000001530");
//发送费率回包

// 失败1 原因1
// 6822007c02340082000700000000000033 | 1101011000001671 | 00 | 5203000000000000 | 01|  0100 | f916
// rateId 850   0x352

iframe = "680400010002006f16681800060004008201070000000000000d33010810000018460000cb16"
//iframe = "68220054085c00820007000000000000331101121000001826005403000000000000000000c716"
console.log(iframe.length)
var FBuf = Buffer.alloc(iframe.length/2);
FBuf.write(iframe,"hex");
// console.log()
//
//
// var FBuf = Buffer.alloc(16);
//
//
// var mybuf = function (data) {
// 	var len = data.length;
// 	len = len/2;
// 	FBuf.write(data,step,'hex')





var sendIf = function () {
	console.log('send IF ' + FBuf.toString('hex'))
	client.write(FBuf)
	// client.end()
}


client.connect(PORT,HOST,function(){
	console.log("conn.. " + HOST + " : " + PORT);
	setTimeout(sendIf,1000)




});

client.on('data',function (data) {
	console.log('Data: ' + data)
	var res = new Buffer(data);
	console.log(res.toString('hex'))

})

client.on('close',function () {
	console.log('Conn.. close')
})
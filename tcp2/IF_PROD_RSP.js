//6842000a0008008200070000000000008d33010810000018480000383030313034303435335a484d31335f3830303739393031373000000000432e330000000000000063114a16
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

iframe = "6804000100060073166842000a0008008200070000000000008d33010810000018460000383030313034303435335a484d31335f3830303739393031373000000000432e3300000000000000f410d816"
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
	console.log('send IF ' + iframe.toString('hex'))
	client.write(FBuf)
	// client.end()
}


client.connect(PORT,HOST,function(){
	console.log("conn.. " + HOST + " : " + PORT);
	sendIf()



});

client.on('data',function (data) {
	console.log('Data: ' + data)
	var res = new Buffer(data);
	console.log(res.toString('hex'))

})

client.on('close',function () {
	console.log('Conn.. close')
})
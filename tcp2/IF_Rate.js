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


iframe = "682200be075200820007000000000000061101011000001671000000000000000000010100dc16"
//iframe = "68220054085c00820007000000000000331101121000001826005403000000000000000000c716"
console.log(iframe.length)
var FBuf = Buffer.alloc(iframe.length);
FBuf.write(iframe,iframe.length/2,"hex");
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
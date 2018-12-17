var ss = "6833004060960282000700000000000098330108100000054900125833010810000005498951545030786540F71436353431323300009D16";

//
var HOST = '223.223.223.174'
//HOST = '223.223.223.174'
var PORT = 2403
var net = require('net')
var client = new net.Socket();


iframe = ss
console.log(iframe.length)
var FBuf = Buffer.alloc(iframe.length/2);
FBuf.write(iframe,"hex");





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
var HOST = '127.0.0.1'
//HOST = '223.223.223.174'
var PORT = 2403
var net = require('net')
var client = new net.Socket();

var fi = require('./IFrameSystemSettingPasswdRsp')
//var fi = require('./IFrameSystemSettingLogUpdateUrl')
//var fi = require('./IFrameLogSummonRsp')
var iframe = fi.get("1101010000001530");





var sendIf = function () {
    console.log('send IF ' + iframe.toString('hex'))
    client.write(iframe)
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
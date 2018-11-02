var HOST = '127.0.0.1'
var PORT = 2403
var net = require('net')
var client = new net.Socket();

// var devCode = "3301081000000136";
// console.log("devCode len: " + devCode.length)
// var startFlag = new Buffer('68','hex');
// var head = new Buffer('0CFF02','hex');
// var endFlag = new Buffer('16','hex');
// var devC = new Buffer(devCode,'hex');
// var cmd = startFlag.append(head).append(endFlag).append(devC)
// console.log("cmd" + cmd.toString('hex'))

const buf1 = Buffer.alloc(2+3+8+3);
buf1.writeInt8(0x68,0);
buf1.write('0CFF02',1,'hex');
console.log("buf: "+buf1.toString('hex'))


var PF = new Buffer('680CFF0233010810000001360000F816','hex');

console.log("sbuf " + PF.toString('hex'))

var sendCmd = function () {
    _sendCmd(Uf_echo)
    _sendCmd(BR_AU)
}

var _sendCmd = function (cmd) {
    console.log('send Cmd ' + cmd.toString('hex'))
    client.write(cmd)
}

var sendPf = function () {
    console.log('send PF ' + PF.toString('hex'))
    client.write(PF)
    // client.destroy()
}

var sendIf = function () {
    console.log('send IF ' + IF.toString('hex'))
    client.write(IF)
}

var sendUf = function () {
    console.log("send UF:" + UF.toString('hex'))
    sendIf()
}

client.connect(PORT,HOST,function(){
    console.log("conn.. " + HOST + " : " + PORT);
    sendPf()



});

client.on('data',function (data) {
    console.log('Data: ' + data)
    var res = new Buffer(data);
    console.log(res.toString('hex'))

})

client.on('close',function () {
    console.log('Conn.. close')
})
var HOST = '127.0.0.1'
var PORT = 2403
var net = require('net')
var client = new net.Socket();
var bufferparse = require('./bufferparse')
var PF = new Buffer('680CFF0233010810000001360000F816','hex');
PF = new Buffer('680CFF0233010810000001360000F816','hex')
var Uf_res = new Buffer('680400','hex')
var Uf_echo = new Buffer('6804000B0000007716','hex')
var BR_AU = new Buffer('681F000200000082010500000000000007330108100000013600FFFFFFFFFFFFFFFF9316','hex')

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
    client.destroy()
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

    if(bufferparse.fc(res,Uf_res,0,3)){
        console.log("eq...")
        setTimeout(sendCmd,2000);
    }
})

client.on('close',function () {
    console.log('Conn.. close')
})
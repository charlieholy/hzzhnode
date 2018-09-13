var HOST = '127.0.0.1'
//HOST = '223.223.223.176'
var PORT = 2403
var net = require('net')
var client = new net.Socket();
var PF = new Buffer('680CFF0233010810000001360000F816','hex');
PF = new Buffer('680CFF0233010810000001370000F916','hex')
var PFerr = new Buffer('680CFF0233010810000001360000F716','hex');
var UF = new Buffer('6804000B0000007716','hex')
var IF = new Buffer('686F0082000800890101000000000000330108100000013700020000000000000000000000000000000000000000000000000000000000000000000000000000000000010100A08C0D0E0D091200000000000000000000000000000000000000000000000000000000000000000000000000E316','hex')
var C_CS_NA_103 = new Buffer('68140000000000670106000000000000D8D634090D0912FD16','hex')
var C_CS_NA_103_up = new Buffer('68140008000600670007000000000000D8D634090D09120B16','hex')
var C_SD_NA_137 = new Buffer('686F0082000800890101000000000000330108100000013700020000000000000000000000000000000000000000000000000000000000000000000000000000000000010100A08C0D0E0D091200000000000000000000000000000000000000000000000000000000000000000000000000E316','hex')
var sbuf = new Buffer(30);
sbuf.writeUIntBE(0x22,0,1)
console.log("sbuf " + PF.toString('hex'))

var sendCmd = function () {
    _sendCmd(C_SD_NA_137)
}

var _sendCmd = function (cmd) {
    console.log('send Cmd ' + cmd.toString('hex'))
    client.write(cmd)
}

var sendPf = function () {
    console.log('send PF ' + PF.toString('hex'))
    client.write(PF)
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
    setTimeout(sendCmd,2000);
})

client.on('close',function () {
    console.log('Conn.. close')
})
var HOST = '127.0.0.1'
var PORT = 2403
var net = require('net')
var client = new net.Socket();
var PF = new Buffer('680CFF0233010810000001360000F816','hex');
var UF = new Buffer('68040001001A008716','hex')
var sbuf = new Buffer(30);
sbuf.writeUIntBE(0x22,0,1)
console.log("sbuf " + PF.toString('hex'))

client.connect(PORT,HOST,function(){
    console.log("conn.. " + HOST + " : " + PORT);
    client.write(PF);
});

client.on('data',function (data) {
    console.log('Data: ' + data)
    var res = new Buffer(data);
    console.log(res.toString('hex'))
})

client.on('close',function () {
    console.log('Conn.. close')
})
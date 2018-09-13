var net = require('net')
var clinet = new net.Socket();
var sbuf = new Buffer(30);
sbuf.writeUIntBE(0x22,0,1)
console.log("sbuf " + sbuf.toString('hex'))
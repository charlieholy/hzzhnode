var HOST = '127.0.0.1'
var PORT = 6379
var net = require('net')
var client = new net.Socket();
var bufferparse = require('./bufferparse')
var PF = new Buffer('680CFF0233010810000001360000F816','hex');
var setcmd = '*3\r\n$3\r\nSET\r\n$5\r\nHENRY\r\n$8\r\nHENRYFAN\r\n'
console.log("sbuf " + PF.toString('hex'))



var sendIf = function () {
    //console.log('send IF ' + IF.toString('hex'))
    client.write(setcmd)
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
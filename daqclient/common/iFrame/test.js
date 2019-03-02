/**
 * Created by chenpeiwen on 2019/3/2.
 */
/**
 * Created by chenpeiwen on 2019/3/2.
 */


var BiResult = require('./BiResult')
var biResult = BiResult.get("3101011000000207");
console.log(biResult)

var HOST = '127.0.0.1'
HOST = '47.99.33.240'
var PORT = 2403
var net = require('net')
var client = new net.Socket();

var sendBi = function () {
    console.log('send biResult ' + biResult.toString('hex'))
    client.write(biResult)
    //client.end()
}


client.connect(PORT,HOST,function(){
    console.log("conn.. " + HOST + " : " + PORT);
    sendBi()
});

client.on('data',function (data) {
    console.log('Data: ' + data)
    var buf = new Buffer(data);
    console.log(new Date(),buf.length,buf.toString('hex'))


})

client.on('close',function () {
    console.log('Conn.. close')
})

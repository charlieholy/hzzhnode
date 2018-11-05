var HOST = '127.0.0.1'
//HOST = '223.223.223.174'
var PORT = 2403
var net = require('net')
var client = new net.Socket();

var fp = require('./PFrame')
var pframe = fp.get("1303041000000532");

var keepLive = function () {
    console.log("keep...");
    client.write("a");

}

var sendPf = function () {
    console.log('send PF ' + pframe.toString('hex'))
    client.write(pframe)
    //client.end()
    setInterval(keepLive,1000);
}


client.connect(PORT,HOST,function(){
    console.log("conn.. " + HOST + " : " + PORT);
    sendPf()
});

client.on('data',function (data) {
    console.log('Data: ' + data)
    //var res = new Buffer(data);
    //console.log(res.toString('hex'))

})

client.on('close',function () {
    console.log('Conn.. close')
})
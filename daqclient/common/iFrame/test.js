/**
 * Created by chenpeiwen on 2019/3/2.
 * 完成服务器的对时解析
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
    var length = data.length;
    if(length > 5){
        if(data[7] == 0x67){
            console.log("收到对时协议...")
            console.log("服务器时间为 ")
            console.log("20" + data[length-3] + "年")
            console.log(data[length-4] + "月")
            console.log(data[length-5] + "日")
            console.log(data[length-6] + "时")
            console.log(data[length-7] + "分")
            console.log(((data[length-8]<<8) + data[length-9])/1000 + "秒")
            console.log("over...")
        }
    }




})

client.on('close',function () {
    console.log('Conn.. close')
})

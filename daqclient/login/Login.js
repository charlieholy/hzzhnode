/**
 * Created by chenpeiwen on 2019/3/2.
 *    从身份认证到Bi 结束
 */
var HOST = '127.0.0.1'
HOST = '47.99.33.240'
var PORT = 2403
var net = require('net')
var client = new net.Socket();

var pF = require('../common/pFrame/PFrame')
var iF_Bi = require('../common/iFrame/BiResult')

var dev_code = "3101011000000207"


var pframe = pF.get(dev_code);
console.log(pframe)


var biResult = iF_Bi.get(dev_code);
console.log(biResult)




var sendPf = function () {
    console.log('send PF ' + pframe.toString('hex'))
    client.write(pframe)
    //client.end()
}

var sendBi = function () {
    console.log('send biResult ' + biResult.toString('hex'))
    client.write(biResult)
    //client.end()
}

client.connect(PORT,HOST,function(){
    console.log("conn.. " + HOST + " : " + PORT);
    sendPf()
});

client.on('data',function (data) {
    console.log('Data: ' + data)
    var buf = new Buffer(data);
    console.log(new Date(),buf.length,buf.toString('hex'))
    var length = data.length
    if(length > 8){
        if(data[2] == 0xff ){
            console.log("收到P帧.....")
            sendBi();
        }
        else  if(data[7] == 0x67){
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
        else if(data[7] ==  0x85){
            console.log("收到I帧...")
            if(data[16] == 0x8d){
                console.log("查询产品信息...")
            }
            else if(data[16] == 0x33){
                console.log("费率下发...")
            }
            else if(data[16] == 0x96){
                console.log("离线码下发...")
            }
        }
    }

})

client.on('close',function () {
    console.log('Conn.. close')
})
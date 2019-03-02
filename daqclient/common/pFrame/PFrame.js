/**
 * Created by chenpeiwen on 2019/3/2.
 * 用于生成p帧
 */

//  apdu包括apci asdu apeu 其中apci是控制头 asdu是数据 apeu 是结尾

//帧头标识符
    //协议帧联网后第一帧




var startFlag = '68'
//长度固定
var cmdlen = '0c'
var firstRun = 'ff'
//版本号
var version = '02'
//桩编号  长度  8byte   压缩bcd
var devcode = "1234567890123456"
var port = '00'
var station = '00'
var crc = '00'
//帧尾标识符
var endFlag = '16'

var FBuf = Buffer.alloc(16);
var step = 0;


var mybuf = function (data) {
    var len = data.length;
    len = len/2;
    FBuf.write(data,step,'hex')
    step += len;
}


console.log("buf: "+FBuf.toString('hex'))

var getDevPFrame = function(devCode){
    console.log("getDevFrame.. " + devCode);
    mybuf(startFlag);
    mybuf(cmdlen);
    mybuf(firstRun);
    mybuf(version);
    mybuf(devCode);
    mybuf(port);
    mybuf(station);

    var crc = 0;
    for(var i = 0;i<step;i++){
        crc += (FBuf[i]&(0xff));
    }
    crc = crc%256;
    var crcR = Buffer.from([crc])
    mybuf(crcR.toString('hex'));
    mybuf(endFlag);
    step = 0;
    return FBuf;
}

var PF={
    get:getDevPFrame
};

module.exports= PF;



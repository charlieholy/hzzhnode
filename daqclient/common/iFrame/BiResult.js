/**
 * Created by chenpeiwen on 2019/3/2.
 * Bi结束之后 会有
 */

//反推长度计算  [1 + 2 + 4 + 9] + [ 1+ 8 + 2 + 1+ 1]  = 16 + 13 = 29
// len  = 29 -5  魔术字是5

var startFlag = '68'
var cmdlen = '1800'
var ctrl = '00000000'
// /**
//  * ASDU类型   log_summon
//  */
// private byte type;
// private byte limit;//VSQ
// private byte con[]=new byte[2];
// private byte conn_address[]=new byte[2];
// private byte body_address[]=new byte[3];
var asduHead = '820000000000000000'
var apciType = '0d'
//桩编号  长度  8byte   压缩bcd
var devcode = '1234567890123456'
var port = '00'
var success = '00'
var crc = '00'
var endFlag = '16'

var FBuf = Buffer.alloc(32);
var step = 0;


var mybuf = function (data) {
    var len = data.length;
    len = len/2;
    FBuf.write(data,step,'hex')
    step += len;
}

//



console.log("buf: "+FBuf.toString('hex'))

var getDevIFrame = function(devCode){
    console.log("getDevFrame.. " + devCode);
    mybuf(startFlag);
    mybuf(cmdlen);
    mybuf(ctrl);
    mybuf(asduHead);
    mybuf(apciType);
    mybuf(devCode);
    mybuf(port)
    mybuf(success);

    var crc = 0;
    for(var i = 0;i<step;i++){
        crc += (FBuf[i]&(0xff));
    }
    crc = crc%256;
    var crcR = Buffer.from([crc])
    mybuf(crcR.toString('hex'));
    mybuf(endFlag);
    console.log("len: " + step)
    step = 0;
    return FBuf;
}

var IF={
    get:getDevIFrame
};

module.exports= IF;
//68 1b 00 ce 05 44 00 82 00 07 00 00 00 00 00 00
//94 13 03 04 10 00 00 05 33 37 10 01 00 00 61 16
var startFlag = '68'
var cmdlen = '1b00'
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
var apciType = '94'
var onlyCode = '3710'
var isSuccess = '00'
var reason = '0100'
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
    mybuf(onlyCode);
    mybuf(isSuccess);
    mybuf(reason);

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

var IF={
    get:getDevIFrame
};

module.exports= IF;
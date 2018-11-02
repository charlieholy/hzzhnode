//68 0CFF02 3301081000000136 00 00 F8 16
//680CFF0233010810000001360000F816
var startFlag = '68'
var cmdlen = '0c'
var firstRun = 'ff'
var version = '02'
var port = '00'
var station = '00'
var crc = '00'
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

var getDevFrame = function(devCode){
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
    get:getDevFrame
};

module.exports= PF;
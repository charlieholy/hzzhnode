//68 0CFF02 3301081000000136 00 00 F8 16
//680CFF0233010810000001360000F816
var startFlag = '68'
var cmdlen = '0c'
var firstRun = 'ff'
var version = '02'
var devCode = "3301081000000136"
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
    console.log("step: " + step)
}

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
var crcR = 0;
crcR = crc%256;
console.log(crcR)
const buf4 = Buffer.from([crcR])

mybuf(buf4.toString('hex'));
mybuf(endFlag);
console.log("buf: "+FBuf.toString('hex'))

var getDevFrame = function(devCode){
    console.log("getDevFrame.. " + devCode);
}

var PF={
    get:getDevFrame
};

module.exports= PF;
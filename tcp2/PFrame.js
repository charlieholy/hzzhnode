//68 0CFF02 3301081000000136 00 00 F8 16
var startFlag = '68'
var cmdlen = '0c'
var firstRun = 'ff'
var version = '0x'
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
mybuf(crc);
mybuf(endFlag);
console.log("buf: "+FBuf.toString('hex'))
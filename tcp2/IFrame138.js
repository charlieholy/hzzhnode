//68 1b 00 ce 05 44 00 82 00 07 00 00 00 00 00 00
//94 13 03 04 10 00 00 05 33 37 10 01 00 00 61 16
var startFlag = '68'
var cmdlen = '5500'
var ctrl = '00000000'
// /**
//  * ASDU类型   log_summon
//  */
// private byte type;
// private byte limit;//VSQ
// private byte con[]=new byte[2];
// private byte conn_address[]=new byte[2];
// private byte body_address[]=new byte[3];
var asduHead = '8a0000000000000000'  //138
var port = '00'
var byte4 = '00000000'
var byteLen = 14;
var endFlag = '16'
var CPTIME7 = "00000000000000"

var FBuf = Buffer.alloc(90);
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
	mybuf(devCode);
	mybuf(port)
	for(var j=0;j<byteLen;j++){
		mybuf(byte4)
	}
	mybuf(CPTIME7)

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
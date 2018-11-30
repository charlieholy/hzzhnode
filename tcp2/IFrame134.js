//68 1b 00 ce 05 44 00 82 00 07 00 00 00 00 00 00
//94 13 03 04 10 00 00 05 33 37 10 01 00 00 61 16
var startFlag = '68'
var cmdlen = '6500'
var ctrl = '00000000'
// /**
//  * ASDU类型   log_summon
//  */
// private byte type;
// private byte limit;//VSQ
// private byte con[]=new byte[2];
// private byte conn_address[]=new byte[2];
// private byte body_address[]=new byte[3];
//8 1 1 2 2 4 2 4 4 4 4  1 7 7 16 4 1 4 4 4 4
var asduHead = '860000000000000000'  //134
var port = '01'
var endFlag = '16'
var work = "01"
var PV = "0100" //输出电压
var PI = "0200" //输出电流
var AU = "01020000" //总电度
var AT = "0200" //总充电时长
var En = "00000000"
var En2 = "00000000"
var Ev = "00000000"
var Ev2 = "00000000"
var chargeType = "01"
var CPS7 = "00000000000000"
var CPC7 = "00000000000000"
var S16 = "01010100000000000000000000000000"
var Money = "00000000"
var Port = "01"
var JL = "01000000"
var FL = "02000000"
var PL = "03000000"
var GL = "04000000"

var FBuf = Buffer.alloc(106);
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
	mybuf(devCode);mybuf(port)
	mybuf(work)
	mybuf(PV);mybuf(PI);
	mybuf(AU);mybuf(AT);
	mybuf(En);mybuf(En2);
	mybuf(Ev);mybuf(Ev2);
	mybuf(chargeType);
	mybuf(CPS7);mybuf(CPC7);mybuf(S16)
	mybuf(Money)
	mybuf(Port);
	mybuf(JL);mybuf(FL);mybuf(PL);mybuf(GL)
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
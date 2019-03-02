/**
 * Created by chenpeiwen on 2019/3/2.
 *
 * 用于测试离线订单上传 参数为设置开始时间为当前时间 结束时间为当前时间 dev_code
 */

//发起充电方式
//App充电
var chargeType_App = '01';
//卡充电
var chargeType_Card = '02';
//离线充电码
var chargeType_OffLine = '03';
//vin码充电
var chargeType_VinCode = '04';
//密码充电
var chargeType_Pass = '05';


//反推长度计算  [1 + 2 + 4 + 9] + [ 1+ 8 + 2 + 1+ 1]  = 16 + 13 = 29
// len  = 29 -5  魔术字是5

//68
// D300
// 2A1E1201
// 820105000000000000
// 11
// 3101011000000213
// 00
// 31010110000002136241551503925061
// 4 01
// 4 00000000000000
// 5 018916602617FFFF
// 6 01
// 7 002E120D020313
// 8 0029140D020313
// 9 0000000000000000000000000000000000000000000000007A580000B45B000001007A580000B45B000000000000000000000000000000000000000000000000000000000000000000000000000000000000040100000000000004010000010002695B000000000000E2790000000000000000000000000000000000000000FFFFFFFFFFFFFFFF0040000000005D16

var startFlag = '68'
var cmdlen = 'D300'
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
var apciType = '11'
//1 桩编号  长度  8byte   压缩bcd
var devcode = '1234567890123456'
//2 充电接口标识
var port = '00'
//3 交易流水号 16byte
var serialNumber = '12345678901234567890123456789012'
//4 发起充电方式
var chargeType = chargeType_App;
//4 esam序列号
var esam = '01020304050607'
//5 物理卡号
var cardNo = '3131310000000000'
//6 分时计费模型
var timeCharge = '01'
//7 开始时间
var startTime = ''
//8 结束时间
var endTime = ''
//9 尖起
//10尖止
//11峰起
//12峰止
//13平起
//14平止
//15谷起
//16谷止
//17计量类型
//18总起值
//19总止值
//20尖单价
//21尖电量
//22尖金额
//23峰单价
//24峰电量
//25峰金额
//26平单价
//27平电量
//28平金额
//29谷单价
//30谷电量
//31谷金额
//32总金额
//33业务类型
//34充电模式
//35总度数金额
//36延时费
//37消费金额
//38电动汽车唯一标识
//39充电停止原因
//40验证码



//物理卡号
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
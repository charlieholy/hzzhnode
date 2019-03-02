/**
 * Created by chenpeiwen on 2019/3/2.
 */

/**
 * 获取p56time
 * @param buf
 * @returns {*}
 */
var getStringByP56Time = function (buf) {
    if(buf.length < 7){
        return "a";
    }
    console.log(buf.toString('hex').replace(/,/g,''))
    var year = buf[6]& 0x7f;
    year += 2000;
    var month = buf[5]& 0x0f;
    var day = buf[4]& 0x1f;
    var hour = buf[3]& 0x1f;
    var min = buf[2]& 0x3f
    var MillSec = buf[0] & 0xff;
    MillSec |= ((buf[1]&0xff) << 8);
    var second = MillSec/1000;
    var timeString = ("" + year + "-" + month + "-" + day +  " " + hour + ":" + min + ":" + second);
    return timeString;
}

var getP56TimeFromDate = function () {
    var date = new Date();
    console.log(date.toLocaleTimeString())
    var year = date.getFullYear();
    var month = date.getMonth()+1
    var day = date.getDate()
    var hour = date.getHours()
    var min = date.getMinutes();
    var second = date.getSeconds();
    console.log("year: " + year + " month:" + month + " day: " + day + " hour: " + hour
        +" min: " + min + " second: " + second)


    //不足0还得补0
    var Millsec = second*1000;
    var P56Ti  = [];
    P56Ti[0] = Millsec & 0xff;
    P56Ti[1] = Millsec >> 8;
    P56Ti[2] = min;
    P56Ti[3] = hour;
    P56Ti[4] = day;
    P56Ti[5] = month;
    P56Ti[6] = year%100;

    return P56Ti;
}


var mybuf = function (data) {
    var FBuf = Buffer.alloc(7);
    var len = data.length;
    len = len/2;
    FBuf.write(data,0,'hex')
    return FBuf;
}


var buf = [0x00,0x2e,0x12,0x0d,0x02,0x03,0x13];
var s = getStringByP56Time(buf)
console.log(s)

var p56TimeA = getP56TimeFromDate();
console.log(p56TimeA)

var ss = getStringByP56Time(mybuf('12818712172319'))
console.log(ss)



var P56Time={
    getStringByP56Time:getStringByP56Time
};

module.exports= P56Time;
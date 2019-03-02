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
        return "";
    }
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

var buf = [0x00,0x2e,0x12,0x0d,0x02,0x03,0x13];
var s = getStringByP56Time(buf)
console.log(s)

var P56Time={
    getStringByP56Time:getStringByP56Time
};

module.exports= P56Time;
/**
 * Created by chenpeiwen on 2019/3/2.
 */

var p56Time = require('./p56Time')
var buf = [0x00,0x2e,0x12,0x0d,0x02,0x03,0x13];
var time = p56Time.getStringByP56Time(buf);
console.log(time)

/**
 * Created by chenpeiwen on 2019/3/3.
 */
/**
 * Created by chenpeiwen on 2019/3/2.
 * 获取验证码
 */

var http = require('http');
var querystring = require('querystring');

var Android = 2;
var Ios = 3;



var phoneNumber = 15869038224


var http = require('http');

var qs = require('querystring');

var data = {
    phoneNumber: phoneNumber,
    time: new Date().getTime()};//这是需要提交的数据


var content = qs.stringify(data);

var options = {
    hostname: 'charge-test.evhzzh.com.',
    path: '/charge-app-server/app/user/getCode/' + phoneNumber + '?' + content,
    method: 'GET'
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});

req.end();

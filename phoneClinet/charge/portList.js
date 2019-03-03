/**
 * Created by chenpeiwen on 2019/3/3.
 */
/**
 * Created by chenpeiwen on 2019/3/2.
 * 查询所有枪列表
 */

var http = require('http');
var querystring = require('querystring');



var phoneNumber = 15869038224


var http = require('http');

var qs = require('querystring');

var data = {
    devCode: 3301082000000304,
    time: new Date().getTime()};//这是需要提交的数据


var content = qs.stringify(data);

var options = {
    hostname: 'charge-test.evhzzh.com.',
    path: '/charge-app-server/app/charge/portList?' +  content,
    method: 'GET',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        //'Content-Length':content.length,
        'authorization':"dea15aa0223b4f86bf63ed0963e60695"
    }
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


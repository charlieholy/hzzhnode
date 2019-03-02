/**
 * Created by chenpeiwen on 2019/3/2.
 * 用于登陆获取token
 */

var http = require('http');
var querystring = require('querystring');

var Android = 2;
var Ios = 3;

var contents = querystring.stringify({
    phoneNumber:18258256024,
    code:'0000',
    managementId:2,
    chanel:Ios
});



var options = {
    host:'charge-test.evhzzh.com.',
    path:'/charge-app-server/app/user/loginAndRegister',
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':contents.length
    }
}

var req = http.request(options, function(res){
    res.setEncoding('utf8');
    res.on('data',function(data){
        console.log("data:",data);   //一段html代码
    });
});

req.write(contents);
req.end;

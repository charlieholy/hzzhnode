/**
 * Created by chenpeiwen on 2019/3/24.
 */
var axios = require("axios")
var instance = axios.create({
    baseURL: 'https://charge-test.evhzzh.com.',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

console.log("init")

var Android = 2;
var Ios = 3;

axios.post('/charge-app-server/app/user/loginAndRegister', {
    phoneNumber:18258256024,
    code:'0000',
    managementId:2,
    chanel:Ios
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

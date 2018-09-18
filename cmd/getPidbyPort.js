
var nodeCmd = require('node-cmd');
function runCmdTest(cmd) {
    nodeCmd.get(
        cmd,
        function(err, data, stderr){
            console.log(data);
        }
    );
    nodeCmd.run(cmd);
}

runCmdTest('netstat -ano | findstr 50345')
runCmdTest('tasklist | findstr 7436')
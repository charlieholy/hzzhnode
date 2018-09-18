
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

runCmdTest('netstat -ano | findstr 3306')
runCmdTest('tasklist | findstr 4028')
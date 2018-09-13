var j = new Buffer('8822','hex')
var k = new Buffer('882299','hex')
if(j == k)
{
    console.log("j ==k")
}
console.log(j.toString('hex'))
console.log(k.slice(0,2).toString('hex'))

var BufferEu = function (a,b,start,end) {
    var sa = a.slice(start,end).toString('hex')
    var sb = b.slice(start,end).toString('hex')
    if(sa == sb)
        return true
    return false
}

if(BufferEu(j,k,0,2)){
    console.log("j == k")
}

exports.fc = BufferEu;
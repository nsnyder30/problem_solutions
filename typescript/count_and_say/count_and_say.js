function countAndSay(n) {
    if (n == 1) {
        return "1";
    }
    var ret = "";
    var str = countAndSay(n - 1);
    var x = str[0];
    ;
    n = 0;
    for (var i = 0; i < str.length; i++) {
        var v = str[i];
        if (v == x) {
            n += 1;
        }
        else {
            ret += n.toString() + x.toString();
            x = v;
            n = 1;
        }
    }
    ret += n.toString() + x.toString();
    return ret;
}
;
var inp = 1;
console.log("For input: " + inp.toString(), " CountAndSay = '" + countAndSay(inp) + "'");
inp = 4;
console.log("For input: " + inp.toString(), " CountAndSay = '" + countAndSay(inp) + "'");
inp = 5;
console.log("For input: " + inp.toString(), " CountAndSay = '" + countAndSay(inp) + "'");
inp = 6;
console.log("For input: " + inp.toString(), " CountAndSay = '" + countAndSay(inp) + "'");
inp = 7;
console.log("For input: " + inp.toString(), " CountAndSay = '" + countAndSay(inp) + "'");
inp = 8;
console.log("For input: " + inp.toString(), " CountAndSay = '" + countAndSay(inp) + "'");
inp = 9;
console.log("For input: " + inp.toString(), " CountAndSay = '" + countAndSay(inp) + "'");
inp = 10;
console.log("For input: " + inp.toString(), " CountAndSay = '" + countAndSay(inp) + "'");

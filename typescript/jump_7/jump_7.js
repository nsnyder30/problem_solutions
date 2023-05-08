/*
You are given a 0-indexed binary string s and two integers minJump and maxJump. In the beginning, you are standing at index 0, which is equal to '0'. You can move from index i to index j if the following conditions are fulfilled:

i + minJump <= j <= min(i + maxJump, s.length - 1), and
s[j] == '0'.
Return true if you can reach index s.length - 1 in s, or false otherwise.

2 <= s.length <= 10^5
s[i] is either '0' or '1'
s[0] == '0'
1 <= minJump <= maxJump < s.length
*/
function canReach(s, minJump, maxJump) {
    var l = s.length;
    if (s[l - 1] == '1') {
        return false;
    }
    var q = [[0, 0]];
    var i = 0;
    while (i <= q[0][1] && i < l - 1) {
        if (s[i] == '0') {
            var _a = [i + minJump, i + maxJump], nmin = _a[0], nmax = _a[1];
            if (nmin < l && nmax >= l - 1) {
                return true;
            }
            var last = q[q.length - 1];
            if (nmin >= last[0] && nmin <= last[1] && nmax > last[1]) {
                q[q.length - 1][1] = nmax;
            }
            else {
                q.push([nmin, nmax]);
            }
        }
        i++;
        if (i > q[0][1]) {
            q.shift();
            if (q.length) {
                i = q[0][0];
            }
            else {
                return false;
            }
        }
    }
    return false;
}
;
function testSol(inp, func, result) {
    if (result !== undefined) {
        if (func.apply(void 0, inp) === result) {
            console.log("PASS: " + JSON.stringify(inp));
        }
        else {
            console.log("FAIL: " + JSON.stringify(inp));
        }
    }
    else {
        console.log("For input " + JSON.stringify(inp));
        var sol = func.apply(void 0, inp);
        console.log("The solution is " + sol.toString() + "\n");
    }
}
var f = canReach;
testSol(["011010", 2, 3], f, true);
testSol(["01101110", 2, 3], f, false);
testSol(["00", 2, 3], f, false);
testSol(["001", 2, 3], f, false);
testSol(["000", 2, 3], f, true);

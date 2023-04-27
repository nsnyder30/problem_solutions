function jump(nums) {
    var cmax = 0;
    var pmax = 0;
    var jumps = 0;
    for (var i = 0; i < nums.length - 1; i++) {
        cmax = Math.max(i + nums[i], cmax);
        if (i == pmax) {
            pmax = cmax;
            jumps += 1;
        }
        if (pmax >= nums.length - 1) {
            return jumps;
        }
    }
    return jumps;
}
;
function testSol(inp, func, result) {
    if (result !== undefined) {
        if (func(inp) === result) {
            console.log("PASS: " + JSON.stringify(inp));
        }
        else {
            console.log("FAIL: " + JSON.stringify(inp));
        }
    }
    else {
        console.log("For input " + JSON.stringify(inp));
        var sol = func(inp);
        console.log("The solution is " + sol.toString() + "\n");
    }
}
var f = jump;
testSol([2, 3, 1, 1, 4], f, 2);
testSol([2, 3, 0, 1, 4], f, 2);
testSol([2], f, 0);
testSol([0], f, 0);
testSol([2, 2, 0, 1], f, 2);
testSol([2, 2, 0, 1, 1], f, 3);

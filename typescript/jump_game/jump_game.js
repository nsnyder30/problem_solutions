function canJump(nums) {
    if (nums.indexOf(0) == -1 || nums.length == 1) {
        return true;
    }
    var max = 0;
    for (var i = 0; i < nums.length - 1; i++) {
        max = i + nums[i] > max ? i + nums[i] : max;
        if (i == max) {
            return false;
        }
    }
    return true;
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
var f = canJump;
testSol([2, 3, 1, 1, 4], f, true);
testSol([3, 2, 1, 0, 4], f, false);
testSol([2], f, true);
testSol([0], f, true);
testSol([1, 0], f, true);
testSol([0, 1], f, false);
testSol([2, 2, 0, 1], f, true);
testSol([0, 2, 3], f, false);

function maxSubArray(nums) {
    let res = nums[0];
    let cmax = res;
    for (let i = 1; i < nums.length; i++) {
        let n = nums[i];
        cmax = Math.max(cmax + n, n);
        res = Math.max(res, cmax);
    }
    return res;
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
        let sol = func(inp);
        console.log("The solution is " + sol.toString() + "\n");
    }
}
var f = maxSubArray;
testSol([-2, 1, -3, 4, -1, 2, 1, -5, 4], f, 6);
testSol([1], f, 1);
testSol([5, 4, -1, 7, 8], f, 23);
testSol([-5], f, -5);
testSol([3, 2, -3, -1, 1, -3, 1, -1], f, 5);
//# sourceMappingURL=max_subarray.js.map
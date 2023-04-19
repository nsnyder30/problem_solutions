var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function combinationSum2(candidates, target) {
    candidates.sort(function (a, b) { return Number(a) < Number(b) ? -1 : 1; });
    var res = [];
    function buildSum(arr, nums, target) {
        if (target == 0) {
            res.push(arr);
            return;
        }
        var n = nums.shift();
        while (n <= target && (!arr.length || n >= arr[arr.length - 1])) {
            var a2 = __spreadArray([], arr, true);
            a2.push(n);
            buildSum(__spreadArray([], a2, true), __spreadArray([], nums, true), target - n);
            var p = n;
            while (n == p) {
                n = nums.shift();
            }
        }
    }
    buildSum([], __spreadArray([], candidates, true), target);
    return res;
}
;
var inp = [[2, 3, 6, 7], 7];
var sol = combinationSum2.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol) + "\n");
inp = [[2, 3, 5], 8];
sol = combinationSum2.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol) + "\n");
inp = [[2], 1];
sol = combinationSum2.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol) + "\n");
inp = [[10, 1, 2, 7, 6, 1, 5], 8];
sol = combinationSum2.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol) + "\n");
inp = [[2, 5, 2, 1, 2], 5];
sol = combinationSum2.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol) + "\n");

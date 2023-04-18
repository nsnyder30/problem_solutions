var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function combinationSum(candidates, target) {
    var sets = buildSum([[[], 0]], candidates, target);
    return sets.map(function (a) { return a[0]; });
}
;
function buildSum(sets, candidates, target) {
    var recurse = false;
    for (var i = sets.length - 1; i >= 0; i--) {
        if (sets[i][1] != target) {
            for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
                var n = candidates_1[_i];
                var s = __spreadArray([], sets[i][0], true);
                var sum = sets[i][1] + n;
                if (sum <= target && (s.length == 0 || n >= s[s.length - 1])) {
                    s.push(n);
                    sets.push([s, sum]);
                    if (sum < target) {
                        recurse = true;
                    }
                }
            }
            sets.splice(i, 1);
        }
    }
    if (recurse) {
        return buildSum(sets, candidates, target);
    }
    else {
        return sets;
    }
}
var inp = [[2, 3, 6, 7], 7];
var sol = combinationSum.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol));
inp = [[2, 3, 5], 8];
sol = combinationSum.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol));
inp = [[2], 1];
sol = combinationSum.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol));
inp = [[8, 7, 4, 3], 11];
sol = combinationSum.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol));

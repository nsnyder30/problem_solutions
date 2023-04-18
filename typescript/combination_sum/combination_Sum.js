function combinationSum(candidates, target) {
console.log("call combinationSum");
console.table({c:candidates, t:target});
    var res = [];
    if (target > 1) {
        for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
            var n = candidates_1[_i];
console.log({n:n, t:target});
            if (n == target) {
                res.push([n]);
console.log("target match");
console.table(res);
            }
            else if (n < target) {
                for (var _a = 0, _b = combinationSum(candidates, target - n); _a < _b.length; _a++) {
                    var a = _b[_a];
                    if (n >= a[a.length - 1]) {
                        a.push(n);
                        if (a.reduce(function (x, y) { return x + y; }) == target) {
console.log("target match");
console.table({t:target, a:a});
                            res.push(a);
                        }
                    }
                }
            }
        }
    }
console.log("end combinationSum");
console.table(res);
    return res;
}
;

/*
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
*/

inp = [[8, 7, 4, 3], 11];
sol = combinationSum.apply(void 0, inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol));

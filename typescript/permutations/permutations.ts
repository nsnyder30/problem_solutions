/*
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

1 <= nums.length <= 6
-10 <= nums[i] < 10
*/
function permute(nums: number[]): number[][] {
    let l = nums.length;
    let res = Array(factorial(l)).fill(0);
    for (let i in res) {
        let j = Number(i) + 1;
        let cset = Array.from(Array(l).keys());
        let coords = Array(l).fill(0);
        for (let k = 0; k < l; k++) {
            let kfact = factorial(l - k - 1);
            let nidx = ((j - (j % kfact)) / kfact) % (l - k);
            nidx = cset.splice(nidx, 1)[0];
            coords[k] = nums[nidx];
        }
        res[i] = coords;
    }
    return res;
};

var cache = new Map();
function factorial(n: number) {
    if (cache.has(n)) {
        return cache.get(n);
    }

    if (n <= 1) {
        cache.set(n, 1);
        return 1;
    }

    cache.set(n, n * factorial(n - 1));
    return cache.get(n);
}

function testSol(inp: any, func: Function, result?: any) {
    if (result !== undefined) {
        result = result.map(function (a) { return a.join('') });
        let test = func(inp).map(function (a) { return a.join(''); });
        let compareLeft = test.filter(function (a) { return result.indexOf(a) > -1 });
        let compareRight = result.filter(function (a) { return test.indexOf(a) > -1; });
        if (compareLeft.length == compareRight.length) {
            console.log("PASS: " + JSON.stringify(inp));
        } else {
            console.log("FAIL: " + JSON.stringify(inp));
        }
    } else {
        console.log("For input " + JSON.stringify(inp));
        let sol = func(inp);
        console.log("The solution is " + sol.toString() + "\n");
    }
}

var f = permute;
testSol([1, 2, 3], f, [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]);
testSol([0, 1], f, [[0, 1], [1, 0]]);
testSol([1], f, [[1]]);
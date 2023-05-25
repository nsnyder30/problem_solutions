/*
The set [1, 2, 3, ..., n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

"123"
"132"
"213"
"231"
"312"
"321"
Given n and k, return the kth permutation sequence.

1 <= n <= 9
1 <= k <= n!
*/
function getPermutation(n: number, k: number): string {
    let cset = Array.from(Array(n).keys());
    let coords = Array(n).fill(0);
    k -= 1;
    for (let i = 0; i < n; i++) {
        let kfact = factorial(n - i - 1);
        let nidx = ((k - (k % kfact)) / kfact) % (n - i);
        nidx = cset.splice(nidx, 1)[0];
        coords[i] = nidx + 1;
    }
    return coords.join('');
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
        if (func(...inp) === result) {
            console.log("PASS: " + JSON.stringify(inp));
        } else {
            console.log("FAIL: " + JSON.stringify(inp));
        }
    } else {
        console.log("For input " + JSON.stringify(inp));
        let sol = func(...inp);
        console.log("The solution is " + sol.toString() + "\n");
    }
}

var f = getPermutation;
testSol([3, 3], f, "213");
testSol([4, 9], f, "2314");
testSol([3, 1], f, "123");
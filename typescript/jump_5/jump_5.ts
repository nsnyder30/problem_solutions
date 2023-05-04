/*
Given an array of integers arr and an integer d. In one step you can jump from index i to index:

i + x where: i + x < arr.length and  0 < x <= d.
i - x where: i - x >= 0 and  0 < x <= d.
In addition, you can only jump from index i to index j if arr[i] > arr[j] and arr[i] > arr[k] for all indices k between i and j (More formally min(i, j) < k < max(i, j)).

You can choose any index of the array and start jumping. Return the maximum number of indices you can visit.

Notice that you can not jump outside of the array at any time.

1 <= arr.length <= 1000
1 <= arr[i] <= 10^5
1 <= d <= arr.length
*/
function maxJumps(arr: number[], d: number): number {
    let l = arr.length;
    let jmap = Array(l).fill(1);
    for (let i = 0; i < l; i++) {
        let m = arr[i];
        let p = arr[i - 1] || m;
        let n = arr[i + 1] || m;

        if (m == Math.min(p, m, n)) {
            increment(i);
        }
    }

    function increment(i: number): void {
        let n = arr[i];
        let jumps = jmap[i] + 1;

        for (let k = i + 1; k <= i + d; k++) {
            if (arr[k] > n && jumps > jmap[k]) {
                jmap[k] = jumps;
                increment(k);
                break;
            }
            n = Math.max(n, arr[k]);
        }

        n = arr[i];
        for (let k = i - 1; k >= i - d; k--) {
            if (arr[k] > n && jumps > jmap[k]) {
                jmap[k] = jumps;
                increment(k);
                break;
            }
            n = Math.max(n, arr[k]);
        }
    }

    return Math.max(...jmap);
};

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

let f = maxJumps;
testSol([[6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12],2], f, 4);
testSol([[3, 3, 3, 3, 3], 3], f, 1);
testSol([[7, 6, 5, 4, 3, 2, 1], 1], f, 7);
testSol([[38, 11, 69, 76, 33, 24, 6, 93, 48, 63, 50, 54, 19, 63, 85, 22, 21, 8, 49, 40, 63, 80, 32, 3, 61, 1, 5, 77, 27, 71, 31, 62, 38, 37, 91, 3, 25, 56, 93, 91, 12, 50, 19, 67, 50, 10, 71, 64, 48, 17, 58, 95, 92, 30, 22, 86, 51, 80, 43, 65, 38, 51, 33, 26, 3, 4, 75, 100, 40, 28, 50, 78, 54, 11, 96, 5, 51, 11, 17, 9, 32, 42, 63, 50, 58, 100, 61, 9, 55, 88, 19, 57, 7, 92, 21, 67, 16, 53, 97, 67, 90, 66, 68, 45, 57, 40, 45, 83, 88, 79, 48, 67, 11, 46, 11, 100, 61, 25, 15, 22, 7, 100, 2, 13, 92, 74, 9, 1, 23, 32, 22, 9, 66, 62, 40, 41, 73, 78, 22, 31, 16, 81, 57, 73, 66, 37, 6], 92], f, 12);
testSol([[10, 86, 10, 1, 41, 35, 42, 83, 14, 89, 48, 26, 44, 19, 92, 47, 63, 42, 58, 92, 11, 4, 38, 11, 50, 48, 33, 61, 54, 81, 7, 16, 95, 25, 54, 24, 70, 76, 60, 96, 25, 67, 71, 20, 10, 36, 26, 22, 9, 31, 32, 56, 21, 96, 98, 55, 84, 67, 60, 49, 22, 88, 39, 97, 95, 99, 11, 16, 6, 99, 28, 15, 67, 41, 80, 35, 27, 27, 80, 72, 42, 71, 82, 81, 13, 53, 86, 60, 2, 97, 86, 96, 25, 36, 71, 17, 95, 81, 45], 16], f, 11);

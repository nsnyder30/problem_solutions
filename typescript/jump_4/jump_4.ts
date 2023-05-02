/*
Given an array of integers arr, you are initially positioned at the first index of the array.

In one step you can jump from index i to index:

i + 1 where: i + 1 < arr.length.
i - 1 where: i - 1 >= 0.
j where: arr[i] == arr[j] and i != j.
Return the minimum number of steps to reach the last index of the array.

Notice that you can not jump outside of the array at any time.

1 <= arr.length <= 5 * 10^4
-10^8 <= arr[i] <= 10^8
*/
function minJumps(arr: number[]): number {
    let l = arr.length;
    if (l <= 2) {
        return arr.length - 1;
    }

    let jmap = Array(l).fill(l);
    let graph = new Map();
    jmap[l - 1] = 0;
    jmap[l - 2] = 1;
    let vals = Array.from(new Set(arr));
    for (let v of vals) {
        graph.set(v, l);
    }
    graph.set(arr[l - 1], 1);


    let loop = true;
    while (loop) {
        loop = false;
        for (let i = l - 2; i >= 1; i--) {
            let n = arr[i];
            let m = arr[i - 1];

            let jump = Math.min(jmap[i + 1], jmap[i - 1]) + 1;
            let njump = graph.get(n);

            if (njump <= jump) {
                jump = njump;
            } else {
                graph.set(n, jump + 1);
            }

            let mjump = graph.get(m);
            if (mjump <= jump - 1) {
                jump = mjump + 1;
                graph.set(n, mjump + 2);
            } else if (mjump > jump + 2) {
                graph.set(m, jump + 2);
            }

            if (jmap[i] != jump) {
                jmap[i] = jump;
                loop = true;
            }
        }

        let n = arr[0];
        let jump = jmap[1] + 1;
        let njump = graph.get(n);

        if (njump <= jump) {
            jump = njump;
        } else {
            graph.set(n, jump + 1);
        }

        if (jmap[0] != jump) {
            jmap[0] = jump;
            loop = true;
        }
    }

    return jmap[0];
};

function testSol(inp: any, func: Function, result?: any) {
    if (result !== undefined) {
        if (func(inp) === result) {
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

let f = minJumps;
testSol([100, -23, -23, 404, 100, 23, 23, 23, 3, 404], f, 3);
testSol([100, 404, -23, -23, 100, 23, 23, 23, 3, 404], f, 2);
testSol([7, 6, 5, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4], f, 4);
testSol([7, 1, 1, 1, 1, 7, 5, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4], f, 4);
testSol([7, 10, 10, 10, 6, 7, 9, 9, 9, 99, 99, 99, 4, 5, 6, 11, 11, 11, 11, 1, 1, 1, 4], f, 6);
testSol([7], f, 0);
testSol([7, 6, 9, 6, 9, 6, 9, 7], f, 1);
testSol([8, 8], f, 1);
testSol([3, 9], f, 1);
testSol([7, 7, 7, 7, 7, 7, 7], f, 1)
testSol([1, 2, 2, 2, 2, 2, 1], f, 1)
testSol([1,1,1,1,1,1,2], f, 2)
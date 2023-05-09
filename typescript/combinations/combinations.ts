/*
Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

You may return the answer in any order.

1 <= n <= 20
1 <= k <= n
*/
function combine(n: number, k: number): number[][] {
    const res: number[][] = [];
    let arr: number[] = Array(k).fill(0);

    function build(idx: number, val:number): void {
        if (idx == k) {
            res.push([...arr]);
            return;
        }

        for (let i = val; i <= n; i++) {
            arr[idx] = i;
            build(idx+1, i + 1);
        }
    }

    build(0, 1);
    return res;
};

function testSol(inp: any, func: Function, result?: any) {
    if (result !== undefined) {
        if (JSON.stringify(func(...inp)) === JSON.stringify(result)) {
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

var f = combine;
testSol([4, 2], f, [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]);
testSol([1, 1], f, [[1]]);
function canReach(arr: number[], start: number): boolean {
    let queue = [start];
    while (queue.length > 0) {
        let i = queue.pop();
        let v = arr[i];
        if (v === undefined) {
            continue;
        }

        if (v == 0) {
            return true;
        }

        arr[i] = undefined;
        queue.push(i + v, i - v);
    }
    return false;
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

let f = canReach;
testSol([[4, 2, 3, 0, 3, 1, 2], 5], f, true);
testSol([[4, 2, 3, 0, 3, 1, 2], 0], f, true);
testSol([[3, 0, 2, 1, 2], 2], f, false);
testSol([[0], 0], f, true);
testSol([[1], 0], f, false);

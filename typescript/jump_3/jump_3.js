function canReach(arr, start) {
    var queue = [start];
    while (queue.length > 0) {
        var i = queue.pop();
        var v = arr[i];
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
}
;
function testSol(inp, func, result) {
    if (result !== undefined) {
        if (func.apply(void 0, inp) === result) {
            console.log("PASS: " + JSON.stringify(inp));
        }
        else {
            console.log("FAIL: " + JSON.stringify(inp));
        }
    }
    else {
        console.log("For input " + JSON.stringify(inp));
        var sol = func.apply(void 0, inp);
        console.log("The solution is " + sol.toString() + "\n");
    }
}
var f = canReach;
testSol([[4, 2, 3, 0, 3, 1, 2], 5], f, true);
testSol([[4, 2, 3, 0, 3, 1, 2], 0], f, true);
testSol([[3, 0, 2, 1, 2], 2], f, false);
testSol([[0], 0], f, true);
testSol([[1], 0], f, false);

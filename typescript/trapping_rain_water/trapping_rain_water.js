function trap(height) {
    var i = 0, max = height[0];
    var x = 0;
    for (i = 1; i < height.length; i++) {
        var h_1 = height[i];
        if (h_1 > max) {
            max = height[i];
        }
        x += max - h_1;
    }
    i -= 1;
    var h = height[i];
    var min = h;
    while (h != max) {
        x += min - max;
        i -= 1;
        h = height[i];
        if (h > min) {
            min = h;
        }
    }
    return x;
}
;
function testSol(inp, func) {
    console.log("For input" + JSON.stringify(inp));
    var sol = func(inp);
    console.log("The solution is " + JSON.stringify(sol) + "\n");
}
var f = trap;
testSol([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], f);
testSol([4, 2, 0, 3, 2, 5], f);
testSol([4], f);
testSol([0], f);
testSol([1, 2, 3], f);
testSol([3, 2, 1], f);
testSol([0, 10, 3], f);
testSol([3, 2, 3], f);
testSol([3, 2, 3, 0, 0, 3], f);
testSol([4, 2, 3], f);
testSol([4, 2, 3, 4, 3], f);
testSol([3, 2, 4], f);

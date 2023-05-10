var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000
*/
function rotate(matrix) {
    var _a;
    var l = matrix.length;
    var l2 = (l - 1) / 2;
    for (var i = 0; i <= l2; i++) {
        for (var j = 0; j < l2; j++) {
            // Row becomes previous column, column becomes negative of the row
            var _b = [i, j, l - i - 1, l - j - 1], a = _b[0], b = _b[1], c = _b[2], d = _b[3];
            _a = [matrix[a][b], matrix[b][c], matrix[c][d], matrix[d][a]], matrix[b][c] = _a[0], matrix[c][d] = _a[1], matrix[d][a] = _a[2], matrix[a][b] = _a[3];
        }
    }
}
;
function testSol(inp, func, result) {
    if (result !== undefined) {
        var before = __spreadArray([], inp, true);
        func(inp);
        if (JSON.stringify(before) === JSON.stringify(inp)) {
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
var f = rotate;
testSol([[1, 2, 3], [4, 5, 6], [7, 8, 9]], f, [[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
testSol([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]], f, [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]);

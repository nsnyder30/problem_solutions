/**
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000
*/
function rotate(matrix: number[][]): void {
    let l = matrix.length;
    let l2 = (l-1) / 2;
    for (let i = 0; i <= l2; i++) {
        for (let j = 0; j < l2; j++) {
            // Row becomes previous column, column becomes negative of the row
            let [a, b, c, d] = [i, j, l - i - 1, l - j - 1];
            [matrix[b][c], matrix[c][d], matrix[d][a], matrix[a][b]] = [matrix[a][b], matrix[b][c], matrix[c][d], matrix[d][a]];
        }
    }
};

function testSol(inp: any, func: Function, result?: any) {
    if (result !== undefined) {
        let before = [...inp];
        func(inp);
        if (JSON.stringify(before) === JSON.stringify(inp)) {
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

var f = rotate;
testSol([[1, 2, 3], [4, 5, 6], [7, 8, 9]] , f, [[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
testSol([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]], f, [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]);
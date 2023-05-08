/*
You start at the cell (rStart, cStart) of an rows x cols grid facing east. The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.

You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all rows * cols spaces of the grid.

Return an array of coordinates representing the positions of the grid in the order you visited them.


1 <= rows, cols <= 100
0 <= rStart < rows
0 <= cStart < cols
*/
function spiralMatrixIII(rows: number, cols: number, rStart: number, cStart: number): number[][] {
    let res = [[rStart, cStart]];
    let r = rStart;
    let c = cStart;
    let w = 1;
    while (res.length < rows * cols) {
        let rlow = Math.max(-1, rStart - w);
        let clow = Math.max(-1, cStart - w);
        let rhigh = Math.min(rows, rStart + w);
        let chigh = Math.min(cols, cStart + w);

        if (r == -1) {c = chigh;}
        while (c < chigh) {
            c += 1;
            if (r > -1 && c < cols) {
                res.push([r, c]);
            }
        }

        if (c == cols) {r = rhigh;}
        while (r < rhigh) {
            r += 1;
            if (c < cols && r < rows) {
                res.push([r, c]);
            }
        }

        if (r == rows) {c = clow;}
        while (c > clow) {
            c -= 1;
            if (r < rows && c > -1) {
                res.push([r, c]);
            }
        }

        if (c == -1) { r = rlow;}
        while (r > rlow) {
            r -= 1;
            if (c > -1 && r > -1) {
                res.push([r, c]);
            }
        }
        w += 1;
    }

    return res;
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

let f = spiralMatrixIII;
testSol([5, 6, 1, 4], f, [[1, 4], [1, 5], [2, 5], [2, 4], [2, 3], [1, 3], [0, 3], [0, 4], [0, 5], [3, 5], [3, 4], [3, 3], [3, 2], [2, 2], [1, 2], [0, 2], [4, 5], [4, 4], [4, 3], [4, 2], [4, 1], [3, 1], [2, 1], [1, 1], [0, 1], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]]);

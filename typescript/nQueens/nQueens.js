function solveNQueens(n) {
    function bitToString(board) {
        let ret = [];
        for (let r = 0; r < n; r++) {
            let row = Array(n).fill(".");
            row[board[r].toString(2).length - 1] = "Q";
            ret[r] = row.join('');
        }
        return ret;
    }
    function genBoard(cells, board) {
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            let row = cell[0];
            if (row != cells[0][0]) {
                return;
            }
            let newboard = [...board];
            newboard[row] = (1 << cell[1]);
            if (row == n - 1 && !(newboard.join('') in res)) {
                res[newboard.join('')] = (bitToString(newboard));
                continue;
            }
            let newcells = cells.filter(function (c) { return c[0] != row && c[1] != cell[1] && c[2] != cell[2] && c[3] != cell[3]; });
            if (newcells.length > 0 && newcells[0][0] == row + 1) {
                genBoard(newcells, newboard);
            }
        }
    }
    function genCells(n) {
        let cells = Array(n * n).fill(0).map(() => []);
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                let d1 = (n - 1) - r + c;
                let d2 = (n - 1) * 2 - r - c;
                cells[r * n + c] = [r, c, d1, d2];
            }
        }
        return cells;
    }
    let res = {};
    let cells = genCells(n);
    genBoard(cells, Array(n).fill(0));
    return Object.values(res);
}
;
function testSol(inp, func) {
    console.log("For input " + JSON.stringify(inp));
    let sol = func(inp);
    console.log("The solution is ");
    for (let t of sol) {
        console.table(t);
    }
}
let f = solveNQueens;
testSol(1, f);
testSol(2, f);
testSol(3, f);
testSol(4, f);
testSol(5, f);
testSol(6, f);
testSol(7, f);
testSol(8, f);
testSol(9, f);
//# sourceMappingURL=nQueens.js.map
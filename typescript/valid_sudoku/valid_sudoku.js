/*
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
*/
function isValidSudoku(board) {
    var row = 0;
    var col = 0;
    var blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            if (board[r][c] !== ".") {
                var v = Number(board[r][c]);
                var block = (r - r % 3) + (c - c % 3) / 3;
                if (blocks[block] & (1 << (v - 1))) {
                    return false;
                }
                blocks[block] |= (1 << (v - 1));
                if (row & (1 << (v - 1))) {
                    return false;
                }
                row |= (1 << (v - 1));
            }
            if (board[c][r] !== ".") {
                var v = Number(board[c][r]);
                if (col & (1 << (v - 1))) {
                    return false;
                }
                col |= (1 << (v - 1));
            }
            if (c == 8) {
                col = 0;
                row = 0;
            }
        }
    }
    return true;
}
;
var inp;
var sol;
inp = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];
sol = isValidSudoku(inp);
console.log("The following board is " + (sol ? "valid" : "invalid"));
console.table(inp);
inp = [
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];
sol = isValidSudoku(inp);
console.log("The following board is " + (sol ? "valid" : "invalid"));
console.table(inp);
inp = [
    [".", ".", ".", ".", ".", ".", "5", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "3"],
    [".", "2", ".", "7", ".", ".", ".", ".", "."],
    ["8", "3", "6", "5", ".", ".", ".", ".", "1"],
    [".", ".", ".", ".", ".", "1", ".", ".", "."],
    ["2", ".", ".", ".", ".", ".", ".", ".", "5"],
    [".", ".", ".", ".", ".", ".", ".", ".", "7"],
    [".", ".", ".", "4", ".", ".", ".", "7", "."]
];
sol = isValidSudoku(inp);
console.log("The following board is " + (sol ? "valid" : "invalid"));
console.table(inp);

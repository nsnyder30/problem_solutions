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
    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
            // Rows
            if (!checkSubset([...board[i * 3 + k]])) {
                return false;
            }
            // Columns
            if (!checkSubset([board[0][i * 3 + k], board[1][i * 3 + k], board[2][i * 3 + k],
                board[3][i * 3 + k], board[4][i * 3 + k], board[5][i * 3 + k],
                board[6][i * 3 + k], board[7][i * 3 + k], board[8][i * 3 + k]])) {
                return false;
            }
            // Squares
            if (!checkSubset([board[i * 3][k * 3], board[i * 3 + 1][k * 3], board[i * 3 + 2][k * 3],
                board[i * 3][k * 3 + 1], board[i * 3 + 1][k * 3 + 1], board[i * 3 + 2][k * 3 + 1],
                board[i * 3][k * 3 + 2], board[i * 3 + 1][k * 3 + 2], board[i * 3 + 2][k * 3 + 2]])) {
                return false;
            }
        }
    }
    return true;
}
;
function checkSubset(sub) {
    const nums = {};
    for (let c of sub) {
        if (c != ".") {
            if (c in nums) {
                return false;
            }
            else {
                nums[c] = 1;
            }
        }
    }
    return true;
}
let inp;
let sol;
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
//# sourceMappingURL=valid_sudoku.js.map
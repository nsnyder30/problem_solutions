var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function solveSudoku(board) {
    var _a = convertToBits(board), _b = _a[0], rows = _b[0], cols = _b[1], blocks = _b[2], bitBoard = _a[1];
    var sol = solveSudokuBits(rows, cols, blocks, bitBoard);
    convertToStrings(board, sol);
}
;
function solveSudokuBits(rows, cols, blocks, bitBoard) {
    var intersect = 0;
    var min = 9;
    var coords = [0, 0, 0];
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            if (bitBoard[r][c] == 0) {
                var b = (r - r % 3) + (c - c % 3) / 3;
                intersect = rows[r] | cols[c] | blocks[b];
                if (intersect == 511) {
                    // A blank spot with a full intersection meansa nonviable board
                    return [[0]];
                }
                var nums = countNums(intersect);
                if (nums == 8) {
                    var v = 511 - intersect;
                    rows[r] |= v;
                    cols[c] |= v;
                    blocks[b] |= v;
                    bitBoard[r][c] = v;
                    return solveSudokuBits(rows, cols, blocks, bitBoard);
                }
                else if (9 - nums < min) {
                    min = 9 - nums;
                    coords = [r, c, 511 - intersect];
                }
            }
        }
    }
    if (Math.min.apply(Math, rows) == 511) {
        // All rows are complete. Return completed board.
        return bitBoard;
    }
    else {
        // The board is incomplete, so test each value at the last point of minimum possible inputs.
        var i = 0;
        var r = coords[0], c = coords[1], v = coords[2];
        do {
            ++i;
            if (v & 1) {
                var b = (r - r % 3) + (c - c % 3) / 3;
                var _a = [__spreadArray([], rows, true), __spreadArray([], cols, true), __spreadArray([], blocks, true)], tRows = _a[0], tCols = _a[1], tBlocks = _a[2];
                var v_1 = (1 << i - 1);
                tRows[r] |= v_1;
                tCols[c] |= v_1;
                tBlocks[b] |= v_1;
                bitBoard[r][c] = v_1;
                var check = solveSudokuBits(tRows, tCols, tBlocks, bitBoard.map(function (a) { return a.slice(); }));
                if (check[0][0] !== 0) {
                    copyBoard(bitBoard, check);
                    return bitBoard;
                }
            }
        } while (v >>= 1);
        return [[0]];
    }
}
function countNums(n) {
    var c = 0;
    do
        if (n & 1)
            ++c;
    while (n >>= 1);
    return c;
}
function copyBoard(target, source) {
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            target[r][c] = source[r][c];
        }
    }
}
function convertToBits(board) {
    var newBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    var rows = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var cols = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            if (board[r][c] !== ".") {
                var v = (1 << Number(board[r][c]) - 1);
                var block = (r - r % 3) + (c - c % 3) / 3;
                blocks[block] |= v;
                rows[r] |= v;
                newBoard[r][c] = v;
            }
            if (board[c][r] !== ".") {
                var v = Number(board[c][r]);
                cols[r] |= (1 << (v - 1));
            }
        }
    }
    return [[rows, cols, blocks], newBoard];
}
;
function convertToStrings(board, bitBoard) {
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            board[r][c] = bitBoard[r][c] == 0 ? "." : (bitBoard[r][c].toString(2).length).toString();
        }
    }
}
;
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
console.log("Input Board:");
console.table(inp);
solveSudoku(inp);
console.log("Solution:");
console.table(inp);
console.log("\n");
inp = [
    [".", ".", "6", ".", "7", "4", ".", "2", "."],
    [".", "3", ".", ".", ".", ".", ".", ".", "1"],
    [".", ".", "5", ".", "9", ".", ".", ".", "."],
    ["3", ".", ".", ".", ".", "9", ".", "8", "."],
    ["2", ".", ".", ".", "1", ".", ".", ".", "4"],
    [".", "9", ".", "6", ".", ".", ".", ".", "3"],
    [".", ".", ".", ".", "2", ".", "1", ".", "."],
    ["6", ".", ".", ".", ".", ".", ".", "7", "."],
    [".", "1", ".", "8", "5", ".", "9", ".", "."]
];
console.log("Input Board:");
console.table(inp);
solveSudoku(inp);
console.log("Solution:");
console.table(inp);
console.log("\n");

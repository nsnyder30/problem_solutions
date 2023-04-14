function solveSudoku(board) {
    let [[rows, cols, blocks], bitBoard, queues] = convertToBits(board);
    const sol = solveSudokuBits(rows, cols, blocks, bitBoard, queues);
    convertToStrings(board, sol);
}
;
function solveSudokuBits(rows, cols, blocks, bitBoard, queues) {
    let intersect = 0;
    // Queues allow us to scan cells in order of smallest sets of possible values
    const newQueue = {};
    let recurse = false;
    for (const i in queues.q) {
        const cell = Number(i);
        const c = cell % 10;
        const r = (cell % 100 - c) / 10;
        const b = (r - r % 3) + (c - c % 3) / 3;
        delete queues.q[i];
        delete queues.r[r][i];
        delete queues.c[c][i];
        delete queues.b[b][i];
        // Because of neighbor evaluation, some cells in queue will already be solved by the time we reach them
        if (bitBoard[r][c] !== 0) {
            continue;
        }
        intersect = rows[r] | cols[c] | blocks[b];
        if (intersect == 511) {
            // A blank spot with a full intersection meansa nonviable board
            return [[0]];
        }
        const v = 511 - intersect;
        const n = countNums(v);
        if (n == 1) {
            recurse = true;
            rows[r] |= v;
            cols[c] |= v;
            blocks[b] |= v;
            bitBoard[r][c] = v;
            // If a cell value is identified, evaluate all neighbors before continuing
            // Neighbors share a row, a column, or a block with the identified cell
            // Evaluate blocks first since they share up to four cells with neighbor row and column
            for (const k in queues.b[b]) {
                const cell = Number(k);
                const cc = cell % 10;
                const cr = (cell % 100 - cc) / 10;
                const cb = (cr - cr % 3) + (cc - cc % 3) / 3;
                delete queues.b[b][cell];
                // Remove the shared cells from evaluation from neighbor row and column
                if (cr == r) {
                    delete queues.r[r][cell];
                }
                if (cc == c) {
                    delete queues.c[c][cell];
                }
                if (bitBoard[cr][cc] !== 0) {
                    continue;
                }
                intersect = rows[cr] | cols[cc] | blocks[cb];
                const cv = 511 - intersect;
                const cn = countNums(cv);
                if (cn == 1) {
                    // If a new value is identified, remove the cell from queue
                    rows[cr] |= cv;
                    cols[cc] |= cv;
                    blocks[cb] |= cv;
                    bitBoard[cr][cc] = cv;
                    if (cell in queues.q) {
                        delete queues.q[cell];
                    }
                    if (cell in newQueue) {
                        delete newQueue[cell];
                    }
                }
                else if (bitBoard[cr][cc] == 0) {
                    // If no new value is identified, reprioritize the cell in queue
                    queues.b[b][cn * 100 + cr * 10 + cc] = cv;
                    if (cell in queues.q) {
                        delete queues.q[cell];
                        queues.q[cn * 100 + cr * 10 + cc] = cv;
                    }
                    if (cell in newQueue) {
                        delete newQueue[cell];
                        newQueue[cn * 100 + cr * 10 + cc] = cv;
                    }
                }
            }
            // Evaluate row neighbors
            for (const k in queues.r[r]) {
                const cell = Number(k);
                const cc = cell % 10;
                const cr = (cell % 100 - cc) / 10;
                const cb = (cr - cr % 3) + (cc - cc % 3) / 3;
                delete queues.r[r][cell];
                if (bitBoard[cr][cc] !== 0) {
                    continue;
                }
                intersect = rows[cr] | cols[cc] | blocks[cb];
                const cv = 511 - intersect;
                const cn = countNums(cv);
                if (cn == 1) {
                    // If a new value is identified, remove the cell from queue
                    rows[cr] |= cv;
                    cols[cc] |= cv;
                    blocks[cb] |= cv;
                    bitBoard[cr][cc] = cv;
                    if (cell in queues.q) {
                        delete queues.q[cell];
                    }
                    if (cell in newQueue) {
                        delete newQueue[cell];
                    }
                }
                else if (bitBoard[cr][cc] == 0) {
                    // If no new value is identified, reprioritize the cell in queue
                    queues.r[r][cn * 100 + cr * 10 + cc] = cv;
                    if (cell in queues.q) {
                        delete queues.q[cell];
                        queues.q[cn * 100 + cr * 10 + cc] = cv;
                    }
                    if (cell in newQueue) {
                        delete newQueue[cell];
                        newQueue[cn * 100 + cr * 10 + cc] = cv;
                    }
                }
            }
            // Evaluate column neighbors
            for (const k in queues.c[c]) {
                const cell = Number(k);
                const cc = cell % 10;
                const cr = (cell % 100 - cc) / 10;
                const cb = (cr - cr % 3) + (cc - cc % 3) / 3;
                delete queues.c[c][cell];
                if (bitBoard[cr][cc] !== 0) {
                    continue;
                }
                intersect = rows[cr] | cols[cc] | blocks[cb];
                const cv = 511 - intersect;
                const cn = countNums(cv);
                if (cn == 1) {
                    // If a new value is identified, remove the cell from queue
                    rows[cr] |= cv;
                    cols[cc] |= cv;
                    blocks[cb] |= cv;
                    bitBoard[cr][cc] = cv;
                    if (cell in queues.q) {
                        delete queues.q[cell];
                    }
                    if (cell in newQueue) {
                        delete newQueue[cell];
                    }
                }
                else if (bitBoard[cr][cc] == 0) {
                    // If no new value is identified, reprioritize the cell in queue
                    queues.c[c][cn * 100 + cr * 10 + cc] = cv;
                    if (cell in queues.q) {
                        delete queues.q[cell];
                        queues.q[cn * 100 + cr * 10 + cc] = cv;
                    }
                    if (cell in newQueue) {
                        delete newQueue[cell];
                        newQueue[cn * 100 + cr * 10 + cc] = cv;
                    }
                }
            }
        }
        else {
            // If cell in the main queue is not identified, add it back into queue
            newQueue[n * 100 + r * 10 + c] = v;
            queues.r[r][n * 100 + r * 10 + c] = v;
            queues.c[c][n * 100 + r * 10 + c] = v;
            queues.b[b][n * 100 + r * 10 + c] = v;
        }
    }
    if (recurse) {
        // If any cells values from the queue have been identified, process the queue again
        // with updated priorities
        Object.assign(queues.q, newQueue);
        return solveSudokuBits(rows, cols, blocks, bitBoard, queues);
    }
    if (Math.min(...rows) == 511) {
        // All rows are complete. Return completed board.
        return bitBoard;
    }
    else {
        // The board is incomplete, so guess each value at the last point of minimum possible inputs.
        let i = 0;
        const k = Number(Object.keys(newQueue)[0]);
        let [r, c, v] = [(k % 100 - k % 10) / 10, k % 10, newQueue[k]];
        const b = (r - r % 3) + (c - c % 3) / 3;
        delete newQueue[k];
        do {
            ++i;
            if (v & 1) {
                let [tRows, tCols, tBlocks] = [[...rows], [...cols], [...blocks]];
                let tQueues = Object.assign({}, queues);
                Object.assign(tQueues.q, newQueue);
                let x = (1 << (i - 1));
                tRows[r] |= x;
                tCols[c] |= x;
                tBlocks[b] |= x;
                bitBoard[r][c] = x;
                const check = solveSudokuBits(tRows, tCols, tBlocks, bitBoard.map(function (a) { return a.slice(); }), tQueues);
                if (check[0][0] !== 0) {
                    copyBoard(bitBoard, check);
                    return bitBoard;
                }
            }
        } while (v >>= 1);
        return [[0]];
    }
}
// Counts the number of ones in a bit stream
function countNums(n) {
    let c = 0;
    do
        if (n & 1)
            ++c;
    while (n >>= 1);
    return c;
}
// Updates a board by reference
// Need this when guessing values so we only save the guessed board if the guess was correct
function copyBoard(target, source) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            target[r][c] = source[r][c];
        }
    }
}
// Convert string-input board to bit representations
// Generate helper objects to track values occupying each row, column, and block
// Generate queue object
function convertToBits(board) {
    const newBoard = [
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
    let rows = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let cols = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let queues = {
        'q': {},
        'r': { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {} },
        'c': { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {} },
        'b': { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {} }
    };
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let b = (r - r % 3) + (c - c % 3) / 3;
            if (board[r][c] !== ".") {
                const v = (1 << (Number(board[r][c]) - 1));
                rows[r] |= v;
                cols[c] |= v;
                blocks[b] |= v;
                newBoard[r][c] = v;
            }
            else {
                // Add to queues
                const v = 511 - (rows[r] | cols[c] | blocks[b]);
                const n = countNums(v);
                queues.q[n * 100 + r * 10 + c] = v;
                queues.r[r][n * 100 + r * 10 + c] = v;
                queues.c[c][n * 100 + r * 10 + c] = v;
                queues.b[b][n * 100 + r * 10 + c] = v;
            }
        }
    }
    return [[rows, cols, blocks], newBoard, queues];
}
;
// Convert bitwise board back to string
function convertToStrings(board, bitBoard) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            board[r][c] = bitBoard[r][c] == 0 ? "." : (bitBoard[r][c].toString(2).length).toString();
        }
    }
    return board;
}
;
// Generates a blank board. Only need this when we want to print boards while debugging
function blankBoard() {
    return [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."]
    ];
}
;
// Evaluate a given board for conflicts
function isValidSudoku(board) {
    let row = 0;
    let col = 0;
    let blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] !== ".") {
                const v = Number(board[r][c]);
                const block = (r - r % 3) + (c - c % 3) / 3;
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
                const v = Number(board[c][r]);
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
console.log("Input Board:");
console.table(inp);
solveSudoku(inp);
console.log("Solution:");
//console.log("Loops: " + loops.toString());
console.table(inp);
console.log("\n");
//loops = 0;
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
console.log("Solution: ");
//console.log("Loops: " + loops.toString());
console.table(inp);
console.log("\n");
//loops = 0;
inp = [
    [".", ".", ".", "8", ".", ".", "4", ".", "."],
    [".", ".", "2", ".", "9", "7", ".", ".", "6"],
    [".", ".", ".", ".", ".", ".", ".", ".", "5"],
    [".", ".", ".", "2", ".", ".", "3", "9", "."],
    [".", "9", ".", "6", "3", "4", ".", "2", "."],
    [".", "2", "5", ".", ".", "1", ".", ".", "."],
    ["7", ".", ".", ".", ".", ".", ".", ".", "."],
    ["2", ".", ".", "3", "5", ".", "8", ".", "."],
    [".", ".", "3", ".", "2", ".", ".", ".", "."]
];
console.log("Input Board:");
console.table(inp);
solveSudoku(inp);
console.log("Solution: ");
//console.log("Loops: " + loops.toString());
console.table(inp);
console.log("\n");
//loops = 0;
inp = [
    ["6", ".", "4", ".", "8", ".", ".", ".", "7"],
    [".", "8", ".", ".", ".", "2", ".", "9", "."],
    ["1", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "7", ".", "3", "6", "2", "."],
    [".", ".", "6", ".", ".", ".", "7", ".", "."],
    [".", "2", "5", "6", ".", "8", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "9"],
    [".", "5", ".", "4", ".", ".", ".", "3", "."],
    ["4", ".", ".", ".", "5", ".", "1", ".", "2"]
];
console.log("Input Board:");
console.table(inp);
solveSudoku(inp);
console.log("Solution: ");
//console.log("Loops: " + loops.toString());
console.table(inp);
console.log("\n");
//# sourceMappingURL=sudoku_solver.js.map
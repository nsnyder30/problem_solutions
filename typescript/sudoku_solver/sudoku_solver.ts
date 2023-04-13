function solveSudoku(board: string[][]): void {
    let [[rows, cols, blocks], bitBoard] = convertToBits(board);
    const sol = solveSudokuBits(rows, cols, blocks, bitBoard);
    convertToStrings(board, sol);
};

function solveSudokuBits(rows: number[], cols: number[], blocks: number[], bitBoard: number[][]): number[][] {
    let intersect = 0;
    let min = 9;
    let coords = [0, 0, 0];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (bitBoard[r][c] == 0) {
                const b = (r - r % 3) + (c - c % 3) / 3;
                intersect = rows[r] | cols[c] | blocks[b];
                if (intersect == 511) {
                    // A blank spot with a full intersection meansa nonviable board
                    return [[0]];
                }
                const nums = countNums(intersect);
                if (nums == 8) {
                    const v = 511 - intersect;
                    rows[r] |= v;
                    cols[c] |= v;
                    blocks[b] |= v;
                    bitBoard[r][c] = v;
                    return solveSudokuBits(rows, cols, blocks, bitBoard);
                } else if (9-nums < min) {
                    min = 9-nums;
                    coords = [r, c, 511 - intersect];
                }
            }
        }
    }

    if (Math.min(...rows) == 511) {
        // All rows are complete. Return completed board.
        return bitBoard;
    } else {
        // The board is incomplete, so test each value at the last point of minimum possible inputs.
        let i: number = 0;
        let [r, c, v] = coords;
        do {
            ++i;
            if (v & 1) {
                const b = (r - r % 3) + (c - c % 3) / 3;
                let [tRows, tCols, tBlocks] = [[...rows], [...cols], [...blocks]];
                let v = (1 << i - 1);
                tRows[r] |= v;
                tCols[c] |= v;
                tBlocks[b] |= v;
                bitBoard[r][c] = v;
                const check = solveSudokuBits(tRows, tCols, tBlocks, bitBoard.map(function (a) { return a.slice(); }));
                if (check[0][0] !== 0) {
                    copyBoard(bitBoard, check);
                    return bitBoard;
                }
            }
        } while (v >>= 1);
        return [[0]];
    }
}

function countNums(n: number): number {
    let c: number = 0;
    do if (n & 1) ++c; while (n >>= 1);
    return c;
}

function copyBoard(target: any[][], source: any[][]): void {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            target[r][c] = source[r][c];
        }
    }
}

function convertToBits(board: string[][]): [number[][], number[][]] {
    const newBoard: number[][] = [
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

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] !== ".") {
                const v = (1 << Number(board[r][c]) - 1);
                const block = (r - r % 3) + (c - c % 3) / 3;
                blocks[block] |= v;
                rows[r] |= v;
                newBoard[r][c] = v;
            }


            if (board[c][r] !== ".") {
                const v = Number(board[c][r]);
                cols[r] |= (1 << (v - 1));
            }
        }
    }

    return [[ rows, cols, blocks ], newBoard];
};

function convertToStrings(board: string[][], bitBoard: number[][]): void {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            board[r][c] = bitBoard[r][c] == 0 ? "." : (bitBoard[r][c].toString(2).length).toString();
        }
    }
};

function isValidSudoku(board: string[][]): boolean {
    let row: number = 0;
    let col: number = 0;
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
};

let inp: string[][];
let sol: boolean;
inp = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
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
]
console.log("Input Board:");
console.table(inp);
solveSudoku(inp);
console.log("Solution:");
console.table(inp);
console.log("\n");

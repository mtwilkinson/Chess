import {copyBoard, copyHighlight, emptyHighlight} from "./pieces.ts";

export function inCheck(board: string[][], white: boolean): boolean {
    let newHighlights = emptyHighlight();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] !== ' ' && isDifferentColor(board[i][j], white)) {
                newHighlights = possibleMoves(newHighlights, board, j, i);
            }
        }
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((board[i][j] === 'K' && white) || (board[i][j] === 'k' && !white)) {
                return newHighlights[i][j] === 3;
            }
        }
    }
}

export function inCheckMate(board: string[][], white: boolean): boolean {
    let newHighlights = emptyHighlight();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] !== ' ' && !isDifferentColor(board[i][j], white)) {
                newHighlights = legalMoves(newHighlights, board, j, i);
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (newHighlights[i][j] === 3) {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return inCheck(board, white);
}

export function legalMoves(highlights: number[][], board: string[][], x: number, y: number) {
    const white = board[y][x] === board[y][x].toUpperCase();
    let newHighlights = possibleMoves(highlights, board, x, y);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (newHighlights[i][j] === 3) {
                const tempBoard = copyBoard(board);
                tempBoard[i][j] = tempBoard[y][x];
                tempBoard[y][x] = ' ';
                if (inCheck(tempBoard, white)) {newHighlights[i][j] = 0;}
            }
        }
    }
    return newHighlights;
}
export function possibleMoves(highlights: number[][], board: string[][], x: number, y: number) {
    const white = board[y][x] === board[y][x].toUpperCase();
    let newHighlights = copyHighlight(highlights);
    if (board[y][x].toUpperCase() === 'N') {
        checkNightMoves(newHighlights, board, x, y, white);
    } else if (board[y][x].toUpperCase() === 'K') {
        checkKingMoves(newHighlights, board, x, y, white);
    } else if (board[y][x].toUpperCase() === 'R') {
        checkRookMoves(newHighlights, board, x, y, white);
    } else if (board[y][x].toUpperCase() === 'B') {
        checkBishopMoves(newHighlights, board, x, y, white);
    } else if (board[y][x].toUpperCase() === 'Q') {
        checkBishopMoves(newHighlights, board, x, y, white);
        checkRookMoves(newHighlights, board, x, y, white);
    } else if (board[y][x].toUpperCase() === 'P') {
        checkPawnMoves(newHighlights, board, x, y, white);
    }
    return newHighlights
}

function checkNightMoves(highlights: number[][], board: string[][], x: number, y: number, white: boolean) {
    checkSquare(highlights, board, x-2, y-1, white);
    checkSquare(highlights, board, x-2, y+1, white);
    checkSquare(highlights, board, x+2, y-1, white);
    checkSquare(highlights, board, x+2, y+1, white);
    checkSquare(highlights, board, x-1, y-2, white);
    checkSquare(highlights, board, x-1, y+2, white);
    checkSquare(highlights, board, x+1, y-2, white);
    checkSquare(highlights, board, x+1, y+2, white);
}

function checkPawnMoves(highlights: number[][], board: string[][], x: number, y: number, white: boolean) {
    if (white) {
        if (0 <= y -1 && board[y-1][x] == ' ') {
            highlights[y - 1][x] = 3;
        }
        if (y === 6 && board[y - 2][x] == ' ' && board[y-1][x] == ' ') {
            highlights[y - 2][x] = 3;
        }
        if (x - 1 >= 0 && 0 <= y -1 && board[y-1][x-1] !== ' ' && isDifferentColor(board[y-1][x-1], white)) {
            highlights[y - 1][x-1] = 3;
        }
        if (x + 1 < 8 && 0 <= y -1 && board[y-1][x+1] !== ' ' && isDifferentColor(board[y-1][x+1], white)) {
            highlights[y - 1][x + 1] = 3;
        }
    } else {
        if (8 > y + 1 && board[y+1][x] == ' ') {
            highlights[y + 1][x] = 3;
        }
        if (y === 1 && board[3][x] == ' ' && board[y+1][x] == ' ') {
            highlights[3][x] = 3;
        }
        if (x - 1 >= 0 && 8 > y +1 && board[y+1][x-1] !== ' ' && isDifferentColor(board[y+1][x-1], white)) {
            highlights[y + 1][x-1] = 3;
        }
        if (x + 1 < 8 && 8 > y +1 && board[y+1][x+1] !== ' ' && isDifferentColor(board[y+1][x+1], white)) {
            highlights[y + 1][x+1] = 3;
        }
    }
}

function checkRookMoves(highlights: number[][], board: string[][], x: number, y: number, white: boolean) {
    let temp = x - 1;
    while (true) {
        if (!checkSquare(highlights, board, temp, y, white)) {break;}
        temp--;
    }
    temp = x + 1;
    while (true) {
        if (!checkSquare(highlights, board, temp, y, white)) {break;}
        temp++;
    }
    temp = y - 1;
    while (true) {
        if (!checkSquare(highlights, board, x, temp, white)) {break;}
        temp--
    }
    temp = y + 1;
    while (true) {
        if (!checkSquare(highlights, board, x, temp, white)) {break;}
        temp++;
    }
}

function checkBishopMoves(highlights: number[][], board: string[][], x: number, y: number, white: boolean) {
    let tempX = x - 1;
    let tempY = y - 1;
    while (true) {
        if (!checkSquare(highlights, board, tempX, tempY, white)) {break;}
        tempX--;
        tempY--;
    }
    tempX = x - 1;
    tempY = y + 1;
    while (true) {
        if (!checkSquare(highlights, board, tempX, tempY, white)) {break;}
        tempX--;
        tempY++;
    }
    tempX = x + 1;
    tempY = y - 1;
    while (true) {
        if (!checkSquare(highlights, board, tempX, tempY, white)) {break;}
        tempX++;
        tempY--;
    }
    tempX = x + 1;
    tempY = y + 1;
    while (true) {
        if (!checkSquare(highlights, board, tempX, tempY, white)) {break;}
        tempX++;
        tempY++;
    }
}

function checkKingMoves(highlights: number[][], board: string[][], x: number, y: number, white: boolean) {
    checkSquare(highlights, board, x-1, y-1, white);
    checkSquare(highlights, board, x-1, y, white);
    checkSquare(highlights, board, x-1, y+1, white);
    checkSquare(highlights, board, x, y+1, white);
    checkSquare(highlights, board, x, y-1, white);
    checkSquare(highlights, board, x+1, y+1, white);
    checkSquare(highlights, board, x+1, y, white);
    checkSquare(highlights, board, x+1, y-1, white);
    if (white && x === 4 && y === 7) {
        if (board[7][5] === ' ' && board[7][6] === ' ' && board[7][7] === 'R') {
            highlights[7][6] = 3;
        }
        if (board[7][3] === ' ' && board[7][2] === ' ' && board[7][1] === ' ' && board[7][0] === 'R') {
            highlights[7][2] = 3;
        }
    } else if (x === 4 && y === 0) {
        if (board[0][5] === ' ' && board[0][6] === ' ' && board[0][7] === 'r') {
            highlights[0][6] = 3;
        }
        if (board[0][3] === ' ' && board[0][2] === ' ' && board[0][1] === ' ' && board[0][0] === 'r') {
            highlights[0][2] = 3;
        }
    }
}

function checkSquare(highlights: number[][],board: string[][], x: number, y: number, white: boolean) {
    if (0 <= x && x < 8 && 0 <= y && y < 8 && (board[y][x] == ' ' || isDifferentColor(board[y][x], white))) {
        highlights[y][x] = 3;
        if (board[y][x] == ' ') {return true}
    }
    return false;
}
function isDifferentColor(x: string, white: boolean) {
    return (x === x.toUpperCase()) !== white;
}
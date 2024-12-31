export function emptyBoard() {
    return[
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','','']
    ]
}

export function emptyHighlight() {
    return[
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ]
}

export function copyHighlight(highlights: number[][]) {
    let temp = emptyHighlight();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            temp[i][j] = highlights[i][j];
        }
    }
    return temp;
}

export function copyBoard(board: string[][]) {
    let temp = emptyBoard();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            temp[i][j] = board[i][j];
        }
    }
    return temp;
}
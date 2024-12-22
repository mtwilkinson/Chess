enum pieces {
    pawnBlack = '/pieces/Chess_pdt60.png',
    pawnWhite = '/pieces/Chess_plt60.png',
    knightBlack = '/pieces/Chess_ndt60.png',
    knightWhite = '/pieces/Chess_nlt60.png',
    bishopBlack = '/pieces/Chess_bdt60.png',
    bishopWhite = '/pieces/Chess_blt60.png',
    rookBlack = '/pieces/Chess_rdt60.png',
    rookWhite = '/pieces/Chess_rlt60.png',
    queenBlack = '/pieces/Chess_qdt60.png',
    queenWhite = '/pieces/Chess_qlt60.png',
    kingBlack = '/pieces/Chess_kdt60.png',
    kingWhite = '/pieces/Chess_klt60.png',
}

export const pieceMap: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();
const bp = new Image();
bp.src = pieces.pawnBlack;
pieceMap.set('p', bp);
const wp = new Image();
wp.src = pieces.pawnWhite;
pieceMap.set('P', wp);
const bn = new Image();
bn.src = pieces.knightBlack;
pieceMap.set('n', bn);
const wn = new Image();
wn.src = pieces.knightWhite;
pieceMap.set('N', wn);
const bb = new Image();
bb.src = pieces.bishopBlack;
pieceMap.set('b', bb);
const wb = new Image();
wb.src = pieces.bishopWhite;
pieceMap.set('B', wb);
const br = new Image();
br.src = pieces.rookBlack;
pieceMap.set('r', br);
const wr = new Image();
wr.src = pieces.rookWhite;
pieceMap.set('R', wr);
const bq = new Image();
bq.src = pieces.queenBlack;
pieceMap.set('q', bq);
const wq = new Image();
wq.src = pieces.queenWhite;
pieceMap.set('Q', wq);
const bk = new Image();
bk.src = pieces.kingBlack;
pieceMap.set('k', bk);
const wk = new Image();
wk.src = pieces.kingWhite;
pieceMap.set('K', wk);

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
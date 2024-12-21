import React, {MutableRefObject, useLayoutEffect, useRef} from 'react';

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

const pieceMap: Map<string, string> = new Map<string, string>();
pieceMap.set('p', pieces.pawnBlack);
pieceMap.set('P', pieces.pawnWhite);
pieceMap.set('n', pieces.knightBlack);
pieceMap.set('N', pieces.knightWhite);
pieceMap.set('b', pieces.bishopBlack);
pieceMap.set('B', pieces.bishopWhite);
pieceMap.set('r', pieces.rookBlack);
pieceMap.set('R', pieces.rookWhite);
pieceMap.set('q', pieces.queenBlack);
pieceMap.set('Q', pieces.queenWhite);
pieceMap.set('k', pieces.kingBlack);
pieceMap.set('K', pieces.kingWhite);

type Props = {
    board: string[][];
    highlights: number[][];
}
function Chessboard(props: Props) {
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#f0d9b5";
        ctx.fillRect(0, 0, 800, 800)

        ctx.fillStyle = "#b58863";
        for (let i = 0; i < 4; i++ ) {
            for (let j = 0; j < 4; j++) {
                ctx.fillRect(100 + 200 * j, 200 * i, 100, 100)
                ctx.fillRect(200 * j, 200 * i + 100, 100, 100)
            }
        }
        const img = new Image();

        // Image URL should be a path to your PNG file
        img.src = pieces.bishopBlack;
        for (let i = 0; i < 8; i++ ) {
            for (let j = 0; j < 8; j++) {
                if (props.board[i][j] !== '') {
                    const img = new Image();
                    img.src = pieceMap.get(props.board[i][j]);
                    img.onload = function() {
                        // Draw the image on the canvas once it's loaded
                        ctx.drawImage(img, 100*j, 100*i, 100, 100);
                    };

                }
            }
        }


    }, []); // Empty dependency array means this effect runs once on mount

    return <canvas className={'h-5/6 aspect-square border-2 border-blue-950'} ref={canvasRef} width={800} height={800} />;
}

export default Chessboard;
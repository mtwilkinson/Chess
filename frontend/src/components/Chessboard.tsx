import React, {
    CSSProperties,
    MouseEventHandler,
    MutableRefObject,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react';
import {copyBoard, copyHighlight, emptyHighlight} from "../algorithms/pieces.ts";
import {pieceMap} from "./images.ts";
import {legalMoves} from "../algorithms/chess.ts";
import Popup from "./PickPiece.tsx";




type Props = {
    board: string[][];
    highlights: number[][];
    setBoard: (board: string[][]) => void;
    setHighlight: (board: number[][]) => void;
    moveNumber: number;
    setMoveNumber: (move: number) => void;
}
function Chessboard(props: Props) {
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
    const [xOffset, setXOffset] = useState(0);
    const [yOffset, setYOffset] = useState(0);
    const [canvasX, setCanvasX] = useState(0);
    const [canvasY, setCanvasY] = useState(0);
    const [startCoordinates, setStartCoordinates] = useState<number[]>([-1, -1]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        setXOffset(canvas ? canvas.getBoundingClientRect().x : 0);
        setYOffset(canvas ? canvas.getBoundingClientRect().y : 0);
        setCanvasX(canvas ? canvas.getBoundingClientRect().width : 0);
        setCanvasY(canvas ? canvas.getBoundingClientRect().height : 0);
    }, []);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // fill squares
        for (let i = 0; i < 8; i++ ) {
            ctx.fillStyle = ctx.fillStyle === "#b58863" ? "#f0d9b5" : "#b58863";
            for (let j = 0; j < 8; j++) {
                if (props.highlights[i][j] === 1) {
                    const temp = ctx.fillStyle;
                    ctx.fillStyle = '#9f9f9f';
                    ctx.fillRect(100 * j, 100 * i, 100, 100);
                    ctx.fillStyle = temp === "#b58863" ? "#f0d9b5" : "#b58863";
                } else if (props.highlights[i][j] === 2) {
                    const temp = ctx.fillStyle;
                    ctx.fillStyle = '#b02929';
                    ctx.fillRect(100 * j, 100 * i, 100, 100);
                    ctx.fillStyle = temp === "#b58863" ? "#f0d9b5" : "#b58863";
                } else if (props.highlights[i][j] === 3) {
                    const temp = ctx.fillStyle;
                    ctx.fillStyle = '#36b247';
                    ctx.fillRect(100 * j, 100 * i, 100, 100);
                    ctx.fillStyle = temp === "#b58863" ? "#f0d9b5" : "#b58863";
                } else {
                    ctx.fillStyle = ctx.fillStyle === "#b58863" ? "#f0d9b5" : "#b58863";
                    ctx.fillRect(100 * j, 100 * i, 100, 100);
                }
            }
        }

        // load pieces
        for (let i = 0; i < 8; i++ ) {
            for (let j = 0; j < 8; j++) {
                if (props.board[i][j] !== ' ') {
                    ctx.drawImage(pieceMap.get(props.board[i][j]), 100*j, 100*i, 100, 100);
                }
            }
        }
    }, [props.highlights, props.board]); // Empty dependency array means this effect runs once on mount

    const handleMouseClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
        const {clientX, clientY} = event;
        const x = Math.floor((clientX - xOffset) * 8/canvasX);
        const y = Math.floor((clientY - yOffset) * 8/canvasY);
        if (startCoordinates[0] !== -1) {
            if (props.highlights[y][x] === 3) {
                const tempBoard = copyBoard(props.board);
                const tempPiece = tempBoard[startCoordinates[0]][startCoordinates[1]];

                // Handle castling
                if (startCoordinates[1] === 4 && startCoordinates[0] === 7 &&
                    tempBoard[startCoordinates[0]][startCoordinates[1]] === 'K') {
                    if (x === 6 && y === 7) {
                        tempBoard[7][5] = 'R';
                        tempBoard[7][7] = ' ';
                    } else if (x === 2 && y === 7) {
                        tempBoard[7][3] = 'R';
                        tempBoard[7][0] = ' ';
                    }
                } else if (startCoordinates[1] === 4 && startCoordinates[0] === 0 &&
                    tempBoard[startCoordinates[0]][startCoordinates[1]] === 'k') {
                    if (x === 6 && y === 0) {
                        tempBoard[0][5] = 'r';
                        tempBoard[0][7] = ' ';
                    } else if (x === 2 && y === 0) {
                        tempBoard[0][3] = 'r';
                        tempBoard[0][0] = ' ';
                    }
                }

                // Promote Pawn
                if (tempBoard[startCoordinates[0]][startCoordinates[1]].toUpperCase() === 'P' && (y === 0 || y === 7)) {
                    setIsPopupOpen(true);
                } else {
                    props.setMoveNumber(props.moveNumber + 1);
                }

                tempBoard[startCoordinates[0]][startCoordinates[1]] = ' ';
                tempBoard[y][x] = tempPiece;

                props.setBoard(tempBoard)
                setStartCoordinates([-1, -1]);

            } else {
                setStartCoordinates([-1, -1]);
            }
            props.setHighlight(emptyHighlight());
        } else if (props.board[y][x] !== ' ') {
            if ((props.board[y][x] === props.board[y][x].toUpperCase()) === (props.moveNumber % 2 === 0)) {
                let temp: number[][] = emptyHighlight();
                temp[y][x] = 2;
                setStartCoordinates([y, x])
                temp = legalMoves(temp, props.board, x, y);
                props.setHighlight(temp);
            }
        }
    }

    const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (event) => {
        const {clientX, clientY} = event;
        const x = (clientX - xOffset) * 800/canvasX;
        const y = (clientY - yOffset) * 800/canvasY;
        let temp: number[][] = copyHighlight(props.highlights);
        for (let i = 0; i < 8; i++ ) {
            for (let j = 0; j < 8; j++) {
                if (i === Math.floor(y/100) && j === Math.floor(x/100) && temp[i][j] < 2) {
                    temp[i][j] = 1;
                } else if (temp[i][j] === 1) {
                    temp[i][j] = 0;
                }
            }
        }
        props.setHighlight(temp);
    }

    const handleMouseLeave: MouseEventHandler<HTMLCanvasElement> = (event) => {
        props.setHighlight(emptyHighlight());
        setStartCoordinates([-1, -1])
    }

    function promote_pawn(piece: String) {
        setIsPopupOpen(false);
        const tempBoard = copyBoard(props.board);
        for(let i = 0; i < 8; i++) {
            if (tempBoard[0][i].toUpperCase() === 'P') {
                tempBoard[0][i] = piece;
            }
            if (tempBoard[7][i].toUpperCase() === 'P') {
                tempBoard[7][i] = piece;
            }
        }
        props.setMoveNumber(props.moveNumber + 1);
        props.setBoard(tempBoard);
    }

    return (
        <div className={'h-5/6 aspect-square border-2 border-blue-950'}>
            <canvas className={'h-full border-2 border-blue-950'} onClick={handleMouseClick}
                    ref={canvasRef}
                    onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} width={800} height={800}/>
            <Popup isOpen={isPopupOpen} white={props.moveNumber%2 === 1} onClose={promote_pawn}>
                <h2>Welcome to the Popup!</h2>
                <p>This is a simple modal popup in React.</p>
            </Popup>
        </div>
    );
}

export default Chessboard;
import Chessboard from "../components/Chessboard.tsx";
import {useState} from "react";
import { Game, Move } from "database/src/types.ts";

const startingBoard: string[][] = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

const startingHighlight: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const testGame: Game = {
    blackName: "him",
    blackRating: 1000,
    game: 1,
    tournament: 0,
    whiteName: "me",
    whiteRating: 1000};

function Chess() {
    const [game, setGame] = useState<Game>(testGame);
    const [moves, setMoves] = useState<Move[]>([])
    const [board, setBoard] = useState<string[][]>(startingBoard);
    const [highlight, setHighlight] = useState<number[][]>(startingHighlight);
    const [moveNumber, setMoveNumber] = useState<number>(0);

    async function handleNext() {
        console.log("next");
    }

    async function handlePrev() {
        console.log("prev");
    }

    return (
        <div className={"flex flex-col overflow-clip align-middle justify-center items-center"}>
            <Chessboard board={board} highlights={highlight} setBoard={setBoard} setHighlight={setHighlight}
                        moveNumber={moveNumber} setMoveNumber={setMoveNumber}/>
                <div className={"flex flex-row overflow-clip align-middle justify-center items-center"}>
                <button className={"m-4 w-32 h-8 bg-red-800 rounded-2xl text-white hover:bg-red-200 hover:text-black"}
                        onClick={handlePrev}>Prev
                </button>
                <button className={"m-4 w-32 h-8 bg-red-800 rounded-2xl text-white hover:bg-red-200 hover:text-black"}
                        onClick={handleNext}>Next
                </button>
            </div>
        </div>
    );
}

export default Chess;

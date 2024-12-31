import { it, describe, assert } from "vitest";
import {inCheck, inCheckMate} from "../src/algorithms/chess.ts";

describe("Standard vitest test. All tests should pass", () => {
    it("Standard test", async () => {
        assert(2 == 2);
    });
});

describe("In check tests", () => {
    it("Knight check", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', 'N', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', '', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        assert(inCheck(board, false));
    });
    it("Bishop check", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', '', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', 'b'],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', '', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        assert(inCheck(board, true));
    });
    it("Rook check", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'r', 'b', 'n', ''],
            ['p', 'p', 'p', 'p', '', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', 'k'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', '', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        assert(inCheck(board, true));
    });
    it("Queen check", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', '', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['Q', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', '', 'K', 'B', 'N', 'R']
        ];
        assert(inCheck(board, false));
    });
    it("Not check 1", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        assert(inCheck(board, true) === false);
    });
    it("Not check 2", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', 'R', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', '']
        ];
        assert(inCheck(board, false) === false);
    });
    it("Not check 3", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', '', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', 'R', '', '', '', '', '', ''],
            ['B', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['', 'N', '', 'Q', 'K', 'B', 'N', 'R']
        ];
        assert(inCheck(board, false) === false);
    });
    it("Not check 4", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', '', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['Q', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', '', 'K', 'B', 'N', 'R']
        ];
        assert(inCheck(board, true) === false);
    });
});

describe("Checkmate tests", () => {
    it("Back rank checkmate", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', '', '', 'R'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', 'N', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', '', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        assert(inCheckMate(board, false));
    });
    it("smothered checkmate", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', '', '', 'R'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', 'N', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'n', 'P', 'P', 'P', 'P', 'P'],
            ['K', 'R', 'B', '', 'K', 'B', 'N', 'R']
        ];
        assert(inCheckMate(board, true));
    });
    it("Ladder checkmate", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', '', '', 'R'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', 'N', '', ''],
            ['r', '', '', '', '', '', '', ''],
            ['r', '', '', 'K', '', '', '', ''],
            ['r', '', '', '', '', '', '', ''],
            ['P', 'P', 'n', 'P', 'P', 'P', 'P', 'P'],
            ['K', 'R', 'B', '', '', 'B', 'N', 'R']
        ];
        assert(inCheckMate(board, true));
    });
    it("can move out of checkmate", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', '', '', ''],
            ['p', 'p', 'p', 'p', 'p', 'p', 'N', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'n', 'P', 'P', 'P', 'P', 'P'],
            ['', 'R', 'B', 'K', '', 'B', 'N', 'R']
        ];
        assert(inCheckMate(board, false) === false);
    });
    it("can capture out of checkmate", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', 'r', '', ''],
            ['p', 'p', 'p', 'p', 'p', 'p', '', 'p'],
            ['', '', '', '', '', 'N', '', ''],
            ['r', '', '', '', '', '', '', ''],
            ['r', '', '', 'K', '', '', '', ''],
            ['r', '', '', '', '', '', '', ''],
            ['P', 'P', 'n', 'P', 'P', 'P', 'P', 'P'],
            ['', 'R', 'B', '', '', 'B', 'N', 'R']
        ];
        assert(inCheckMate(board, false) === false);
    });
    it("can block checkmate", async () => {
        const board: string[][] = [
            ['r', 'n', 'b', 'q', 'k', 'r', '', ''],
            ['p', 'p', 'p', 'p', 'p', 'p', '', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['r', '', '', '', '', '', '', ''],
            ['r', '', '', '', '', '', '', ''],
            ['r', '', '', '', '', '', '', ''],
            ['P', 'R', '', 'P', 'P', 'P', 'P', 'P'],
            ['K', '', '', 'r', '', 'B', 'N', 'R']
        ];
        assert(inCheckMate(board, true) === false);
    });
    it("Stalemate", async () => {
        const board: string[][] = [
            ['k', '', '', '', '', '', '', ''],
            ['', '', '', '', 'R', '', '', ''],
            ['', '', '', '', '', '', 'p', ''],
            ['', '', '', '', '', '', 'P', ''],
            ['', 'R', '', '', 'K', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '']
        ];
        assert(inCheckMate(board, false) === false);
    });
});


export type Game = {
    tournament:  number;
    game:        number;
    whiteName:   string;
    whiteRating: number;
    blackName:   string;
    blackRating: number;
}

export type Move = {
    moveNumber: number;
    boardState: string
    move:       string
}

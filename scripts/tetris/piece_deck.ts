import { PieceTypes, Piece, type PieceType } from "./piece.js";

export class PieceDek
{
    private deck:PieceType[] = [];

    constructor(private runtime:IRuntime)
    {
        this.runtime = runtime;
        this.fillDeck();
    }

    private fillDeck()
    {
        PieceTypes.forEach(type => {
            this.deck.push(type);
        });
    }

    public nextType():PieceType
    {
        if(this.deck.length == 0)
        {
            this.fillDeck();
        }
        const index = Math.floor(Math.random() * this.deck.length);
        return this.deck.splice(index, 1)[0];
    }
}
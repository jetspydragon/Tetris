import { Piece } from "../tetris/piece.js";
import { PieceDek } from "../tetris/piece_deck.js";
import { KeyboardManager } from "./keyboard_manager.js";

export class GameManager
{
    private timeToFall:number = 0.5;
    private timePassed:number = 0;
    private kb:KeyboardManager;
    private piece?:Piece;
    private deck?:PieceDek;
    
    private xBoardOrigin:number = 0;
    private yBoardOrigin:number = 0;
    private wBoardCell:number = 0;
    private hBoardCell:number = 0;

    private xStartPos:number = 0;
    private yStartPos:number = 0;

    constructor(private runtime:IRuntime)
    {
        this.kb = new KeyboardManager(runtime);
        this.kb.onDAS.subscribe((data) => {
            console.log(`Ocurrió DAS: ${data}`);
        });
    }

    public async OnBeforeProjectStart()
    {
        console.log("OnBeforeProjectStart");
        // Code to run just before 'On start of layout' on
        // the first layout. Loading has finished and initial
        // instances are created and available to use here.
        this.runtime.addEventListener("tick", () => this.Tick());

        this.runtime.objects.Cell.getAllInstances().forEach(cell => {
            if (cell.instVars.origin)
            {
                this.xBoardOrigin = cell.x;
                this.yBoardOrigin = cell.y;
                this.wBoardCell = cell.width;
                this.hBoardCell = cell.height;
            }
        });
        this.xStartPos = this.xBoardOrigin + this.wBoardCell * 3;
        this.yStartPos = this.yBoardOrigin;
        
        this.deck = new PieceDek(this.runtime);
        this.piece = new Piece(this.runtime, this.deck.nextType(), this.xStartPos, this.yStartPos);
    }

    public Tick()
    {
        // Code to run every tick
        const dt = this.runtime.dt;

        this.timePassed += dt;
        if (this.timePassed >= this.timeToFall && this.piece)
        {
            this.timePassed -= this.timeToFall;
            this.piece.moveDown();
        }

        if (this.piece)
        {
            if (this.kb.isKeyPressed("ArrowLeft"))
            {
                this.piece.moveLeft();
            }
            else if (this.kb.isKeyPressed("ArrowRight"))
            {
                this.piece.moveRight();
            }

            if (this.kb.isKeyPressed("ArrowUp"))
            {
                this.piece.rotate();
            }
            
            if (this.kb.isKeyPressed("KeyC"))
            {
                this.piece.destroy();
                if (this.deck)
                {
                    this.piece = new Piece(this.runtime, this.deck.nextType(), this.xStartPos, this.yStartPos);
                }
            }
        }
    }
}

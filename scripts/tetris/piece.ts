type Cell = readonly [number, number];
type Rotation = readonly Cell[];
type PieceDefinition = {
    frame: number;
    position: readonly Rotation[];
};
type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

const PieceData: Record<PieceType, PieceDefinition> = {
    I: { 
        frame: 1,
        position: [
            [[0,1],[1,1],[2,1],[3,1]],
            [[2,0],[2,1],[2,2],[2,3]],
            [[0,2],[1,2],[2,2],[3,2]],
            [[1,0],[1,1],[1,2],[1,3]],
        ]
    },
    O: { 
        frame: 2,
        position: [
            [[1,0],[2,0],[1,1],[2,1]],
            [[1,0],[2,0],[1,1],[2,1]],
            [[1,0],[2,0],[1,1],[2,1]],
            [[1,0],[2,0],[1,1],[2,1]],
        ]
    },
    T: { 
        frame: 3,
        position: [
            [[0,1],[1,1],[2,1],[3,1]],
            [[2,0],[2,1],[2,2],[2,3]],
            [[0,2],[1,2],[2,2],[3,2]],
            [[1,0],[1,1],[1,2],[1,3]],
        ]
    },
    S: { 
        frame: 4,
        position: [
            [[0,1],[1,1],[2,1],[3,1]],
            [[2,0],[2,1],[2,2],[2,3]],
            [[0,2],[1,2],[2,2],[3,2]],
            [[1,0],[1,1],[1,2],[1,3]],
        ]
    },
    Z: { 
        frame: 5,
        position: [
            [[0,1],[1,1],[2,1],[3,1]],
            [[2,0],[2,1],[2,2],[2,3]],
            [[0,2],[1,2],[2,2],[3,2]],
            [[1,0],[1,1],[1,2],[1,3]],
        ]
    },
    J: { 
        frame: 6,
        position: [
            [[0,1],[1,1],[2,1],[3,1]],
            [[2,0],[2,1],[2,2],[2,3]],
            [[0,2],[1,2],[2,2],[3,2]],
            [[1,0],[1,1],[1,2],[1,3]],
        ]
    },
    L: { 
        frame: 7,
        position: [
            [[0,1],[1,1],[2,1],[3,1]],
            [[2,0],[2,1],[2,2],[2,3]],
            [[0,2],[1,2],[2,2],[3,2]],
            [[1,0],[1,1],[1,2],[1,3]],
        ]
    },
};

export class Piece
{
    private runtime:IRuntime;
    private type:PieceType;
    private blocks:ISpriteInstance[] = [];

    constructor(runtime:IRuntime, type:PieceType, x:number, y:number)
    {
        this.runtime = runtime;
        this.type = type;
        const pieceData = PieceData[this.type];
        const position = pieceData.position[0];
        for (let i = 0; i < 4; i++) {
            this.blocks[i] = runtime.objects.Piece.createInstance(0, 0, 0);
            const w = this.blocks[i].width;
            const h = this.blocks[i].height;
            this.blocks[i].animationFrame = pieceData.frame;
            this.blocks[i].setPosition(x + position[i][0] * w, y + position[i][1] * h);
        }
    }

    public moveDown()
    {
        this.blocks.forEach((value, key) => {
            value.y += value.height;
        });
    }

    public moveLeft()
    {
        this.blocks.forEach((value, key) => {
            value.x -= value.width;
        });
    }

    public moveRight()
    {
        this.blocks.forEach((value, key) => {
            value.x += value.width;
        });
    }
}

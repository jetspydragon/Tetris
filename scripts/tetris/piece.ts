type Cell = readonly [number, number];
type Rotation = readonly Cell[];
type PieceDefinition = {
    frame: number;
    position: readonly Rotation[];
};
export const PieceTypes = ["I", "O", "T", "S", "Z", "J", "L"] as const;
export type PieceType = typeof PieceTypes[number];

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
        ]
    },
    T: { 
        frame: 3,
        position: [
            [[0,1],[1,1],[2,1],[1,2]],
            [[1,0],[0,1],[1,1],[1,2]],
            [[1,0],[0,1],[1,1],[2,1]],
            [[1,0],[1,1],[2,1],[1,2]],
        ]
    },
    S: { 
        frame: 4,
        position: [
            [[1,0],[2,0],[0,1],[1,1]],
            [[1,0],[1,1],[2,1],[2,2]],
            [[1,1],[2,1],[0,2],[1,2]],
            [[0,0],[0,1],[1,1],[1,2]],
        ]
    },
    Z: { 
        frame: 5,
        position: [
            [[0,0],[1,0],[1,1],[2,1]],
            [[2,0],[1,1],[2,1],[1,2]],
            [[0,1],[1,1],[1,2],[2,2]],
            [[1,0],[0,1],[1,1],[0,2]],
        ]
    },
    J: { 
        frame: 6,
        position: [
            [[0,1],[1,1],[2,1],[2,2]],
            [[1,0],[1,1],[0,2],[1,2]],
            [[0,0],[0,1],[1,1],[2,1]],
            [[1,0],[2,0],[1,1],[1,2]],
        ]
    },
    L: { 
        frame: 7,
        position: [
            [[2,0],[0,1],[1,1],[2,1]],
            [[1,0],[1,1],[1,2],[2,2]],
            [[0,1],[1,1],[2,1],[0,2]],
            [[0,0],[1,0],[1,1],[1,2]],
        ]
    },
};

export class Piece
{
    private blocks:ISpriteInstance[] = [];
    private rotationId:number = 0;
    private w:number = 0;
    private h:number = 0;

    constructor(
        private runtime:IRuntime, private type:PieceType, 
        private x:number, private y:number
    )
    {
        for (let i = 0; i < 4; i++) {
            this.blocks[i] = runtime.objects.Piece.createInstance(0, 0, 0);
        }
        this.h = this.blocks[0].height;
        this.w = this.blocks[0].width;
        this.updateBlocksPositions();
    }

    public moveDown()
    {
        this.y += this.h;
        this.updateBlocksPositions();
    }

    public moveLeft()
    {
        this.x -= this.w;
        this.updateBlocksPositions()
    }

    public moveRight()
    {
        this.x += this.w;
        this.updateBlocksPositions();
    }

    public rotate(clockwise:boolean = true)
    {
        const maxRotationId = PieceData[this.type].position.length - 1;
        if (clockwise)
        {
            this.rotationId++;
            if (this.rotationId > maxRotationId)
            {
                this.rotationId = 0;
            }
        }
        else
        {
            this.rotationId--;
            if (this.rotationId < 0)
            {
                this.rotationId = maxRotationId;
            }
        }
        this.updateBlocksPositions();
    }

    public destroy()
    {
        this.blocks.forEach(block => {
            block.destroy();
        });
    }

    private updateBlocksPositions()
    {
        const pieceData = PieceData[this.type];
        const position = pieceData.position[this.rotationId];
        for (let i = 0; i < 4; i++) {
            const w = this.blocks[i].width;
            const h = this.blocks[i].height;
            this.blocks[i].animationFrame = pieceData.frame;
            this.blocks[i].setPosition(this.x + position[i][0] * w, this.y + position[i][1] * h);
        }
    }
}

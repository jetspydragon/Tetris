// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
import { KeyboardManager } from "./managers/keyboard_manager.js";
import { Piece, PieceTypes } from "./tetris/piece.js";
import { PieceDek } from "./tetris/piece_deck.js";

const timeToFall:number = 0.5;

let timePassed:number = 0;
let kb:KeyboardManager;
let piece:Piece;
let deck:PieceDek;

let xStartPos:number = 100;
let yStartPos:number = 100;

runOnStartup(async runtime =>
{
	console.log("runOnStartup");
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	kb = new KeyboardManager(runtime);
	kb.onDAS.subscribe((data) => {
		console.log(`Ocurrió DAS: ${data}`);
	});
});

async function OnBeforeProjectStart(runtime : IRuntime)
{
	console.log("OnBeforeProjectStart");
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.

	runtime.addEventListener("tick", () => Tick(runtime));
	
	const width = runtime.layout.width;
	deck = new PieceDek(runtime);
	piece = new Piece(runtime, deck.nextType(), xStartPos, yStartPos);
}

function Tick(runtime : IRuntime)
{
	// Code to run every tick
	const dt = runtime.dt;

	timePassed += dt;
	if (timePassed >= timeToFall && piece)
	{
		timePassed = 0;
		piece.moveDown();
	}

	if (piece)
	{
		if (kb.isKeyPressed("ArrowLeft"))
		{
			piece.moveLeft();
		}
		else if (kb.isKeyPressed("ArrowRight"))
		{
			piece.moveRight();
		}
		else if (kb.isKeyPressed("ArrowUp"))
		{
			piece.rotate();
		}
		else if (kb.isKeyPressed("KeyC"))
		{
			piece.destroy();
			piece = new Piece(runtime, deck.nextType(), xStartPos, yStartPos);
		}
	}
}


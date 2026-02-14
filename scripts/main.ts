// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
import { KeyboardManager } from "./managers/keyboard_manager.js";
import { Piece } from "./tetris/piece.js";

const timeToFall:number = 1.0;

let timePassed:number = 0;
let kb:KeyboardManager;
let piece:Piece;

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
	
	piece = new Piece(runtime, "I", 100, 100);
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
	}
}


// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
import { KeyboardManager } from "./managers/keyboardManager.js";

const timeToFall:number = 1.0;

let timePassed:number = 0;
let kb:KeyboardManager;

runOnStartup(async runtime =>
{
	console.log("runOnStartup");
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	kb = new KeyboardManager(runtime);
});

async function OnBeforeProjectStart(runtime : IRuntime)
{
	console.log("OnBeforeProjectStart");
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.

	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime : IRuntime)
{
	// Code to run every tick
	const dt = runtime.dt;
	const piece = runtime.objects.Piece.getFirstInstance();

	timePassed += dt;
	if (timePassed >= timeToFall && piece)
	{
		timePassed = 0;
		piece.y += piece.height;
	}

	if (piece)
	{
		if (kb.isKeyPressed("ArrowLeft"))
		{
			piece.x -= piece.width
		}
		else if (kb.isKeyPressed("ArrowRight"))
		{
			piece.x += piece.width
		}
	}
}

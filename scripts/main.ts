/**
 * Tetris Guidelines: https://tetris.wiki/Tetris_Guideline
 * 
 * 
 * 
 * 
 */
// Import any other script files here, e.g.:

import { GameManager } from "./managers/game_manager.js";

// import * as myModule from "./mymodule.js";
runOnStartup(async runtime =>
{
	console.log("runOnStartup");
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	const game = new GameManager(runtime);
	runtime.addEventListener("beforeprojectstart", () => game.OnBeforeProjectStart());
});

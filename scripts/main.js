// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
const timeToFall = 1.0;
let timePassed = 0;
runOnStartup(async (runtime) => {
    console.log("runOnStartup");
    // Code to run on the loading screen.
    // Note layouts, objects etc. are not yet available.
    runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});
async function OnBeforeProjectStart(runtime) {
    console.log("OnBeforeProjectStart");
    // Code to run just before 'On start of layout' on
    // the first layout. Loading has finished and initial
    // instances are created and available to use here.
    runtime.addEventListener("tick", () => Tick(runtime));
}
function Tick(runtime) {
    // Code to run every tick
    const dt = runtime.dt;
    const piece = runtime.objects.Piece.getFirstInstance();
    const keyboard = runtime.keyboard;
    timePassed += dt;
    if (timePassed >= timeToFall && piece) {
        timePassed = 0;
        piece.y += piece.height;
    }
    if (keyboard) {
        if (keyboard.isKeyDown("ArrowLeft")) {
            console.log("flechita izquierda!!!!");
        }
        else if (keyboard.isKeyDown("ArrowRight")) {
            console.log("flechita derecha!!!!!");
        }
    }
}
export {};

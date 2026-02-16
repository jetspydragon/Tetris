import { Event } from "./event.js";

type Keycode = "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown" | "KeyC";

export class KeyboardManager
{
    public onDAS = new Event<number>();

    private keysNow:Map<string,boolean> = new Map<string,boolean>();
    private keysBefore:Map<string,boolean> = new Map<string,boolean>();
    private keyPressed:Map<string, number> = new Map<string, number>();

    private das:number = 1;

    constructor(private runtime:IRuntime)
    {
        this.runtime.addEventListener("tick2", () => this.postTick(this.runtime));
        this.runtime.addEventListener("keydown", (e) => this.onKeyDown(e));
        this.runtime.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    private postTick(runtime:IRuntime)
    {
        this.keysNow.forEach((value,key) => {
            this.keysBefore.set(key, value);
        });
        this.keyPressed.forEach((value, key) => {
            const currentTime = value + runtime.dt;
            this.keyPressed.set(key, currentTime);
            if (currentTime > this.das)
            {
                this.onDAS.emit(8);
            }
        });
    }

    private onKeyDown(e:KeyboardEvent)
    {
        this.keysNow.set(e.code, true);
        this.keyPressed.set(e.code, 0);        
    }

    private onKeyUp(e:KeyboardEvent)
    {
        this.keysNow.set(e.code, false);
        this.keyPressed.delete(e.code);
    }

    public isKeyPressed(key: Keycode):boolean
    {
        return (this.keysNow.get(key) ?? false) && !(this.keysBefore.get(key) ?? false);
    }
}

import { Event } from "./event.js";

type Keycode = "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown";

export class KeyboardManager
{
    public onDAS = new Event<number>();

    private runtime:IRuntime;
    private keysNow:Map<string,boolean> = new Map<string,boolean>();
    private keysBefore:Map<string,boolean> = new Map<string,boolean>();
    private keyPressed:Map<string, number> = new Map<string, number>();

    private das:number = 1;

    constructor(runtime:IRuntime)
    {
        this.runtime = runtime;
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
        this.keysNow.set(e.key, true);
        this.keyPressed.set(e.key, 0);        
    }

    private onKeyUp(e:KeyboardEvent)
    {
        this.keysNow.set(e.key, false);
        
        this.keyPressed.forEach((value, key) => {
            console.log(`${key} presionada durante ${value} segundos.`);
        });
        this.keyPressed.delete(e.key);
    }

    public isKeyPressed(key: Keycode):boolean
    {
        return (this.keysNow.get(key) ?? false) && !(this.keysBefore.get(key) ?? false);
    }
}

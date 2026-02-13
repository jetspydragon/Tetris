type Keycode = "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown";

export class KeyboardManager
{
    private runtime:IRuntime;
    private keysNow:Map<string,boolean> = new Map<string,boolean>();
    private keysBefore:Map<string,boolean> = new Map<string,boolean>();

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
    }

    private onKeyDown(e:KeyboardEvent)
    {
        this.keysNow.set(e.key, true);
    }

    private onKeyUp(e:KeyboardEvent)
    {
        this.keysNow.set(e.key, false);
    }

    public isKeyPressed(key: Keycode):boolean
    {
        return (this.keysNow.get(key) ?? false) && !(this.keysBefore.get(key) ?? false);
    }
}

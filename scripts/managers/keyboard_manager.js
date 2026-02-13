export class KeyboardManager {
    runtime;
    keysNow = new Map();
    keysBefore = new Map();
    constructor(runtime) {
        this.runtime = runtime;
        this.runtime.addEventListener("tick2", () => this.postTick(this.runtime));
        this.runtime.addEventListener("keydown", (e) => this.onKeyDown(e));
        this.runtime.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    postTick(runtime) {
        this.keysNow.forEach((value, key) => {
            this.keysBefore.set(key, value);
        });
    }
    onKeyDown(e) {
        this.keysNow.set(e.key, true);
    }
    onKeyUp(e) {
        this.keysNow.set(e.key, false);
    }
    isKeyPressed(key) {
        return (this.keysNow.get(key) ?? false) && !(this.keysBefore.get(key) ?? false);
    }
}

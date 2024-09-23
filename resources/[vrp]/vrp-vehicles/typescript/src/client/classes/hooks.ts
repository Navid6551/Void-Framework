export class Hooks {
    callback: any;
    delay: number;
    mode: string;
    data: any;
    hooks: Map<string, any[]>;
    active: boolean;
    aborted: boolean;
    threadId: any;
    constructor(callback: any, delay: number, mode = "interval") {
        this.callback = callback;
        this.delay = delay;
        this.mode = mode;
        this.data = {};
        this.hooks = new Map([
            ["active", []],
            ["preStop", []],
            ["preStart", []],
            ["afterStop", []],
            ["afterStart", []],
            ["stopAborted", []],
            ["startAborted", []]
        ]);
        this.active = false;
        this.aborted = false;
        this.threadId = null;
    }

    get isActive() {
        return this.active;
    }

    async start() {
        if (this.active) return;
        this.aborted = false;

        const preStartHooks: any = this.hooks.get("preStart");
        try {
            for (const hook of preStartHooks) {
                if (!this.aborted) await hook.call(this);
            }
        } catch (error: any) {
            this.aborted = true;
            console.log("Error while calling pre-start hook " + error.message);
        }

        if (this.aborted) {
            try {
                const startAbortedHooks: any = this.hooks.get("startAborted");
                for (const hook of startAbortedHooks) {
                    await hook.call(this);
                }
            } catch (error: any) {
                console.log("Error while calling start-aborted hook " + error.message);
            }
            return;
        }

        this.active = true;

        const activeHooks: any = this.hooks.get("active");
        switch (this.mode) {
            case "tick": {
                this.threadId = setTick(async () => {
                    await this.callback.call(this);
                    for (const hook of activeHooks) {
                        await hook.call(this);
                    }
                    if (this.delay > 0) {
                        await new Promise(resolve => setTimeout(resolve, this.delay));
                    }
                });
                break;
            }
            case "interval": {
                this.threadId = setInterval(async () => {
                    await this.callback.call(this);
                    for (const hook of activeHooks) {
                        await hook.call(this);
                    }
                }, this.delay);
                break;
            }
            case "timeout": {
                if (this.active) {
                    this.threadId = setTimeout(async () => {
                        await this.callback.call(this);
                        for (const hook of activeHooks) {
                            await hook.call(this);
                        }
                    }, this.delay);
                }
                break;
            }
        }

        const afterStartHooks: any = this.hooks.get("afterStart");
        try {
            for (const hook of afterStartHooks) {
                await hook.call(this);
            }
        } catch (error: any) {
            console.log("Error while calling after-start hook " + error.message);
        }
    }

    async stop() {
        if (!this.active) return;

        const preStopHooks: any = this.hooks.get("preStop");
        try {
            for (const hook of preStopHooks) {
                if (!this.aborted) await hook.call(this);
            }
        } catch (error: any) {
            this.aborted = true;
            console.log("Error while calling pre-stop hook " + error.message);
        }

        this.active = false;

        switch (this.mode) {
            case "tick": {
                clearTick(this.threadId as any);
                break;
            }
            case "interval": {
                clearInterval(this.threadId);
                break;
            }
            case "timeout": {
                clearTimeout(this.threadId);
                break;
            }
        }

        if (this.aborted) {
            try {
                const stopAbortedHooks: any = this.hooks.get("stopAborted");
                for (const hook of stopAbortedHooks) {
                    await hook.call(this);
                }
            } catch (error: any) {
                console.log("Error while calling stop-aborted hook " + error.message);
            }
        }

        const afterStopHooks: any = this.hooks.get("afterStop");
        try {
            for (const hook of afterStopHooks) {
                await hook.call(this);
            }
        } catch (error: any) {
            console.log("Error while calling after-stop hook " + error.message);
        }
    }

    abort() {
        this.aborted = true;
    }

    addHook(hook: string, data: any): any {
        let hooks: any = this.hooks.get(hook);
        if(hooks !== null) {
            hooks.push(data);
        }
    }
}
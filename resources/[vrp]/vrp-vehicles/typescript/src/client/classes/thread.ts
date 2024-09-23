export class Thread {
    protected callback: (this: Thread) => void;
    protected delay: number;
    protected mode: string;
    public data: any;
    protected hooks: Map<string, Function[]>;
    protected active: boolean;
    protected aborted: boolean;
    protected threadId: number | NodeJS.Timer | NodeJS.Timeout;

    constructor(callback: (this: Thread) => void, delay: number, mode: 'tick' | 'interval' | 'timeout' = 'tick') {
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

    public get isActive(): boolean {
        return this.active;
    }

    public async start(): Promise<void> {
        if (this.active) return;
        this.aborted = false;

        const preStartHooks = this.hooks.get("preStart");

        try {
            for (const hook of preStartHooks) {
                if (!this.aborted) await hook.call(this);
            }
        } catch (error) {
            this.aborted = true;
            console.log(`Error while calling pre-start hook ${error.message}`);
        }

        if (this.aborted) {
            try {
                const startAbortedHooks = this.hooks.get("startAborted");
                for (const hook of startAbortedHooks) {
                    await hook.call(this);
                }
            } catch (error) {
                console.log(`Error while calling start-aborted hook ${error.message}`);
            }
            return;
        }

        this.active = true;

        const activeHooks = this.hooks.get("active");

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

        const afterStartHooks = this.hooks.get("afterStart");

        try {
            for (const hook of afterStartHooks) {
                await hook.call(this);
            }
        } catch (error) {
            console.log(`Error while calling after-start hook ${error.message}`);
        }
    }

    public async stop(): Promise<void> {
        if (!this.active) return;

        const preStopHooks = this.hooks.get("preStop");

        try {
            for (const hook of preStopHooks) {
                if (!this.aborted) await hook.call(this);
            }
        } catch (error) {
            this.aborted = true;
            console.log(`Error while calling pre-stop hook ${error.message}`);
        }

        this.active = false;

        switch (this.mode) {
            case "tick": {
                clearTick(<number>this.threadId);
                break;
            }
            case "interval": {
                clearInterval(<NodeJS.Timer>this.threadId);
                break;
            }
            case "timeout": {
                clearTimeout(<NodeJS.Timeout>this.threadId);
                break;
            }
        }

        if (this.aborted) {
            try {
                const stopAbortedHooks = this.hooks.get("stopAborted");
                for (const hook of stopAbortedHooks) {
                    await hook.call(this);
                }
            } catch (error) {
                console.log(`Error while calling stop-aborted hook ${error.message}`);
            }
        }

        const afterStopHooks = this.hooks.get("afterStop");

        try {
            for (const hook of afterStopHooks) {
                await hook.call(this);
            }
        } catch (error) {
            console.log(`Error while calling after-stop hook ${error.message}`);
        }
    }

    protected abort(): void {
        this.aborted = true;
    }

    public addHook(hook: string, data: Function): void {
        const hooks = this.hooks.get(hook);

        if (hooks !== null) {
            hooks.push(data);
        }
    }
}
class Thread {
    protected callback: (this: Thread) => void;
    protected delay: number;
    protected mode: 'tick' | 'interval' | 'timeout';
    protected data: any;
    protected hooks: Map<string, Function[]>;
    protected active: boolean;
    protected aborted: boolean;
    protected threadId: number | NodeJS.Timer | NodeJS.Timeout;
    protected scheduled: { [tick: number]: number };
    protected tick: number;

    constructor(callback: (this: Thread) => void, delay: number, mode: 'tick' | 'interval' | 'timeout' = 'tick') {
        this.callback = callback;

        this.delay = delay;
        this.mode = mode;

        this.scheduled = {};
        this.tick = 0;
        this.data = {};

        this.hooks = new Map([
            ["active", []],
            ["preStop", []],
            ["preStart", []],
            ["afterStop", []],
            ["afterStart", []],
            ["stopAborted", []],
            ["startAborted", []],
        ]);
    }

    public get isActive(): boolean {
        return this.active;
    }

    public async start(): Promise<void> {
        if (this.active) {
            return;
        }

        this.aborted = false;

        this.scheduled = {};

        const preStartHooks = this.hooks.get("preStart");

        try {
            if (preStartHooks) {
                for (const hook of preStartHooks) {
                    if (!this.aborted) {
                        await hook.call(this);
                    }
                }
            }
        } catch (error) {
            this.aborted = true;
            console.log("Error while calling pre-start hook", error.message);
        }

        if (this.aborted) {
            try {
                const startAbortedHooks = this.hooks.get("startAborted");
                if (startAbortedHooks) {
                    for (const hook of startAbortedHooks) {
                        await hook.call(this);
                    }
                }
            } catch (error) {
                console.log("Error while calling start-aborted hook", error.message);
            }
            return;
        }

        this.active = true;

        const activeHooks = this.hooks.get("active");

        switch (this.mode) {
            case "tick": {
                this.threadId = setTick(async () => {
                    this.tick += 1;
                    try {
                        await this.callback.call(this);
                        if (activeHooks) {
                            for (const hook of activeHooks) {
                                await hook.call(this);
                            }
                        }
                    } catch (error) {
                        console.log("Error while calling active hook", error.message);
                    }
                    if (this.delay > 0) {
                        await new Promise((resolve) => setTimeout(resolve, this.delay));
                    }
                });
                break;
            }
            case "interval": {
                this.threadId = setInterval(async () => {
                    this.tick += 1;
                    try {
                        await this.callback.call(this);
                        if (activeHooks) {
                            for (const hook of activeHooks) {
                                await hook.call(this);
                            }
                        }
                    } catch (error) {
                        console.log("Error while calling active hook", error.message);
                    }
                }, this.delay);
                break;
            }
            case "timeout": {
                const callback = () => {
                    if (this.active) {
                        this.threadId = setTimeout(async () => {
                            this.tick += 1;
                            try {
                                await this.callback.call(this);
                                if (activeHooks) {
                                    for (const _0x408c51 of activeHooks) {
                                        await _0x408c51.call(this);
                                    }
                                }
                            } catch (error) {
                                console.log("Error while calling active hook", error.message);
                            }
                            return callback();
                        }, this.delay);
                    }
                };
                callback();
                break;
            }
        }

        const afterStartHooks = this.hooks.get("afterStart");

        try {
            if (afterStartHooks) {
                for (const hook of afterStartHooks) {
                    await hook.call(this);
                }
            }
        } catch (error) {
            console.log("Error while calling after-start hook", error.message);
        }
    }

    public async stop(): Promise<void> {
        if (!this.active) {
            return;
        }

        const preStoppedHooks = this.hooks.get("preStop");

        try {
            if (preStoppedHooks) {
                for (const hook of preStoppedHooks) {
                    if (!this.aborted) {
                        await hook.call(this);
                    }
                }
            }
        } catch (error) {
            this.aborted = true;
            console.log("Error while calling pre-stop hook", error.message);
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
                if (stopAbortedHooks) {
                    for (const hook of stopAbortedHooks) {
                        await hook.call(this);
                    }
                }
            } catch (error) {
                console.log("Error while calling stop-aborted hook", error.message);
            }
            return;
        }

        const afterStopHooks = this.hooks.get("afterStop");

        try {
            if (afterStopHooks) {
                for (const hook of afterStopHooks) {
                    await hook.call(this);
                }
            }
        } catch (error) {
            console.log("Error while calling after-stop hook", error.message);
        }
    }

    protected abort(): void {
        this.aborted = true;
    }

    public addHook(pHook: string, pCallback: Function): void {
        this?.hooks?.get(pHook)?.push(pCallback);
    }

    protected setNextTick(pKey: string, pValue: number): void {
        this.scheduled[pKey] = this.tick + pValue;
    }

    protected canTick(pKey: string): boolean {
        return this.scheduled[pKey] === undefined || this.tick >= this.scheduled[pKey];
    }
}
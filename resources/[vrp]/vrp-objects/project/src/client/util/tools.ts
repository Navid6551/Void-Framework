
const Throttled = new Set<string>();

export function Throttle(pName: string, pTime: number) {
    if (!Throttled.has(pName)) {
        Throttled.add(pName);
        setTimeout(() => Throttled.delete(pName), pTime);
        return false;
    }

    return true;
}

export function IsThrottled(pName: string) {
    return Throttled.has(pName);
}

export const Delay = (ms: any) => new Promise(res => setTimeout(res, ms));

export function taskBar(pTime: number, pText: string, pRunCheck = false) {
    return new Promise(resolve => {
        if (pText) {
            global.exports["vrp-taskbar"].taskBar(pTime, pText, pRunCheck, true, null, false, resolve);
        } else setTimeout(() => resolve(100), pTime);
    });
}

export function taskBarSkill(pDifficulty: number, pSkillGap: number) {
    return new Promise(resolve => {
        global.exports["vrp-ui"].taskBarSkill(pDifficulty, pSkillGap, resolve);
    });
}

export async function requestAnimDict(pDict: string) {
    if (!HasAnimDictLoaded(pDict)) {
        RequestAnimDict(pDict);
        let pBool = false;
        setTimeout(() => pBool = true, 60000);
        while (!HasAnimDictLoaded(pDict) && !pBool) {
            await Delay(10);
        }
    }
}


export async function playSound(_0xa6c6bd: any, _0x305c3c: any, _0x485783: any, _0x5a7bcd = 1000) {
    const _0x1678c7 = GetSoundId()
    PlaySoundFromEntity(_0x1678c7, _0x305c3c, _0xa6c6bd, _0x485783, true, 0)
    await Delay(_0x5a7bcd)
    StopSound(_0x1678c7)
    ReleaseSoundId(_0x1678c7)
}

export const deleteObject = (entity: any) => {
    DoesEntityExist(Number(entity)) && (DeleteEntity(Number(entity)), DeleteObject(entity))
}



type EventListener = (...args: any[]) => void;

class EventEmitter {
    private _events: { [event: string]: EventListener | EventListener[] } = {};
    private _eventsCount = 0;
    private _maxListeners: number | undefined;

    static defaultMaxListeners = 10;

    constructor() {
        this._events = {};
        this._eventsCount = 0;
    }

    setMaxListeners(n: number): this {
        if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
            throw new RangeError(`The value of "n" is out of range. It must be a non-negative number. Received ${n}.`);
        }
        this._maxListeners = n;
        return this;
    }

    getMaxListeners(): number {
        return this._maxListeners ?? EventEmitter.defaultMaxListeners;
    }

    emit(event: string, ...args: any[]): boolean {
        const listeners = this._events[event];
        if (!listeners) return false;

        if (typeof listeners === 'function') {
            listeners(...args);
        } else {
            for (const listener of listeners) {
                listener(...args);
            }
        }
        return true;
    }

    addListener(event: string, listener: EventListener): this {
        if (typeof listener !== 'function') {
            throw new TypeError('The "listener" argument must be of type Function. Received type undefined');
        }

        if (!this._events[event]) {
            this._events[event] = listener;
            this._eventsCount++;
        } else if (typeof this._events[event] === 'function') {
            this._events[event] = [this._events[event] as EventListener, listener];
        } else {
            (this._events[event] as EventListener[]).push(listener);
        }

        if (this.getMaxListeners() > 0 && (this._events[event] as EventListener[]).length > this.getMaxListeners()) {
            console.warn(`Possible EventEmitter memory leak detected. ${this._events[event] as EventListener[]}.length ${event} listeners added. Use emitter.setMaxListeners() to increase limit`);
        }

        return this;
    }

    once(event: string, listener: EventListener): this {
        const onceListener: EventListener = (...args: any[]) => {
            this.removeListener(event, onceListener);
            listener(...args);
        };
        this.addListener(event, onceListener);
        return this;
    }

    removeListener(event: string, listener: EventListener): this {
        const listeners = this._events[event];
        if (!listeners) return this;

        if (typeof listeners === 'function') {
            if (listeners === listener) {
                delete this._events[event];
                this._eventsCount--;
            }
        } else {
            const index = (listeners as EventListener[]).indexOf(listener);
            if (index >= 0) {
                (listeners as EventListener[]).splice(index, 1);
                if ((listeners as EventListener[]).length === 0) {
                    delete this._events[event];
                    this._eventsCount--;
                }
            }
        }

        return this;
    }

    removeAllListeners(event?: string): this {
        if (event) {
            delete this._events[event];
            this._eventsCount--;
        } else {
            this._events = {};
            this._eventsCount = 0;
        }
        return this;
    }

    listeners(event: string): EventListener[] {
        const listeners = this._events[event];
        return typeof listeners === 'function' ? [listeners] : (listeners || []);
    }

    rawListeners(event: string): EventListener[] {
        return this.listeners(event);
    }

    listenerCount(event: string): number {
        const listeners = this._events[event];
        return typeof listeners === 'function' ? 1 : (listeners ? (listeners as EventListener[]).length : 0);
    }

    eventNames(): string[] {
        return Object.keys(this._events);
    }

    on(event: string, listener: EventListener): this {
        return this.addListener(event, listener);
    }
}



export class TaskQueue extends EventEmitter {
    private queues: Map<number, TaskQueueHandler>;

    constructor() {
        super();
        this.queues = new Map();
    }

    add(queueId: number, task: () => Promise<void>) {
        if (!this.queues.has(queueId)) {
            const queueHandler: any = new TaskQueueHandler();
            this.queues.set(queueId, queueHandler);
            queueHandler.on('finished', () => {
                this.queues.delete(queueId);
                if (!this.hasPending()) {
                    this.emit('empty');
                }
            });
        }
        return this.queues.get(queueId)!.addTask(task);
    }

    hasPending() {
        return this.queues.size > 0;
    }
}

class TaskQueueHandler extends EventEmitter {
    private tasks: (() => Promise<void>)[] = [];

    addTask(task: () => Promise<void>) {
        this.tasks.push(task);
        this.runNextTask();
    }

    private async runNextTask() {
        if (this.tasks.length === 0) {
            this.emit('finished');
            return;
        }
        const task = this.tasks.shift();
        if (task) {
            try {
                await task();
            } catch (error) {
                console.error('Task failed', error);
            } finally {
                this.runNextTask();
            }
        }
    }
}

import { Delay, requestAnimDict, taskBar, taskBarSkill } from "../utils/tools";

export class AnimationTask {
    ped: number;
    type: string;
    flag: number;
    text: string;
    active: boolean;
    duration: any;
    dictionary: string;
    animation: string;
    tickId: number;
    task: any;
    constructor(pPed: number, pType: string, pText: string, pDuration: any, pDictionary: string, pAnimation: string, pFlag = 1) {
        this.ped = pPed;
        this.type = pType;
        this.flag = pFlag;
        this.text = pText;
        this.active = false;
        this.duration = pDuration;
        this.dictionary = pDictionary;
        this.animation = pAnimation;
        this.tickId = 0;
        this.task = "";
    }

    start(cb?: Function) {
        if (this.active) return;
        this.active = true;

        cb && cb();

        this.tickId = setTick(async () => {
            if (this.animation && !IsEntityPlayingAnim(this.ped, this.dictionary, this.animation, 3)) {
                requestAnimDict(this.dictionary);
                TaskPlayAnim(this.ped, this.dictionary, this.animation, -8, -8, -1, this.flag, 0, false, false, false);
            } else {
                if (!this.animation && !IsPedUsingScenario(this.ped, this.dictionary)) {
                    TaskStartScenarioInPlace(this.ped, this.dictionary, 0, true);
                }
            }
            await Delay(100);
        });

        this.task = "";
        if (this.type === "skill" && this.duration instanceof Array) {
            this.task = new Promise(async (resolve) => {
                const duration = this.duration;

                for (const key of duration) {
                    if (!key || !key.difficulty || !key.gap) continue;
                    const finished = await taskBarSkill(key.difficulty, key.gap);
                    if (finished !== 100) return resolve(0);
                }

                resolve(100);
            });
        } else if (this.type === "normal" && typeof this.duration === "number") {
            this.task = taskBar(this.duration, this.text);
        }

        this.task.then(() => {
            this.stop();
        })

        return this.task;
    }

    stop() {
        if (!this.active) return;
        this.active = false;
        clearTick(this.tickId);

        if (!this.animation && IsPedUsingScenario(this.ped, this.dictionary)) {
            ClearPedTasks(this.ped);
            ClearPedTasksImmediately(this.ped);
        } else {
            StopAnimTask(this.ped, this.dictionary, this.animation, 3);
        }
    }

    abort() {
        if (!this.active) return;
        global.exports["vrp-taskbar"].taskCancel();
        this.stop();
    }
}
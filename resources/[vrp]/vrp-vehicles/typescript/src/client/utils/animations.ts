import { AnimationTask } from "../classes/animationTask";
import { GetClosestBone } from "./vectors";
import { GetAnimationSettings } from "../controllers/items/itemAnimations";

export async function PlayAnimation(pPed: number, pEntity: number, pAnimation: string) {
    const settings = typeof pAnimation === "string" ? GetAnimationSettings(pAnimation) : pAnimation;
    if (!settings) return;

    const animation = new AnimationTask(pPed, settings.type, settings.text, settings.duration, settings.dictionary, settings.animation, settings.flag);
    
    let callback = settings.callback;

    if (!callback && settings.data) {
        const data = settings.data;
        callback = (self: any, target: any) => {
            const [targetBone, boneName, targetDistance] = GetClosestBone(target, data.bones);
            if (targetDistance && targetDistance > data.distance) {
                self.abort();
            }
        };
    }

    return await animation.start((self: any) => {
        if (!callback) return;

        const interval = setInterval(() => {
            if (!animation.active) {
                clearInterval(interval);
                animation.abort();
            }

            callback(self, pEntity);
        }, 1000);
    });
}
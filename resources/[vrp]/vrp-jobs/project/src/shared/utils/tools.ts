export let Delay = (ms:any) => new Promise(res => setTimeout(res, ms));

export function taskBar(length: number, name: string, runCheck = false): Promise<number> {
    return new Promise(resolve => {
        name ? global.exports["vrp-taskbar"].taskBar(length, name, runCheck, true, null, false, resolve) : setTimeout(() => resolve(100), length);
    });
}

export const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const genNumbers = (length: number) => {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 1; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function loopSkill(count: number): Promise<boolean> {
    let loopCount = 0;

    while (loopCount < count) {
        loopCount++;
        const finished = await globalThis.exports['vrp-ui'].taskBarSkill(Math.floor(Math.random() * (2500 - 2000 + 1)) + 2000, Math.floor(Math.random() * (12 - 7 + 1)) + 7);
        if (finished !== 100) {
            return false;
        }
        await Delay(100);
    }
    
    TriggerEvent("client:newStress", false, 250);
    return true;
}
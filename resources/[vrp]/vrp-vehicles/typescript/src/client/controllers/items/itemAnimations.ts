import { GetRandom } from "../../utils/tools";

const animationSettings = new Map<string, any>();

export async function InitAnimationList(): Promise<void> {
    ItemAnimationList.forEach((element) => {
        SetAnimationSettings(element.name, element.animation);
    })
}

const ItemAnimationList = [
    {
        name: 'repairkit:engine',
        animation: {
            type: 'skill',
            text: 'Repairing vehicle...',
            duration: [
                {
                    difficulty: 60000,
                    gap: GetRandom(10, 18)
                },
            ],
            dictionary: 'mini@repair',
            animation: 'fixing_a_player',
            data: {
                distance: 1.8,
                bones: ['engine', 'engine_l', 'engine_r'],
            },
        },
    },
    {
        name: 'tempmodkit',
        animation: {
            type: 'skill',
            text: 'Installing Vehicle Modification...',
            duration: [
                {
                    get difficulty() {
                        return GetRandom(1500, 3000);
                    },
                    get gap() {
                        return GetRandom(10, 18);
                    }
                },
                {
                    get diffuclty() {
                        return GetRandom(4000, 12000);
                    },
                    get gap() {
                        return GetRandom(10, 18);
                    }
                },
                {
                    get difficulty() {
                        return GetRandom(500, 2000);
                    },
                    get gap() {
                        return GetRandom(10, 18);
                    }
                },
                {
                    get difficulty() {
                        return GetRandom(2000, 3000);
                    },
                    get gap() {
                        return GetRandom(10, 18);
                    }
                }
            ],
            dictionary: 'mini@repair',
            animation: 'fixing_a_player',
            data: {
                distance: 2.5,
                bones: ['engine', 'engine_l', 'engine_r']
            },
        },
    },
    {
        name: 'degradation:brakes',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'anim@amb@clubhouse@tutorial@bkr_tut_ig3@',
            animation: 'machinic_loop_mechandplayer',
            data: {
                distance: 1.2,
                bones: ['wheel_lf', 'wheel_rf', 'wheel_lm', 'wheel_rm', 'wheel_lr', 'wheel_rr', 'wheel_lm1', 'wheel_rm1'],
            },
        },
    },
    {
        name: 'degradation:axle',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'anim@amb@clubhouse@tutorial@bkr_tut_ig3@',
            animation: 'machinic_loop_mechandplayer',
            data: {
                distance: 1.2,
                bones: ['wheel_lf', 'wheel_rf', 'wheel_lm', 'wheel_rm', 'wheel_lr', 'wheel_rr', 'wheel_lm1', 'wheel_rm1']
            },
        },
    },
    {
        name: 'degradation:radiator',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'mp_car_bomb',
            animation: 'car_bomb_mechanic',
            flag: 17,
            data: {
                distance: 2.5,
                bones: ['engine', 'engine_l', 'engine_r']
            },
        },
    },
    {
        name: 'degradation:clutch',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'WORLD_HUMAN_WELDING',
            animation: '',
            data: {
                distance: 2.6,
                bones: ['bodyshell']
            },
        },
    },
    {
        name: 'degradation:transmission',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'WORLD_HUMAN_WELDING',
            animation: '',
            data: {
                distance: 2.6,
                bones: ['bodyshell']
            },
        },
    },
    {
        name: 'degradation:electronics',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'mp_car_bomb',
            animation: 'car_bomb_mechanic',
            data: {
                distance: 2.5,
                bones: ['engine', 'engine_l', 'engine_r']
            },
        },
    },
    {
        name: 'degradation:injector',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'mini@repair',
            animation: 'fixing_a_player',
            data: {
                distance: 2.5,
                bones: ['engine', 'engine_l', 'engine_r']
            },
        },
    },
    {
        name: 'degradation:tyres',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'anim@amb@clubhouse@tutorial@bkr_tut_ig3@',
            animation: 'machinic_loop_mechandplayer',
            data: {
                distance: 1.2,
                bones: ['wheel_lf', 'wheel_rf', 'wheel_lm', 'wheel_rm', 'wheel_lr', 'wheel_rr', 'wheel_lm1', 'wheel_rm1']
            },
        },
    },
    {
        name: 'degradation:body',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'WORLD_HUMAN_WELDING',
            animation: '',
            data: {
                distance: 2.6,
                bones: ['bodyshell']
            },
        },
    },
    {
        name: 'degradation:engine',
        animation: {
            type: 'normal',
            text: 'Repairing vehicle...',
            duration: 20000,
            dictionary: 'mini@repair',
            animation: 'fixing_a_player',
            data: {
                distance: 2.5,
                bones: ['engine', 'engine_l', 'engine_r']
            },
        },
    },
];

export function GetAnimationSettings(pName: string) {
    return animationSettings.get(pName);
}

export function SetAnimationSettings(pName: string, pAnim: any) {
    animationSettings.set(pName, pAnim);
}

export function HasAnimationSettings(pName: string) {
    return animationSettings.has(pName);
}
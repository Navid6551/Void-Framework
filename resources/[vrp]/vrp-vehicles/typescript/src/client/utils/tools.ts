const Throttled = new Set();

export function GetClosestPlayer() {
    const activePlayers = GetActivePlayers();
    const playerId = PlayerId();
    const [pCoordX, pCoordY, pCoordZ] = GetEntityCoords(PlayerPedId(), false);
    let curDistance: any = "";
    let curPlayerId: any = "";
    let curPlayerPed: any = "";

    activePlayers.forEach((activePlayerId: number) => {
        if (activePlayerId !== playerId) {
            const playerPed = GetPlayerPed(activePlayerId);
            const [curCoordX, curCoordY, curCoordZ] = GetEntityCoords(playerPed, false);
            const pDistance = GetDistanceBetweenCoords(pCoordX, pCoordY, pCoordZ, curCoordX, curCoordY, curCoordZ, true);
            (!curPlayerId || pDistance < curDistance) && (curPlayerId = activePlayerId, curPlayerPed = playerPed, curDistance = pDistance);
        }
    });

    return [curPlayerId, curDistance, curPlayerPed];
}

export async function PlayEntitySound(pEntity: number, pAudioName: string, pAudioRef: string, pTimer = 1000) {
    const soundId = GetSoundId();
    PlaySoundFromEntity(soundId, pAudioName, pEntity, pAudioRef, false, 0);
    await Delay(pTimer);
    StopSound(soundId);
    ReleaseSoundId(soundId);
}

export function SyncedExecution() {
    //todo
}

export function GetPedVehicleSeat(pPed: number, pVehicle: number) {
    const vehicleSeats = GetVehicleModelNumberOfSeats(GetEntityModel(pVehicle));
    for (let i = -1; i < vehicleSeats - 1; i += 1) {
        const ped = GetPedInVehicleSeat(pVehicle, i);
        if (ped && ped === pPed) return i;
    }
}

export const Delay = (ms: any) => new Promise(res => setTimeout(res, ms));

export async function loadAnimDict(dict: string) {
    while (!HasAnimDictLoaded(dict)) {
        RequestAnimDict(dict)
        await Delay(5)
    }
}

export function GetRandom(pMin: number, pMax?: number) {
    const pResult = pMax ? Math.random() * (pMax - pMin) + pMin : Math.random() * pMin;
    return Number.isInteger(pMin) ? Math.round(pResult) : pResult;
}

export function findMiddleValueInRange(value1: number, value2: number, value3: number) {
    return Math.min(Math.max(value1, value2), value3);
}

export function Capitalize(pString: string) {
    return pString.charAt(0).toUpperCase() + pString.slice(1);
}

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

export async function loadAndRequestModel(pHashKey: any) {
    const pModel = typeof pHashKey === "number" ? pHashKey : GetHashKey(pHashKey);
    if (!HasModelLoaded(pModel) && IsModelInCdimage(pModel)) {
        RequestModel(pModel);
        let pBool = false;
        setTimeout(() => pBool = true, 60000);
        while (!HasModelLoaded(pModel) && !pBool) {
            await Delay(10);
        }
    }
}

const exhaustList = ['exhaust'];

export function GetVehicleExhausts(pVehicle: number) {
    const pVeh: any = [];
    if (exhaustList.length === 1) {
        for (let i = 2; i < 17; i += 1) {
            exhaustList.push("exhaust_" + i);
        }

        exhaustList.forEach(pBoneName => {
            if (GetEntityBoneIndexByName(pVehicle, pBoneName) !== -1) pVeh.push(pBoneName);
        })

        return pVeh;
    }
}

export function Throttle(pName: string, pTime = 500) {
    if (!Throttled.has(pName)) return Throttled.add(pName), setTimeout(() => Throttled.delete(pName), pTime), false;
    return true;
}

export function IsThrottled(pName: string) {
    return Throttled.has(pName);
}

let pApplicationIdx = 0;
const pApplications = new Map();

RegisterUICallback('vrp-ui:applicationClosed', (data: any, cb: any) => {
    if (data.name !== "textbox" || data.callbackUrl !== "vrp-ui:menu:input") return;
    const pApp = pApplications.get(data.key);
    if (!pApp) return;
    pApp.resolve(null);
    pApplications.delete(data.key);
})

RegisterUICallback('vrp-ui:menu:input', (data: any, cb: any) => {
    cb({ data: {}, meta: { ok: true, message: '' } });
    const pApp = pApplications.get(data.key);
    if (!pApp) return;
    const pPrompt = pApp.validation ? pApp.validation(data.values) : true;
    if (!pPrompt) return;
    pApp.resolve(data.values);
    pApplications.delete(data.key);
    global.exports["vrp-ui"].closeApplication("textbox");
});

export function OpenInputMenu(pItems: any, pValidation: any) {
    const idx = ++pApplicationIdx;
    const pResult = new Promise(resolve => {
        pApplications.set(idx, {
            resolve: resolve,
            validation: pValidation
        });
    });

    global.exports["vrp-ui"].openApplication("textbox", {
        callbackUrl: "vrp-ui:menu:input",
        key: idx,
        items: pItems,
        show: true
    })

    return pResult;
}
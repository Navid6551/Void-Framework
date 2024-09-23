import { Delay, loadAnimDict } from "../../utils/tools";
import { isCop } from "../state/jobs";
import { HasVehicleKey } from "../state/keys";

let isLockpicking = false;

let pLockpickState = {
    active: false,
    data: { success: false, stage: 0 }
};

export function InitHotwire() { }

export async function LockpickVehicleDoor(pEntity: number, pItemType = "lockpick", isForced = false, pCallback: Function) {
    if (isLockpicking) return;

    isLockpicking = true;

    emit("vrp-vehicle:client:doorLockpicking", NetworkGetNetworkIdFromEntity(pEntity));

    const finished = await global.exports["vrp-ui"].taskBarSkill(15000, 3);
    if (finished !== 100) {
        isLockpicking = false;
        pCallback({
            success: false
        });
        return;
    }

    const finished2 = await global.exports["vrp-ui"].taskBarSkill(2200, 4);
    if (finished2 !== 100) {
        isLockpicking = false;
        pCallback({
            success: false
        });
        return;
    }

    ClearPedTasksImmediately(PlayerPedId());

    const success = finished === 100 && finished2 === 100

    if (!isForced) {
        emit("inventory:DegenLastUsedItem", success ? 5 : 20);
    }

    if (finished === 100 && finished2 === 100) {
        const playerPed = GetPedInVehicleSeat(pEntity, -1);
        if (playerPed !== 0 && IsEntityDead(playerPed)) {
            SetVehicleDoorsLocked(pEntity, 0);
            setTimeout(() => SetControlNormal(0, 23, 2), 500);
            const progress = await global.exports["vrp-taskbar"].taskBar(7000, "Taking car keys", false);
            emit("civilian:alertPolice", 20, "lockpick", pEntity);
            if (!isForced) {
                global.exports["vrp-flags"].SetVehicleFlag(pEntity, "isStolenVehicle", true);
            }
            if (progress === 100) {
                emit("vehicle:keys:addNew", pEntity);
                emit("DoLongHudText", "Got the vehicle keys.", 1);
            }
        }
        SetVehicleDoorsLocked(pEntity, 1);
        emit("DoLongHudText", "Vehicle Unlocked.", 1);
        emit("InteractSound_CL:PlayOnOne", "unlock", 0.1);
    }

    isLockpicking = false;

    pCallback({
        success: true
    });

    return {
        success: true
    };
}

global.exports('LockpickVehicleDoor', (pVehicle: number, pItemType = "lockpick", isForced = false, pCallback: Function) => {
    return LockpickVehicleDoor(pVehicle, pItemType, isForced, pCallback);
});

export async function HotwireVehicle(pVehicle: number, pItemType: string, pIsForced: boolean, callback: Function) {
    const finished = await global.exports["vrp-ui"].taskBarSkill(Math.floor(Math.random() * (10000 - 5000)) + 5000, Math.floor(Math.random() * (15 - 10)) + 10);
    if (finished !== 100) {
        callback({
            success: false,
            stage: 1
        });
        return;
    }

    const finished2 = await global.exports["vrp-ui"].taskBarSkill(Math.floor(Math.random() * (10000 - 5000)) + 5000, Math.floor(Math.random() * (15 - 10)) + 10);
    if (finished2 !== 100) {
        callback({
            success: false,
            stage: 2
        });
        return;
    }

    const finished3 = await global.exports["vrp-ui"].taskBarSkill(1500, Math.floor(Math.random() * (10 - 5)) + 5);
    if (finished3 !== 100) {
        callback({
            success: false,
            stage: 3
        });
        return;
    }

    await Delay(500);

    if (finished === 100 && finished2 === 100 && finished3 === 100) {
        const vehCoords = GetEntityCoords(pVehicle, false);
        const pedCoords = GetEntityCoords(PlayerPedId(), false);
        if (GetDistanceBetweenCoords(vehCoords[0], vehCoords[1], vehCoords[2], pedCoords[0], pedCoords[1], pedCoords[2], true) < 10.0 && pVehicle !== 0 && GetEntitySpeed(pVehicle) < 5.0) {
            emit("vehicle:keys:addNew", pVehicle);
            emit("DoLongHudText", "Ignition Working.", 1)
            await global.exports["vrp-flags"].SetVehicleFlag(pVehicle, "isStolenVehicle", true);
            await global.exports["vrp-flags"].SetVehicleFlag(pVehicle, "isHotwiredVehicle", true);
            callback({
                success: true,
                stage: 3
            });

            emitNet("vrp-vehicles:vehicleHotwired", NetworkGetNetworkIdFromEntity(pVehicle));
            emit('vrp-vehicle:client:vehicleLockpicked', NetworkGetNetworkIdFromEntity(pVehicle))
            return;
        }
        callback({
            success: false
        });
        return;
    }
}

global.exports("HotwireVehicle", (pVehicle: number, pItemType: string, pIsForced: boolean, pCallback: Function) => {
    return HotwireVehicle(pVehicle, pItemType, pIsForced, pCallback);
});

export async function DoorLockCheck(pVehicle: number) {
    if (!HasVehicleKey(pVehicle)) {
        const playerPed = GetPedInVehicleSeat(pVehicle, -1);
        if (playerPed !== 0 && !IsPedAPlayer(playerPed)) {
            const lockStatus = GetVehicleDoorLockStatus(pVehicle);
            if (lockStatus === 1) {
                SetVehicleDoorsLocked(pVehicle, 2);
            }
        }
    }
}

async function ToggleLockState(pVehicle: number, pSound: boolean) {
    if (HasVehicleKey(pVehicle)) {
        const pLockStatus = GetVehicleDoorLockStatus(pVehicle);
        const pLocked = pLockStatus === 0 || pLockStatus === 1;
        SetVehicleDoorsLocked(pVehicle, pLocked ? 2 : 1);
        pLocked ? emit("DoLongHudText", "Vehicle Locked.", 1) : emit("DoLongHudText", "Vehicle Unlocked.", 1);
        if (pSound) {
            await loadAnimDict("anim@heists@keycard@");
            TaskPlayAnim(PlayerPedId(), "anim@heists@keycard@", "exit", 8, 1, -1, 48, 0, false, false, false);
            emitNet("InteractSound_SV:PlayWithinDistance", 3.0, "lock", 0.4)
        }
    }
}

RegisterCommand("+vehicleLock", () => {
    const pEntity = global.exports["vrp-target"].GetCurrentEntity();
    let pVehicle;
    if (pEntity && DoesEntityExist(pEntity)) ToggleLockState(pEntity, true);
    else (pVehicle = GetVehiclePedIsIn(PlayerPedId(), false)) && ToggleLockState(pVehicle, true);
}, false);

RegisterCommand("-vehicleLock", () => { }, false);

on("vrp-vehicles:checkTampering", (pArgs: any, pEntity: number) => {
    if (!isCop) return;

    const isStolenVehicle = global.exports['vrp-flags'].HasVehicleFlag(pEntity, 'isStolenVehicle');

    if (isStolenVehicle) {
        return emit('DoLongHudText', 'This vehicle has signs of forced break-in');
    }

    return emit('DoLongHudText', 'This vehicle has not been tampered with');
});

global.exports["vrp-keybinds"].registerKeyMapping("", "Vehicle", "Lock Doors", "+vehicleLock", "-vehicleLock", "L");
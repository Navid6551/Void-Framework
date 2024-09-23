import { Thread } from '../../classes/thread';
import { DriverThread } from '../threads/driver';
import { GetVehicleMetadata } from '../vehicle';

const vehicleHandling: any = new Map();

export async function InitHandling(): Promise<void> { };

const handlingArray = ["fBrakeForce", "fClutchChangeRateScaleDownShift", "fClutchChangeRateScaleUpShift", "fCollisionDamageMult", "fDeformationDamageMult", "fDriveBiasFront", "fDriveInertia", "fEngineDamageMult", "fHandBrakeForce", "fInitialDragCoeff", "fInitialDriveForce", "fInitialDriveMaxFlatVel", "fLowSpeedTractionLossMult", "fSteeringLock", "fSuspensionCompDamp", "fSuspensionForce", "fSuspensionReboundDamp", "fTractionBiasFront", "fTractionCurveMax", "fTractionCurveMin", "fTractionLossMult", "fWeaponDamageMult"];

export function GetHandlingField(pVehicle: number) {
    if (!DoesEntityExist(pVehicle) || !IsEntityAVehicle(pVehicle)) return;
    if (!vehicleHandling.has(pVehicle)) {
        const handling = {};
        for (const key of handlingArray) {
            handling[key] = GetVehicleHandlingFloat(pVehicle, "CHandlingData", key);
        }
        Object.freeze(handling), vehicleHandling.set(pVehicle, handling);
    }
    return vehicleHandling.get(pVehicle);
}

export function GetVehicleHandling(pVehicle: number) {
    const data = GetVehicleMetadata(pVehicle, "handling");
    if (!data) return null;
    return data;
}

export function SetHandlingContextMultiplier(pVehicle: number, pFieldName: string, pMode: string, pType: string, pValue: number, pPriority = 1) {
    const isActive = DriverThread.isActive && DriverThread.data.vehicle === pVehicle;
    const result = isActive ? DriverThread.data.handling : GetVehicleHandling(pVehicle);
    if (!result[pFieldName]) result[pFieldName] = {};

    //console.log("SetHandlingContextMultiplier", pVehicle, pFieldName, pMode, pType, pValue, pPriority);

    //pKey is the handling field, pMode is the mode, pType is the type, pValue is the value, pPriority is the priority.
    result[pFieldName][pMode] = {
        value: pValue,
        type: pType,
        priority: pPriority
    }

    //console.log("SetHandlingContextMultiplier result", JSON.stringify(result[pFieldName][pMode]));
}

export function ResetHandlingContextMultipier(pVehicle: number, pFieldName: string, pMode: string) {
    //console.log("ResetHandlingContextMultipier", pVehicle, pFieldName, pMode);
    const isActive = DriverThread.isActive && DriverThread.data.vehicle === pVehicle;
    const result = isActive ? DriverThread.data.handling : GetVehicleHandling(pVehicle);

    //console.log("ResetHandlingContextMultipier result", result);

    if (!result[pFieldName]) result[pFieldName] = {};
    if (!result[pFieldName][pMode]) return;

    //console.log("Restting this result: ", result[pFieldName][pMode])

    delete result[pFieldName][pMode];

    //console.log("ResetHandlingContextMultipier result", result);
}

export function ApplyHandlingMultipliers(pVehicle: number, pIndex?: string) {
    //console.log("ApplyHandlingMultipliers", pVehicle, pIndex);
    const handling = GetHandlingField(pVehicle);
    const result = unkFunc33(pVehicle, pIndex as any);

    //console.log("handling", handling);
    //console.log("result", result);

    const compareAndSetFloat = (pFieldName: string, pValue: number) => {
        const curHandling = handling[pFieldName];

        //console.log(`CompareAndSetFloat: ${pFieldName} | Cur Handling: ${curHandling} | Value: ${pValue}`);

        if (curHandling !== pValue) {
            console.log("Clean: " + curHandling + " | Modified: " + pValue + " | Handling: " + pFieldName);
        }

        SetVehicleHandlingFloat(pVehicle, "CHandlingData", pFieldName, pValue);
    }

    if (typeof result === "number") {
        //console.log("result is number");
        compareAndSetFloat(pIndex as any, result);
    } else {
        //console.log("result is object");
        for (const [key, value] of Object.entries(result)) {
            compareAndSetFloat(key, value as any);
        }
    }

    SetVehicleEnginePowerMultiplier(pVehicle, 0);
    SetVehiclePetrolTankHealth(pVehicle, 4000);
    SetVehicleHasBeenOwnedByPlayer(pVehicle, true);
}

export const MassResetHandlingContextMultipier = (pVehicle: number, pArray: any[], pMode: string) => {
    //console.log("MassResetHandlingContextMultipier", pVehicle, pArray, pMode);
    for (const key of pArray) {
        //console.log("Looping reset array with key: ", key);
        ResetHandlingContextMultipier(pVehicle, key, pMode);
    }

    ApplyHandlingMultipliers(pVehicle);
}

export const MassSetHandlingContextMultipier = (pVehicle: number, pData: any, pMode: any, pPriority = 1) => {
    for (const [key, value] of Object.entries(pData)) {
        const val: any = value
        SetHandlingContextMultiplier(pVehicle, key, pMode, val.type, val.value, pPriority);
    }

    ApplyHandlingMultipliers(pVehicle);
}

function unkFunc33(pVehicle: number, pFieldName: string) {
    const isActive = DriverThread.isActive && DriverThread.data.vehicle === pVehicle;
    const result = isActive ? DriverThread.data.handling : GetVehicleHandling(pVehicle);

    if (!result) return;

    const unkFunc34 = (pVehicle: number, pFieldName: string) => {
        const handling: HandlingContext = result[pFieldName];
        const res = GetHandlingField(pVehicle)[pFieldName];
        if (!handling) return res;

        //if (pFieldName === "fInitialDriveForce") console.log("unkFunc32 fInitialDriveForce handling", handling);

        const sortedHandling = Object.keys(handling).sort((a: any, b: any) => {
            //return b.priority - a.priority;
            return handling[b].priority - handling[a].priority; //IDK
        })[0];

        //console.log("sortedHandling", sortedHandling);

        if (!sortedHandling) return res;

        //Still have to fix real sorting, cuz this is scuffed, but it works for now.
        const { value: pValue, type: pType }: any = handling[sortedHandling];

        let final = res;

        if (pType === "fixed") {
            final = pValue;
        }
        if (pType === "multiplier") {
            //console.log(`Field Name: ${pFieldName} | Type: ${pType} | Original Value: ${res} | Multiplier: ${pValue}`)
            final = res * pValue;
        }
        if (pType === "divider") {
            final = res / pValue;
        }

        for (const key of Object.keys(handling).filter((pItem: any) => pItem.priority === 0)) {
            if (key["type"] === "multiplier") {
                final = final * key["value"];
            }
            if (key["type"] === "divider") {
                final = final / key["value"];
            }
        }

        //console.log("Final value", final);

        return final;
    };

    if (pFieldName) return unkFunc34(pVehicle, pFieldName);

    const handling = {};
    for (const pFieldName of handlingArray) {
        handling[pFieldName] = unkFunc34(pVehicle, pFieldName);
    }

    return handling;
}

DriverThread.addHook("preStart", function (this: Thread) {
    //This fetches data from metadata about handling.
    //What we 100% know is that it contains the float field names, the context type and the value.
    this.data.handling = {}; //GetVehicleHandling(this.data.vehicle);
});

DriverThread.addHook("afterStart", function (this: Thread) {
    ApplyHandlingMultipliers(this.data.vehicle);
});

on("onResourceStop", (resource: string) => {
    if (resource !== GetCurrentResourceName()) return;

    vehicleHandling.entries((pVehicle: number, pData: any) => {
        for (const [key, value] of Object.entries(pData)) {
            SetVehicleHandlingFloat(pVehicle, "CHandlingData", key, value as any);
        }
    });
});

on('baseevents:enteredVehicle', async (pVehicle: number) => {
    SetPedConfigFlag(PlayerPedId(), 35, false);
    const pVehicleClass = GetVehicleClass(pVehicle);
    if (pVehicleClass == 15 || pVehicleClass == 16) {
        SetAudioSubmixEffectParamInt(0, 0, GetHashKey("enabled"), 1);
        SetAudioFlag("DisableFlightMusic", true);
    }
})

on('baseevents:leftVehicle', () => {
    SetAudioSubmixEffectParamInt(0, 0, GetHashKey("enabled"), 0);
})

global.exports("SetHandlingContextMultiplier", SetHandlingContextMultiplier);
global.exports("ResetHandlingContextMultipier", ResetHandlingContextMultipier);
global.exports("ApplyHandlingMultipliers", ApplyHandlingMultipliers);
global.exports("MassSetHandlingContextMultipier", MassSetHandlingContextMultipier);
global.exports("MassResetHandlingContextMultipier", MassResetHandlingContextMultipier);
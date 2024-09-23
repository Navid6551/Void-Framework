import { Mods } from '../../../shared/enums/mods';

export function IsToggle(pNumber: number) {
    return pNumber >= 17 && pNumber <= 22;
}

export function GetMod(pVehicle: number, pIndex: string) {
    const modType = Number(Mods[pIndex]);

    if (!isNaN(modType)) {
        if (IsToggle(modType)) {
            return IsToggleModOn(pVehicle, modType) ? 1 : 0;
        } else {
            return GetVehicleMod(pVehicle, modType);
        }
    }
}

export function GetMods(pVehicle: number) {
    const mods = {};

    for (const key in Mods) {
        if (isNaN(Number(key))) {
            mods[key] = GetMod(pVehicle, key);
        }
    }

    return mods;
}

export function SetMod(pVehicle: number, pMod: string, pValue: any) {
    const modType = Number(Mods[pMod]);
    const isCustom = (modType === 23 || modType === 24) && pValue !== -1;

    if (!isNaN(modType)) {
        if (IsToggle(modType)) {
            ToggleVehicleMod(pVehicle, modType, pValue);
        } else {
            if (pValue === 255) pValue = GetNumVehicleMods(pVehicle, modType) - 1;
            SetVehicleMod(pVehicle, modType, pValue, false);
        }
    }
}

export function SetMods(pVehicle: number, pData: any) {
    SetVehicleModKit(pVehicle, 0);

    for (const [key, value] of Object.entries(pData)) {
        SetMod(pVehicle, key, value);
    }
}

global.exports("GetVehicleMods", GetMods);
global.exports("SetVehicleMods", SetMods);
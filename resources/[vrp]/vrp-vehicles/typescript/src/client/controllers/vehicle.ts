import { GetModuleConfig } from '../utils/config';
import { GetPedVehicleSeat, PlayEntitySound, findMiddleValueInRange } from '../utils/tools';
import { GetVehicleIdentifier, HasVehicleKey } from './state/keys';

export let CurrentVehicle: any;
export let PreviousVehicle: any;
export let CurrentSeat: any;
export let PreviousSeat: any;
export let InVehicle: any;
export let curVehicle: any;

export async function InitVehicle() {
    const playerPed = PlayerPedId();
    CurrentVehicle = GetVehiclePedIsIn(playerPed, false);
    CurrentSeat = CurrentVehicle ? GetPedVehicleSeat(playerPed, CurrentVehicle) : null;
}

export function GetVehicleMetadata(pVehicle: number, pKey?: string) {
    const ent = Entity(pVehicle);
    if (ent) {
        const metaData = ent.state.data;
        if(metaData) {
            if (pKey) {
                return metaData[pKey];
            } else {
                return metaData;
            }
        }
    } else {
        return null;
    }
}

export function UpdateCurrentVehicle() {
    const playerPed = PlayerPedId();
    PreviousVehicle = CurrentVehicle;
    CurrentVehicle = GetVehiclePedIsIn(playerPed, false);
    CurrentSeat = CurrentVehicle ? GetPedVehicleSeat(playerPed, CurrentVehicle) : null;
    InVehicle = !!CurrentVehicle;
}

export async function FuelTankDamage(pVehicle: number, pDamage: number) {
    PlayEntitySound(pVehicle, "Engine_fail", "DLC_PILOT_ENGINE_FAILURE_SOUNDS", 5000);

    const fuel = GetVehicleMetadata(pVehicle, "fuel");
    const fuelDamageConfig = GetModuleConfig<{ leakMinTime: number, leakMaxTime: number }>("vrp-vehicles", "fuelDamage");

    if (fuel > 0) {
        // const middleValue = findMiddleValueInRange(pDamage, fuelDamageConfig.leakMinTime, fuelDamageConfig.leakMaxTime);
        // const netId = NetworkGetNetworkIdFromEntity(pVehicle);
        // await RPC.execute("vrp:vehicles:fuelTankDamage", netId, middleValue);
    }
}

export function TurnOnEngine(pVehicle: number, pInstant = false) {
    if (GetPedInVehicleSeat(pVehicle, -1) !== PlayerPedId()) return false;

    const engineHealth = GetVehicleEngineHealth(pVehicle);
    const bodyHealth = GetVehicleBodyHealth(pVehicle);
    const hasLicense = true;

    if(!hasLicense) return emit("DoLongHudText", "I don't know how to operate this vehicle.", 2);

    if(engineHealth <= 150 || bodyHealth <= 150) {
        return emit("DoLongHudText", "Something seems to be damaged.", 2);
    }

    if (pVehicle !== curVehicle) SetVehicleUndriveable(pVehicle, false);
    else return false;

    return SetVehicleEngineOn(pVehicle, true, pInstant, true), IsVehicleEngineOn(pVehicle);
}

export function TurnOffEngine(pVehicle: number, pInstant = false) {
    if (CurrentSeat !== -1) return false;
    return SetVehicleUndriveable(pVehicle, true), SetVehicleEngineOn(pVehicle, false, pInstant, true), !IsVehicleEngineOn(pVehicle);
}

export function VerifyEngineState(pVehicle: number) {
    const hasKeys = HasVehicleKey(pVehicle);
    if (!hasKeys) {
        SetVehicleNeedsToBeHotwired(pVehicle, false);
        SetVehicleUndriveable(pVehicle, true);
        SetVehicleEngineOn(pVehicle, false, true, true);
    }
    return hasKeys;
}

export function SwapVehicleSeat(pSeat: number, pVehicle?: number) {
    const playerPed = PlayerPedId();
    const vehicle = pVehicle ? pVehicle : GetVehiclePedIsIn(playerPed, false);
    if (pSeat === -1 && IsVehicleEngineOn(vehicle)) VerifyEngineState(vehicle);
    if (vehicle && IsVehicleSeatFree(vehicle, pSeat)) {
        SetPedIntoVehicle(playerPed, vehicle, pSeat);
    }
}

export function GetCurrentVehicleIdentifier() {
    const playerPed = PlayerPedId();
    const vehicle = GetVehiclePedIsIn(playerPed, false);
    if (!IsPedInAnyVehicle(playerPed, false) || vehicle === 0) {
        emit('DoLongHudText', "You have to be inside the vehicle you're interacting with.", 2);
        return;
    }
    return GetVehicleIdentifier(vehicle);
}

export async function GenerateVehicleInformation(pVehicle: number) {
    if (GetVehicleIdentifier(pVehicle)) return;
    const netId = NetworkGetNetworkIdFromEntity(pVehicle);
    const model = GetEntityModel(pVehicle);
    const result = await RPC.execute("vrp:vehicles:generateVehicleInformation", netId, model);
    return result;
}

RegisterCommand("+engineOn", () => {
    if (IsPauseMenuActive()) return;
    const pVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
    pVehicle && DoesEntityExist(pVehicle) && TurnOnEngine(pVehicle);
}, false)

RegisterCommand("-engineOn", () => { }, false);

RegisterCommand("+engineOff", () => {
    if (IsPauseMenuActive()) return;
    const pVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
    pVehicle && DoesEntityExist(pVehicle) && TurnOffEngine(pVehicle);
}, false)

RegisterCommand("-engineOff", () => { }, false);

global.exports["vrp-keybinds"].registerKeyMapping('', "Vehicle", "Engine On", "+engineOn", "-engineOn", "IOM_WHEEL_UP", false, "MOUSE_WHEEL");
global.exports["vrp-keybinds"].registerKeyMapping('', "Vehicle", "Engine Off", "+engineOff", "-engineOff", "IOM_WHEEL_DOWN", false, "MOUSE_WHEEL");

global.exports('GetVehicleMetadata', GetVehicleMetadata);
global.exports('SwapVehicleSeat', SwapVehicleSeat);
global.exports('TurnOffEngine', TurnOffEngine);
global.exports('TurnOnEngine', TurnOnEngine);
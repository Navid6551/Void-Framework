import { Delay } from "../../utils/tools";
import * as Vehicle from "../vehicle";

export const Keys = new Set<string>();
let disableF = false;

export async function InitKeys(): Promise<void> {};

onNet("vrp:vehicles:giveKeys", async () => {
    const vehicles = await RPC.execute("vrp:vehicles:getKeys");

    Object.entries(vehicles).forEach(([key, value]: any) => {
        Keys.add(value.vin);
    });
});

export function GetVehicleIdentifier(pVehicle: number) {
    if (!DoesEntityExist(pVehicle)) return false;
    const ent = Entity(pVehicle);
    if (!ent.state) return false;
    const state = ent.state;
    const result = state.vin ? state.vin : false
    return result;
}

export function GetVehicleOwner(pVehicle: number) {
    if (!DoesEntityExist(pVehicle)) return false;
    const ent = Entity(pVehicle);
    if (!ent.state) return false;
    const state = ent.state;
    return state.owner ? state.owner : 0;
}

export function HasVehicleKey(pVehicle: any) {
    const vin = typeof pVehicle === "number" ? GetVehicleIdentifier(pVehicle) : pVehicle;
    return Keys.has(vin);
}

export function GiveVehicleKey(pVehicle: any, pServerId: number) {
    if (Keys.size === 0) return emit("DoLongHudText", "You have no keys to give!", 2);
    const vin = typeof pVehicle === "number" ? GetVehicleIdentifier(pVehicle) : pVehicle;
    if (vin && Keys.has(vin)) {
        RPC.execute("vrp:vehicles:giveKey", vin, pServerId).then((success: boolean) => {
            if (success) emit("DoLongHudText", "You just gave the keys of your vehicle!", 1);
        });
    } else {
        return emit("DoLongHudText", "No keys for target vehicle!", 2);
    }
}

export function IsVinScratched(pVehicle: number) {
    if (!DoesEntityExist(pVehicle)) return false;
    const ent = Entity(pVehicle);
    if (!ent.state) return false;
    const state = ent.state;
    return state.vinScratched ? state.vinScratched : false;
}

global.exports("GetVehicleIdentifier", GetVehicleIdentifier);
global.exports("GetVehicleOwner", GetVehicleOwner);
global.exports("HasVehicleKey", HasVehicleKey);
global.exports("GiveVehicleKey", GiveVehicleKey);
global.exports("IsVinScratched", IsVinScratched);
import { PlayAnimation } from "../../utils/animations";
import { GetAnimationSettings } from "./itemAnimations";
import { GetRandom } from "../../utils/tools";
import { GetClosestBone, GetDistance, GetDistanceFromEngine, TurnPedCoords, TurnPedEntity, unkFunc41 } from "../../utils/vectors";
import { SetMods } from "../others/mods";
import { GetVehicleRatingClass } from "../others/stats";
import { GetVehicleDegradation } from "../systems/damage";
import { GetVehicleBoneIndex } from "./itemsData";

export async function InitVehicleItems(): Promise<void> { };

export async function UseVehicleRepairKit(pVehicle: number, pAdvanced: boolean) {
    const vehicle = pVehicle ? pVehicle : global.exports["vrp-target"].GetCurrentEntity();
    if (!vehicle) return;

    const vehicleClass = GetVehicleClass(vehicle);
    const engineHealth = GetVehicleEngineHealth(vehicle);
    const bodyHealth = GetVehicleBodyHealth(vehicle);

    if (vehicleClass === 15 || vehicleClass === 16) {
        return emit("DoLongHudText", "Repair kit ineffective for this vehicle.", 2);
    } else if (global.exports["vrp-flags"].HasVehicleFlag(vehicle, "isScrapVehicle")) {
        return emit("DoLongHudText", "The vehicle is beyond repair.", 2);
    } else if ((pAdvanced && engineHealth >= 750 && bodyHealth >= 750 || !pAdvanced && engineHealth >= 250 && bodyHealth >= 250)) {
        return emit("DoLongHudText", "No further repairs required.", 2);
    }

    const vehicleCoords = GetDistanceFromEngine(vehicle);
    const playerCoords = GetEntityCoords(PlayerPedId(), false);
    const distance = GetDistance(vehicleCoords, playerCoords);

    if (distance > 1.0) return emit("DoLongHudText", "Move closer to the engine.", 2);

    const bonnet = unkFunc41(vehicle, 2, "bonnet", vehicleCoords);
    const doorIndex = bonnet <= 2.4 ? 4 : 5;

    await TurnPedEntity(PlayerPedId(), pVehicle);

    SetVehicleDoorOpen(vehicle, doorIndex, false, false);

    const progress = await PlayAnimation(PlayerPedId(), pVehicle, "repairkit:engine");

    SetVehicleDoorShut(vehicle, doorIndex, false);

    if (progress !== 100) return;

    const newHealth = pAdvanced ? 750 : 250;

    SetVehicleEngineHealth(vehicle, newHealth >= engineHealth ? newHealth : engineHealth);
    SetVehicleBodyHealth(vehicle, newHealth >= bodyHealth ? newHealth : bodyHealth);

    emit("inventory:removeItem", pAdvanced ? "advrepairkit" : "repairkit", 1);
}

export async function FixVehicleDegredation(pVehicle: number, pPart: string, pClass: string, pAmount = 10) {
    if (!pVehicle) return;

    const netId = NetworkGetNetworkIdFromEntity(pVehicle);
    const degradation = GetVehicleDegradation(pVehicle);
    const ratingClass = GetVehicleRatingClass(pVehicle);

    if (!degradation) return emit("DoLongHudText", "This vehicle doesn't need to be repaired.", 2);

    const state = degradation[pPart];

    if (typeof state === "undefined") return emit("DoLongHudText", "The vehicle is missing this part.", 2);

    if (pClass !== ratingClass) {
        return emit("DoLongHudText", "Part not compatible with vehicle.", 2);
    }

    let settings = GetAnimationSettings(`degradation:${pPart}`);

    let [boneId, boneName, distance, coords] = GetClosestBone(pVehicle, settings.data.bones);
    let bool = false;

    if (distance > 10) {
        const vehicleCoords = GetEntityCoords(pVehicle, false);
        const playerCoords = GetEntityCoords(PlayerPedId(), false);
        const dist = GetDistance(vehicleCoords, playerCoords);

        if (dist < settings.data.distance) {
            settings = Object.assign(Object.assign({}, settings), {
                data: Object.assign(Object.assign({}, settings.data), { distance: dist + 1 })
            });

            bool = true;
        }
    }

    if (!boneId || bool) {
        coords = GetEntityCoords(pVehicle, false);
    } else {
        if (distance > settings.data.distance) return emit("DoLongHudText", "Get closer to the area that needs to be repaired.", 2);
    }

    await TurnPedCoords(PlayerPedId(), coords);

    const success = await RPC.execute("vrp:vehicles:degradation:requestRepair", netId, pPart, pAmount);

    if (!success) return emit("DoLongHudText", "I can't repair right now.", 2);

    const progress = await PlayAnimation(PlayerPedId(), pVehicle, settings);

    if (progress !== 100) return;

    RPC.execute("vrp:vehicles:degradation:doRepair", netId, pPart, pAmount, success);

    return progress === 100;
}

export async function FixVehicleTire(pVehicle: number) {
    const vehicle = pVehicle ? pVehicle : global.exports["vrp-target"].GetCurrentEntity();
    if (!vehicle) return;
    if (global.exports["vrp-flags"].HasVehicleFlag(vehicle, "isScrapVehicle")) return emit("DoLongHudText", "The vehicle tire is beyond repair.", 2);

    const settings = GetAnimationSettings("degradation:tyres");
    const [boneId, boneName, distance, coords] = GetClosestBone(vehicle, settings.data.bones);

    if (distance > 1.2) return emit("DoLongHudText", "Move closer to the tire.", 2);

    await TurnPedCoords(PlayerPedId(), coords);

    const progress = await PlayAnimation(PlayerPedId(), vehicle, settings);

    if (progress !== 100) return;

    const idx = GetVehicleBoneIndex(boneName);

    SetVehicleTyreFixed(vehicle, idx!);
}

export async function UseHelicopterRepairKit(pVehicle: number, pHealth = 1000) {
    const vehicle = pVehicle ? pVehicle : global.exports["vrp-target"].GetCurrentEntity();
    if (!vehicle) return;

    const success = await DoRepair(vehicle, 2.4, "repairkit:engine");
    if (!success) return false;

    SetVehicleEngineHealth(vehicle, pHealth);
    SetVehicleBodyHealth(vehicle, pHealth);

    return true;
}

export async function UseBodyRepairKit(pVehicle: number) {
    const vehicle = pVehicle ? pVehicle : global.exports["vrp-target"].GetCurrentEntity();
    if (!vehicle) return;

    const success = await DoRepair(vehicle, 2.4, "degradation:body");
    if (!success) return false;

    SetVehicleDeformationFixed(vehicle);
    SetVehicleBodyHealth(vehicle, 1000);

    return true;
}

export async function InstallPart(pVehicle: number, pPart: string, pHealth: number, pTemp: boolean) {
    const vehicle = pVehicle ? pVehicle : global.exports["vrp-target"].GetCurrentEntity();
    if (!vehicle) return;

    const success = await DoRepair(vehicle, 2.4, "tempmodkit"); //pPart
    if (!success) return false;

    if (pTemp !== true) return RPC.execute("vrp-vehicles:applyIllegalMod", NetworkGetNetworkIdFromEntity(vehicle), pPart);

    switch (pPart) {
        case "turbo": {
            SetMods(vehicle, { Turbo: 1 });
        }
        case "engine": {
            SetMods(vehicle, { Engine: GetRandom(1, 3)});
        }
        case "transmission": {
            SetMods(vehicle, { Transmission: GetRandom(1, 3)});
        }
    }

    return true;
}

async function DoRepair(pVehicle: number, pDistance: number, pAnim: string) {
    const vehicle = pVehicle ? pVehicle : global.exports["vrp-target"].GetCurrentEntity();
    if (!vehicle) return;
    if (global.exports["vrp-flags"].HasVehicleFlag(vehicle, "isScrapVehicle")) return emit("DoLongHudText", "The vehicle is beyond repair.", 2);

    console.log("DoRepair vehicle", vehicle);

    const vehicleCoords = GetEntityCoords(vehicle, false);
    const playerCoords = GetEntityCoords(PlayerPedId(), false);
    const distance = GetDistance(vehicleCoords, playerCoords);

    console.log("DoRepair distance", distance);

    if (distance > pDistance) return emit("DoLongHudText", "Move closer to the vehicle.", 2);

    console.log("Good distance");

    await TurnPedEntity(PlayerPedId(), pVehicle);

    console.log("Turned ped");

    const progress = await PlayAnimation(PlayerPedId(), pVehicle, pAnim);

    console.log("DoRepair progress", progress);

    return progress === 100;
}
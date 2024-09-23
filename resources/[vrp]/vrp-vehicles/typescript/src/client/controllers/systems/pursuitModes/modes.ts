import { GetModuleConfig } from "../../../utils/config";
import { PursuitConfigLoaded } from "./mode";

let pursuitVehicles = new Map<number, string>();
let pursuitPresets = new Map<string, PursuitPreset[]>();

export async function InitPursuitModes(): Promise<void> {
    const pursuitModes = GetModuleConfig<PursuitMode>("vrp-vehicles:pursuitModes");
    if (pursuitModes === undefined) return;
    pursuitPresets = new Map(pursuitModes.presets.map((preset) => [preset.id, preset.modes]));
    pursuitVehicles = new Map(pursuitModes.vehicles.map((vehicle) => [GetHashKey(vehicle.model), vehicle.preset]));
};

on("vrp-config:configLoaded", async (pModule: string) => {
    if (pModule !== "vrp-vehicles:pursuitModes") return;
    await InitPursuitModes();
    await PursuitConfigLoaded();
});

export function IsPursuitVehicle(pModel: number) {
    return pursuitVehicles.has(pModel);
}

export function GetPursuitPresets(pModel: number) {
    const preset = pursuitVehicles.get(pModel);
    if (preset === undefined) return; //I'm guessing each pursuit vehicle has its own mode presets
    return pursuitPresets.get(preset); //For now I'll use one for all
}
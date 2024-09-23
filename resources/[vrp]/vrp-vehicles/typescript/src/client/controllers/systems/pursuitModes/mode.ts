import { Thread } from "../../../classes/thread";
import { SetVehicleAppearance } from "../../others/appearance";
import { SetMods } from "../../others/mods";
import { DriverThread } from "../../threads/driver";
import { ApplyHandlingMultipliers, ResetHandlingContextMultipier, SetHandlingContextMultiplier } from "../handling";
import { GetPursuitPresets, IsPursuitVehicle } from "./modes";

export async function InitPursuitMode(): Promise<void> { };

export function ApplyPursuitModifcations(pVehicle: number, pModifications: PursuitPreset) {
    SetMods(pVehicle, pModifications.mods);
    SetVehicleAppearance(pVehicle, pModifications?.appearance ?? {});

    for (const handling of pModifications.handling) {
        //I'm guessing it's a multipler cause when it's on the off mode it's just 0 multiplier
        //SetHandlingContextMultiplier(pVehicle, handling.field, "pursuitMode", "multiplier", handling.multiplier, 2);
        SetHandlingContextMultiplier(pVehicle, handling.field, "pursuitMode", "fixed", handling.multiplier, 2);
    }

    ApplyHandlingMultipliers(pVehicle);
}

export function ChangePursuitMode() {
    if (!DriverThread.isActive || DriverThread.data.isPursuitVehicle !== true) return;

    const data = DriverThread.data;
    const presets = data.pursuitPreset;
    if (presets === undefined) return;

    presets[data.pursuitMode + 1] ? ++data.pursuitMode : data.pursuitMode = 0;

    const preset = presets[data.pursuitMode];
    if (preset === undefined) return console.error("Invalid Pursuit Mode");

    DecorSetInt(data.vehicle, "Vehicle:PursuitMode", data.pursuitMode);

    if (data.pursuitMode === 0) {
        const mods = RPC.execute("vrp-vehicles:getVehicleMods");
        if (!mods) return console.error("Invalid Mods");

        SetMods(data.vehicle, mods);

        for (const handling of presets[0].handling) {
            ResetHandlingContextMultipier(data.vehicle, handling.field, "pursuitMode");
        }

        ApplyHandlingMultipliers(data.vehicle);

        emit("vrp-vehicles:pursuitMode", false);
    } else {
        ApplyPursuitModifcations(data.vehicle, preset);

        emit("vrp-vehicles:pursuitMode", true, data.pursuitMode, presets.length);
    }

    emit("DoLongHudText", `Pursuit Mode: ${preset.name}`, 1);
}

export function PursuitConfigLoaded() {
    if (!DriverThread.isActive || DriverThread.data.isPursuitVehicle !== true) return;

    const data = DriverThread.data;

    data.pursuitPreset = GetPursuitPresets(data.vehicleModel);

    const preset = data.pursuitPreset[data.pursuitMode];

    if (data.pursuitMode !== 0) {
        ApplyPursuitModifcations(data.vehicle, preset);
    }
}

DriverThread.addHook("preStart", function (this: Thread) {
    this.data.isPursuitVehicle = IsPursuitVehicle(this.data.vehicleModel);
});

DriverThread.addHook("afterStart", function (this: Thread) {
    if (this.data.isPursuitVehicle !== true) return;

    this.data.pursuitPreset = GetPursuitPresets(this.data.vehicleModel);
    this.data.pursuitMode = DecorGetInt(this.data.vehicle, "Vehicle:PursuitMode");
    
    const preset = this.data.pursuitPreset[this.data.pursuitMode];

    if (this.data.pursuitMode !== 0) {
        ApplyPursuitModifcations(this.data.vehicle, preset);
        emit("vrp-vehicles:pursuitMode", true, this.data.pursuitMode, this.data.pursuitPreset.length);
    } else {
        emit("vrp-vehicles:pursuitMode", false);
    }
});

DriverThread.addHook("afterStop", function (this: Thread) {
    if (this.data.isPursuitVehicle !== true) return;

    this.data.isPursuitVehicle = undefined;
    this.data.pursuitPreset = undefined;
    this.data.pursuitMode = undefined;

    emit("vrp-vehicles:pursuitMode", false);
});

RegisterCommand('+pursuitMode', ChangePursuitMode, false);
RegisterCommand('-pursuitMode', () => { }, false);

setImmediate(() => {
    global.exports['vrp-keybinds'].registerKeyMapping('', 'Vehicle', 'Change Pursuit Mode', '+pursuitMode', '-pursuitMode');
});
import { Thread } from "../../classes/thread";
import { GetRandom, GetVehicleExhausts, IsThrottled, PlayEntitySound, Throttle } from "../../utils/tools";
import { ApplyHandlingMultipliers, ResetHandlingContextMultipier, SetHandlingContextMultiplier } from "../systems/handling";
import { GetNitroLevel, VehicleHasNitro } from "../systems/nitro";
import { CurrentSeat, CurrentVehicle, TurnOffEngine } from "../vehicle";
import { DriverThread } from "./driver";

export async function InitNitro(): Promise<void> { };

export const NitroThread = new Thread(async function () { }, 1000, "tick");

export const NitrousConfig = {
    mode: "Boost",
    flowRate: 5,
    blowoutTickThreshold: 15,
    blowoutPercentage: 5,
    blowoutSpeed: 95,
    highBurstSpeed: 15,
    lowBurstSpeed: 100,
    highBurst: 1,
    lowBurst: 0.1
};

NitroThread.addHook("active", function (this: Thread) {
    if (!this.data.driver || --this.data.nitroLevel <= 0) return this.stop();

    const speed = this.data.driver.speed * 2.236936;
    const temp = this.data.driver.temperature;

    if (this.data.mode === "Boost" && speed > NitrousConfig.highBurstSpeed) {
        const burstMode = speed >= NitrousConfig.lowBurstSpeed ? NitrousConfig.lowBurst : NitrousConfig.highBurst;
        const newMultiplier = 1 + burstMode * (NitrousConfig.flowRate * 10) / 100;

        //if (this.data.multiplier !== newMultiplier) {
            this.data.multiplier = newMultiplier;
            SetHandlingContextMultiplier(this.data.vehicle, "fInitialDriveForce", "nitro", "multiplier", newMultiplier, 2);
            ApplyHandlingMultipliers(this.data.vehicle, "fInitialDriveForce");
        //}

        ++this.data.driver.temperature;
    }

    if (speed > NitrousConfig.blowoutSpeed && temp > NitrousConfig.blowoutTickThreshold) {
        const chance = GetRandom(100);
        const pVehicle = this.data.vehicle;
        const pEngineHealth = GetVehicleEngineHealth(pVehicle);
        if (pEngineHealth <= 0 || chance <= NitrousConfig.blowoutPercentage) {
            SetVehicleEngineHealth(pVehicle, 0);
            TurnOffEngine(pVehicle);
            PlayEntitySound(pVehicle, "Engine_fail", "DLC_PILOT_ENGINE_FAILURE_SOUNDS", 1000);
        } else if (chance > 25) {
            SetVehicleEngineHealth(pVehicle, pEngineHealth - 50);
            PlayEntitySound(pVehicle, "Landing_Tone", "DLC_PILOT_ENGINE_FAILURE_SOUNDS", 1000)
        }
    }

    emit("noshud", this.data.nitroLevel, true);

    this.delay = 1500 - NitrousConfig.flowRate * 100;
});

DriverThread.addHook("afterStart", async function (this: Thread) {
    NitroThread.data.driver = this.data;
    NitroThread.data.vehicle = CurrentVehicle;
    NitroThread.data.netId = NetworkGetNetworkIdFromEntity(this.data.vehicle);
    NitroThread.data.exhausts = GetVehicleExhausts(this.data.vehicle);
});

DriverThread.addHook("afterStop", async function (this: Thread) {
    await NitroThread.stop();
    NitroThread.data.driver = null;
    NitroThread.data.vehicle = null;
    NitroThread.data.netId = null;
    NitroThread.data.exhausts = null;
});

NitroThread.addHook("preStart", function (this: Thread) {
    this.data.nitroLevel = GetNitroLevel(this.data.vehicle);

    if (!this.data.vehicle || this.data.nitroLevel <= 0) return this.abort();

    this.data.mode = NitrousConfig.mode;
    this.data.particleId = !this.data.particleId ? 1 : ++this.data.particleId;

    SetVehicleBoostActive(this.data.vehicle, true);

    if (this.data.mode === "Purge") {
        emitNet("fx:purgeL", this.data.particleId, this.data.netId, NitrousConfig.flowRate);
        emitNet("fx:purgeR", this.data.particleId, this.data.netId, NitrousConfig.flowRate);
        emit("fx:purge", this.data.vehicle);
    } else if (this.data.mode === "Boost") {
        emitNet("fx:nitroSound", this.data.particleId, this.data.netId, this.data.exhausts, GetEntityPitch(CurrentVehicle));
        //emit("fx:nitrous", this.data.particleId, this.data.vehicle, this.data.exhausts, GetEntityPitch(CurrentVehicle), NitrousConfig.flowRate);
        emit("fx:nitrous", this.data.vehicle, this.data.exhausts, GetEntityPitch(CurrentVehicle), NitrousConfig.flowRate);
    }

    emit("noshud", this.data.nitroLevel, true);
    emit("vehicles:nitro:started");
});

NitroThread.addHook("preStop", function (this: Thread) {
    this.data.multiplier = null;
    
    const newNitrous = this.data.nitroLevel;

    SetVehicleBoostActive(this.data.vehicle, false);

    ResetHandlingContextMultipier(this.data.vehicle, "fInitialDriveForce", "nitro");
    ApplyHandlingMultipliers(this.data.vehicle, "fInitialDriveForce");

    if (this.data.mode === "Purge") {
        emitNet("fx:stopToggle", this.data.particleId, "purgeL");
        emitNet("fx:stopToggle", this.data.particleId, "purgeR");
        emit("fx:stopToggle", this.data.vehicle);
    } else if (this.data.mode === "Boost") {
        emitNet("fx:stopToggle", this.data.particleId, "nitro");
        emitNet("fx:stopToggle", this.data.particleId, "nitroSound");
        emit("fx:stopToggle", this.data.vehicle);
    }

    emit("vehicles:nitro:stopped");
    emit("noshud", this.data.nitroLevel, false);

    this.data.nitroLevel = false;

    emitNet("vrp:vehicles:nitroUsed", this.data.netId, newNitrous);
});

function useNitroOn() {
    if (!CurrentVehicle || CurrentSeat !== -1 || IsThrottled("nitro")) return;
    NitroThread.start();
}

function useNitroOff() {
    if (!NitroThread.isActive) return;
    NitroThread.stop();
    Throttle("nitro", 150);
}

function toggleNitroMode() {
    if (CurrentSeat !== -1) return;
    
    // if (!VehicleHasNitro(CurrentVehicle)) {
    //     return Object(_0x764638['a'])()
    // }
    
    if (NitroThread.isActive) useNitroOff();
    
    NitrousConfig.mode = NitrousConfig.mode === "Boost" ? "Purge" : "Boost";
    emit("DoLongHudText", "Nitro mode: " + NitrousConfig.mode, 1);
}

function increaseNitroFlow() {
    if (CurrentSeat !== -1 || !VehicleHasNitro(CurrentVehicle)) return;
    NitrousConfig.flowRate + 1 <= 10 ? NitrousConfig.flowRate++ : 10;
    emit("DoLongHudText", "Nitrous flow rate: " + NitrousConfig.flowRate, 1, 12000);
}

function decreaseNitroFlow() {
    if (CurrentSeat !== -1 || !VehicleHasNitro(CurrentVehicle)) return;
    NitrousConfig.flowRate - 1 >= 1 ? NitrousConfig.flowRate-- : 1;
    emit("DoLongHudText", "Nitrous flow rate: " + NitrousConfig.flowRate, 1, 12000);
}

RegisterCommand("+useNitro", useNitroOn, false);
RegisterCommand("-useNitro", useNitroOff, false);
RegisterCommand("+increaseNitroFlow", increaseNitroFlow, false);
RegisterCommand("-increaseNitroFlow", () => { }, false);
RegisterCommand("+decreaseNitroFlow", decreaseNitroFlow, false);
RegisterCommand("-decreaseNitroFlow", () => { }, false);
RegisterCommand("+toggleNitroMode", toggleNitroMode, false);
RegisterCommand("-toggleNitroMode", () => { }, false);

global.exports["vrp-keybinds"].registerKeyMapping("", "Vehicle", "Toggle Nos / Purge Mode", "+toggleNitroMode", "-toggleNitroMode");
global.exports["vrp-keybinds"].registerKeyMapping("", "Vehicle", "Nos Flow Increase", "+increaseNitroFlow", "-increaseNitroFlow");
global.exports["vrp-keybinds"].registerKeyMapping("", "Vehicle", "Nos Flow Decrease", "+decreaseNitroFlow", "-decreaseNitroFlow");
global.exports["vrp-keybinds"].registerKeyMapping("", "Vehicle", "Activate Nos", "+useNitro", "-useNitro", "LSHIFT");
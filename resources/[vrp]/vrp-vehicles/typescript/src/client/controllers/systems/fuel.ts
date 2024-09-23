import { AnimationTask } from "../../classes/animationTask";
import { Thread } from "../../classes/thread";
import { Delay, GetRandom } from "../../utils/tools";
import { TurnPedEntity } from "../../utils/vectors";
import { DriverThread } from "../threads/driver";
import { PassengerThread } from "../threads/passenger";
import { CurrentVehicle, GetVehicleMetadata, TurnOffEngine } from "../vehicle";

export async function InitFuel(): Promise<void> {};

const JERRYCAN_CAPACITY = 35;
const newsHeli = GetHashKey("newsmav");

let fuelConfig = {
    fuelDrainBase: 0.99995,
    heliFuelDrainRate: 5,
    fuelHealthModifier: 500
};

export function GetVehicleFuel(pVehicle: number) {
    const fuel = GetVehicleMetadata(pVehicle, "fuel")
    if (fuel) {
        return fuel;
    } else {
        return 50;
    }
}

export function CurrentFuel() {
    return CurrentVehicle && GetVehicleFuel(CurrentVehicle) || 50;
}

export function SetVehicleFuel(pVehicle: number, pAmount: number) {
    const fuel = Math.floor(pAmount);
    if (fuel > 0) {
        emitNet("vrp:vehicles:reduceFuel", NetworkGetNetworkIdFromEntity(pVehicle), fuel);
    }
}

export async function EmitLowFuelSound() {
    emit("DoLongHudText", "Low fuel", 1);
    for (let i = 1; i < 4; i++) {
        PlaySound(-1, "5_SEC_WARNING", "HUD_MINI_GAME_SOUNDSET", false, 0, true);
        await Delay(150 * i);
    }
}

export function IsDoorOpen(pVehicle: number, pDoor: number) {
    return GetVehicleDoorAngleRatio(pVehicle, pDoor) > 0.1;
}

DriverThread.addHook("preStart", function (this: Thread) {
    this.data.fuelTick = 0;
    this.data.fuelWarningTick = 0;
    this.data.vehicleHealth = 1000;

    const entityModel = GetEntityModel(CurrentVehicle);
    this.data.isHelicopter = IsThisModelAHeli(entityModel);
    this.data.isNewsHelicopter = entityModel === newsHeli;
});

DriverThread.addHook("afterStart", function (this: Thread) {
    this.data.fuel = GetVehicleFuel(CurrentVehicle);
    SetVehicleFuelLevel(this.data.vehicle, this.data.fuel);
});

DriverThread.addHook("active", function (this: Thread) {
    const calc = this.data.vehicleHealth / fuelConfig.fuelHealthModifier;
    let fuelCalc = Math.max(2 - calc, 1);

    if (this.data.isHelicopter && !this.data.isNewsHelicopter) {
        fuelCalc = fuelConfig.heliFuelDrainRate - calc;
    }

    let fuel = this.data.fuel;
    fuel -= fuelConfig.fuelDrainBase * (this.data.speed ^ 2) * fuelCalc / 1000
    this.data.fuel = fuel;

    if (this.data.speed > 5 && IsDoorOpen(CurrentVehicle, 5)) {
        SetVehicleDoorShut(CurrentVehicle, 5, true);
    }

    if (++this.data.fuelTick > 15) {
        this.data.fuelTick = 0;
        SetVehicleFuel(this.data.vehicle, this.data.fuel);
        SetVehicleFuelLevel(this.data.vehicle, this.data.fuel);
        //this.data.vehicleHealth = GetVehicleMetadata(CurrentVehicle, "engine"); //TODO;
    }
});

DriverThread.addHook("active", function (this: Thread) {
    if (++this.data.fuelWarningTick > 45) {
        this.data.fuelWarningTick = 0;
        if (this.data.fuel <= 15) {
            EmitLowFuelSound();
        }
    }

    if (this.data.fuel <= 1) {
        EmitLowFuelSound();
        TurnOffEngine(CurrentVehicle);
    }
});

DriverThread.addHook("afterStop", function (this: Thread) {
    SetVehicleFuel(this.data.vehicle, this.data.fuel);
    this.data.fuel = 0;
    this.data.fuelTick = 0;
    this.data.fuelWarningTick = 0;
});

PassengerThread.addHook("preStart", function (this: Thread) {
    this.data.fuel = GetVehicleFuel(CurrentVehicle);
});

PassengerThread.addHook("active", function (this: Thread) {
    this.data.fuel = GetVehicleFuel(CurrentVehicle);
});

PassengerThread.addHook("afterStop", function (this: Thread) {
    this.data.fuel = 0;
});

export async function GetVehicleRefuelCost(pCurFuel: number, pFuelAmount = 100, pIsHelicopter = false) {
    const { taxLevel: pTaxLevel, fuelPrice: pFuelPrice } = await RPC.execute("vrp:vehicles:getFuelPrice", 1);
    const fuel = pCurFuel || 0;

    let pCalculation = Math.floor((pFuelAmount - fuel) * pFuelPrice * (1 + pTaxLevel / 100));
    
    if (pIsHelicopter) {
        pCalculation = Math.floor(pCalculation * 0.25)
    }

    return [pTaxLevel, pCalculation];
}

export async function RefuelVehicle(pVehicle: number, pCost: number, pIsHeli = false, pIsJerryCan = false, p5?: any) {
    const playerPed = PlayerPedId();
    const pCurFuel = GetVehicleFuel(pVehicle) || 0;
    let pFinalFuel = 100 - pCurFuel;
    let pCalc = pFinalFuel * 500;

    if (pIsJerryCan) {
        pFinalFuel = GetAmmoInPedWeapon(playerPed, 883325847) * 100 / 4500 * JERRYCAN_CAPACITY / 100;
        pCalc = Math.floor(pFinalFuel * 500);
    }

    if (IsThisModelAHeli(GetEntityModel(pVehicle))) pCalc *= 2;

    TaskTurnPedToFaceEntity(playerPed, pVehicle, -1);

    const anim = new AnimationTask(PlayerPedId(), "normal", "Refueling", pCalc, "weapon@w_sp_jerrycan", "fire");

    const result = await anim.start((self: any) => {
        const tick = setInterval(() => {
            if (!anim.active) clearInterval(tick);
            if (IsVehicleEngineOn(pVehicle) && GetRandom(100) > 98) {
                NetworkExplodeVehicle(pVehicle, true, false, false);
                anim.abort();
            }
        }, 2000);
    });

    const currentCash = await RPC.execute("GetCurrentCash");
    if (!currentCash[0]) return emit("DoLongHudText", "You don't have any cash on you.", 2, 12000);
    const pCurCash = currentCash[0].param;

    if (pCurCash < pCost) {
        emit("DoLongHudText", "You can't afford it, you're missing $" + (pCost - pCurCash), 1, 12000);
        return;
    }

    const pAddition = result * pFinalFuel / 100;

    if (pIsJerryCan) {
        const pNewFuelAmmo = Math.floor((pFinalFuel - pAddition) * 100 / 30 * 4500 / 100);
        SetPedAmmo(playerPed, 883325847, pNewFuelAmmo);
    } else {
        //Gotta deduct here, before we add the fuel
        const hasCharged = await RPC.execute("vrp-vehicles:chargeForFuelRefill", pCost);
        if (!hasCharged) {
            emit("DoLongHudText", "Error charging for fuel refill", 1, 12000);
        }
    }

    if (pAddition > 0) {
        const pNetId = NetworkGetNetworkIdFromEntity(pVehicle);
        await RPC.execute("vrp:vehicles:addFuel", pNetId, pAddition, 1, pIsJerryCan, pIsHeli, p5);
        SetVehicleFuelLevel(pVehicle, pCurFuel + pAddition);
    }
}

export function GetJerryCanFuelLevel() {
    return GetAmmoInPedWeapon(PlayerPedId(), 883325847) * 100 / 4500 * JERRYCAN_CAPACITY / 100;
}

export async function RefuelJerryCan(pEntity: number) {
    const playerPed = PlayerPedId();
    const pJerryCanFuel = GetAmmoInPedWeapon(playerPed, 883325847) * 100 / 4500 * JERRYCAN_CAPACITY / 100;
    const pNewJerryCanFuel = JERRYCAN_CAPACITY - pJerryCanFuel;
    const pTime = pNewJerryCanFuel * 800;
    
    await TurnPedEntity(playerPed, pEntity);
    
    const anim = new AnimationTask(PlayerPedId(), "normal", "Refilling Jerry Can", pTime, "weapon@w_sp_jerrycan", "fire");
    const pResult = await anim.start();
    const pFinalJerryCanFuel = pResult * pNewJerryCanFuel / 100;
    
    if (pFinalJerryCanFuel > 0) {
        await RPC.execute("vrp:vehicles:refillJerryCan", pFinalJerryCanFuel);
    }
}


global.exports("CurrentFuel", CurrentFuel);
global.exports("GetVehicleFuel", GetVehicleFuel);
global.exports("SetVehicleFuel", SetVehicleFuel);
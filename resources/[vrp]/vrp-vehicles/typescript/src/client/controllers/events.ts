import * as Vehicle from './vehicle';
import * as Garage from './state/garages';
import * as Appearance from './others/appearance';
import * as Mods from './others/mods';
import { Delay, GetClosestPlayer, GetRandom, loadAnimDict, PlayEntitySound } from '../utils/tools';
import { GetVehicleIdentifier, GiveVehicleKey, HasVehicleKey, IsVinScratched, Keys } from './state/keys';
import { DriverThread } from './threads/driver';
import { PassengerThread } from './threads/passenger';
import { CurrentVehicle, CurrentSeat } from './vehicle';
import { ApplyHandlingMultipliers, ResetHandlingContextMultipier, SetHandlingContextMultiplier } from './systems/handling';
import { DoHarnessDamage, EjectLUL, HasHarnessOn, HasSeatBeltOn, SetHarness, SetSeatBelt } from './systems/harness';
import { Thread } from '../classes/thread';
import { DoRandomDegradation, DoRandomTyreDamage, ShowVehicleDegradation } from './systems/damage';
import { RemoveAllBlips } from '../utils/blips';
import { DoorLockCheck } from './systems/lockpicking';
import { GetJerryCanFuelLevel, GetVehicleFuel, GetVehicleRefuelCost, RefuelVehicle } from './systems/fuel';
import { GetLicensePlate, SetVehicleFakeLicensePlate } from './others/licenseplate';
import { GetNitroLevel, RefillNOSCan, VehicleHasNitro } from './systems/nitro';
import { GetVehicleRatingClass, GetVehicleRatingNumber } from './others/stats';
import { AircraftThread, IsHeliOrPlane } from './threads/aircraft';

export async function InitEvents(): Promise<void> { };

const isDevServer = GetConvar("sv_environment", "prod") === "debug";

if (isDevServer) {
    RegisterCommand("sethandling", (src: number, args: any[], raw: any) => {
        const fieldName = args[0];
        const value = Number(args[1]);
        const pVehicle = CurrentVehicle;
        SetHandlingContextMultiplier(pVehicle, fieldName, "testHandling", "fixed", value, 2); //multiplier
        ApplyHandlingMultipliers(pVehicle);
    }, false);

    TriggerEvent('chat:addSuggestion', '/sethandling', '', [
        { name: "command", help: "{fieldName, fixedValue} (required)" },
    ]);
}

RPC.register('SetVehicleNumberPlateText', (pNetId: number, pPlate: string) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return SetVehicleNumberPlateText(pVehicle, pPlate);
    }
});

RPC.register('GetVehicleMod', (pNetId: number, pMod: string) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Mods.GetMod(pVehicle, pMod);
    }
});

RPC.register('GetVehicleMods', (pNetId: number) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Mods.GetMods(pVehicle);
    }
});

RPC.register('SetVehicleMod', (pNetId: number, pMod: string, pValue: number) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Mods.SetMod(pVehicle, pMod, pValue);
    }
});

RPC.register('SetVehicleMods', (pNetId: number, pData: any) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Mods.SetMods(pVehicle, pData);
    }
});

RPC.register('GetVehicleColor', (pNetId: number, pType: string) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Appearance.GetVehicleColor(pVehicle, pType);
    }
});

RPC.register('SetVehicleColor', (pNetId: number, pType: string, pData: any) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Appearance.SetVehicleColor(pVehicle, pType, pData);
    }
});

RPC.register('SetVehicleColors', (pNetId: number, pData: any) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Appearance.SetVehicleColors(pVehicle, pData);
    }
});

RPC.register('GetVehicleAdditional', (pNetId: number, pType: string) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Appearance.GetVehicleAdditional(pVehicle, pType);
    }
});

RPC.register('SetVehicleAdditional', (pNetId: number, pType: string, pData: any) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Appearance.SetVehicleAdditional(pVehicle, pType, pData);
    }
});

RPC.register('GetVehicleAppearance', (pNetId: number) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Appearance.GetVehicleAppearance(pVehicle);
    }
});

RPC.register('SetVehicleAppearance', (pNetId: number, pData: any) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Appearance.SetVehicleAppearance(pVehicle, pData);
    }
});

RPC.register('FetchVehicleDamage', (pNetId: number) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Appearance.FetchVehicleDamage(pVehicle);
    }
});

RPC.register('RestoreVehicleDamage', (pNetId: number, pData: any) => {
    const pVehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (DoesEntityExist(pVehicle)) {
        return Appearance.RestoreVehicleDamage(pVehicle, pData);
    }
});

RPC.register('GetVehicleClassFromName', (pName: any) => {
    const _0x3bd9ea = typeof pName === "string" ? GetHashKey(pName) : pName;
    return GetVehicleClassFromName(_0x3bd9ea);
});

RPC.register('GetVehicleName', (pModel: any) => {
    const _0x3ee8d0 = typeof pModel === "string" ? GetHashKey(pModel) : pModel;
    return GetLabelText(GetDisplayNameFromVehicleModel(_0x3ee8d0));
});

onNet('vrp:vehicles:setKeys', (pKeys: string[]) => {
    if (!pKeys) return;
    Keys.clear();
    pKeys.forEach((key) => Keys.add(key));
    Garage.ClearGarageVehicleCache(null, true);
});

onNet('vrp:vehicles:clearKeys', () => {
    Keys.clear();
    Garage.ClearGarageVehicleCache(null, true);
});

onNet('vrp:vehicles:addKey', (pVIN: string) => {
    if (!Keys.has(pVIN)) Keys.add(pVIN);
    Garage.ClearGarageVehicleCache(null, true);
});

onNet('vrp:vehicles:removeKey', (pVIN: string) => {
    if (Keys.has(pVIN)) Keys.delete(pVIN);
    Garage.ClearGarageVehicleCache(null, true);
});

onNet('vrp:vehicles:addSharedKeys', (pVINs: string[]) => {
    pVINs.forEach((vin) => {
        if (!Keys.has(vin)) Keys.add(vin);
    });
    Garage.ClearGarageVehicleCache(null, true);
});

onNet('vrp:vehicles:removeSharedKeys', (pVINs: string[]) => {
    pVINs.forEach((vin) => {
        if (Keys.has(vin)) Keys.delete(vin);
    });
    Garage.ClearGarageVehicleCache(null, true);
});

onNet('vehicle:keys:give', async (pVehicle?: number) => {
    const playerPed = PlayerPedId();
    let vehicle = 0;
    if (pVehicle === undefined || pVehicle === null || pVehicle === 0 || !isNaN(pVehicle)) {
        if (GetVehiclePedIsIn(playerPed, false) !== 0) {
            vehicle = GetVehiclePedIsIn(playerPed, false);
        } else {
            vehicle = Number(global.exports['vrp-target'].GetCurrentEntity());
        }
    } else {
        vehicle = Number(pVehicle);
    }

    if (!HasVehicleKey(vehicle)) {
        emit('DoLongHudText', "No keys for target vehicle!", 2);
        return
    }

    const entityCoords: any = GetEntityCoords(vehicle, false)
    const pedCoords: any = GetEntityCoords(playerPed, false)
    const distance = GetDistanceBetweenCoords(entityCoords.x, entityCoords.y, entityCoords.z, pedCoords.x, pedCoords.y, pedCoords.z, true)
    if (Number(distance) > 5) {
        emit('DoLongHudText', "You are to far away from the vehicle!", 2);
        return;
    }

    if (IsPedInAnyVehicle(playerPed, false)) {
        const currentVehicle = vehicle ? vehicle : GetVehiclePedIsIn(playerPed, false);
        const vehicleSeats = GetVehicleModelNumberOfSeats(GetEntityModel(currentVehicle));

        for (let i = -1; i < vehicleSeats - 1; i += 1) {
            const ped = GetPedInVehicleSeat(currentVehicle, i);

            if (ped && ped !== playerPed) {
                RPC.execute("vrp:vehicles:giveKey", GetPlayerServerId(NetworkGetPlayerIndexFromPed(ped)), GetVehicleNumberPlateText(currentVehicle));
            }
        }
    } else {
        const [t, distance] = global.exports["vrp-vehicles"].GetClosestPlayer()

        if (Number(distance) !== -1 && Number(distance) < 5) {
            let result = await RPC.execute("vrp:vehicles:giveKey", GetPlayerServerId(t), GetVehicleNumberPlateText(vehicle))
            if (!result) return emit("DoLongHudText", "Error giving keys!", 2);
            emit("DoLongHudText", "You just gave keys to your vehicles!", 1)
        } else {
            emit("DoLongHudText", "No player near you!", 2)
        }
    }
})

onNet('vehicle:keys:addNew', (pVehicle: number) => {
    const netId = NetworkGetNetworkIdFromEntity(pVehicle);
    if (DoesEntityExist(pVehicle) && netId !== 0) {
        const model = GetEntityModel(pVehicle);
        emitNet('vrp:vehicles:gotKeys', netId, model);
    }

    SetVehRadioStation(Number(pVehicle), "OFF");
    SetVehicleDoorsLocked(Number(pVehicle), 1);
});

onNet('vehicle:toggleEngine', (pVehicle?: number) => {
    const vehicle = pVehicle ? pVehicle : GetVehiclePedIsIn(PlayerPedId(), false);
    const engineState = IsVehicleEngineOn(vehicle);

    if (engineState) {
        Vehicle.TurnOffEngine(vehicle);
    } else {
        Vehicle.TurnOnEngine(vehicle);
    }
})

onNet('vehicle:startEngine', (pVehicle?: number) => {
    const vehicle = pVehicle ? Number(pVehicle) : GetVehiclePedIsIn(PlayerPedId(), false);
    Vehicle.TurnOnEngine(vehicle);
})

onNet('vehicle:haltEngine', (pVehicle?: number) => {
    const vehicle = pVehicle ? Number(pVehicle) : GetVehiclePedIsIn(PlayerPedId(), false);
    Vehicle.TurnOffEngine(vehicle);
})

onNet('vehicle:giveKey', (pArgs: any, pVehicle?: number) => {
    const vehicle = pVehicle ? pVehicle : global.exports["vrp-target"].GetCurrentEntity();
    const playerPed = PlayerPedId();
    if (IsPedInAnyVehicle(playerPed, false)) {
        const currentVehicle = vehicle ? vehicle : GetVehiclePedIsIn(playerPed, false);
        const vehicleSeats = GetVehicleModelNumberOfSeats(GetEntityModel(currentVehicle));
        for (let i = -1; i < vehicleSeats - 1; i += 1) {
            const ped = GetPedInVehicleSeat(currentVehicle, i);
            if (ped && ped !== playerPed) GiveVehicleKey(currentVehicle, GetPlayerServerId(NetworkGetPlayerIndexFromPed(ped)));
        }
    } else {
        const [player, distance] = GetClosestPlayer();
        if (player && distance <= 5) {
            if (vehicle && vehicle !== 0) {
                GiveVehicleKey(vehicle, GetPlayerServerId(player));
            } else emit("DoLongHudText", "Vehicle not found!", 2);
        } else {
            emit("DoLongHudText", "No player near you!", 2);
        }
    }
})

onNet('vrp-admin:vehicle:giveKeys', (pNetId: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const serverId = GetPlayerServerId(PlayerId());
    GiveVehicleKey(vehicle, serverId);
})

onNet('vehicle:refuel:showMenu', (p1: any, pEntity: number, pContext: string) => {
    const fuelLevel = GetVehicleFuelLevel(pEntity);
    let fuelCost = (100 - fuelLevel);
    if (fuelCost < 0) {
        fuelCost = 0;
    }

    if (fuelLevel >= 100) {
        return emit("DoLongHudText", "Vehicle is already full!", 2);
    }

    fuelCost = fuelCost + (fuelCost * 0.1);
    fuelCost = Math.ceil(fuelCost);

    const menuData = [
        {
            title: "Gas Station",
            description: `The total cost is going to be $${fuelCost}, including 10% in taxes.`,
            action: "vehicle:refuel:handler",
            key: { entity: pEntity, cost: fuelCost },
        },
    ];
    global.exports["vrp-ui"].showContextMenu(menuData);
});

onNet('vehicle:checkVIN', async (pContext: PeekContext, pEntity: number) => {
    if (DoesEntityExist(pEntity)) {
        const vin = GetVehicleIdentifier(pEntity);
        if (vin) {
            const trimmedPlate = GetVehicleNumberPlateText(pEntity).trim();
            const licensePlate = await GetLicensePlate(vin);
            const formatedVin = vin.slice(1, 2);
            const isVinScratched = IsVinScratched(vin);

            if (!vin.startsWith("3")) {
                return emit("chatMessage", "DISPATCH", 2, "The plate does match the VIN! (" + formatedVin + ')', "feed", false);
            }

            if (isVinScratched) {
                emit("chatMessage", "DISPATCH", 2, "The VIN is scratched off.", "feed", false);
            } else {
                if (!licensePlate.hasVehicleInfo || licensePlate.hasVehicleInfo && licensePlate.licensePlate === trimmedPlate) {
                    emit("chatMessage", "DISPATCH", 2, "The plate does match the VIN! (" + formatedVin + ')', "feed", false);
                } else if (licensePlate.hasVehicleInfo && licensePlate.licensePlate !== trimmedPlate) {
                    emit("chatMessage", "DISPATCH", 3, "The plate does not match the VIN! The original license plate is " + licensePlate.licensePlate, "feed", false);
                }
            }
        } else {
            emit("chatMessage", "DISPATCH", 3, "Can't find anything on this vehicle, not good. Report this to the Government", "feed", false);
        }
    }
});

onNet('vehicle:addFakePlate', async (pArgs: any, pVehicle: number) => {
    const vin = GetVehicleIdentifier(pVehicle);
    if (!vin.startsWith("3")) {
        return emit("DoLongHudText", "Can't apply fake plates to local cars.", 2);
    }
    SetVehicleFakeLicensePlate(pVehicle, true);
});

onNet('vehicle:removeFakePlate', async (pArgs: any, pVehicle: number) => {
    SetVehicleFakeLicensePlate(pVehicle, false);
});

onNet('vehicle:storeVehicle', (pArgs: never, pVehicle?: number) => {
    Garage.StoreVehicleInGarage(pVehicle!);
});

onNet('vehicle:garageVehicleList', (pArgs: any) => {
    Garage.OpenGarageVehicleList(pArgs.nearby, pArgs.radius, pArgs?.useRadius ?? false, pArgs?.garageId ?? null);
});

onNet('vrp:vehicles:sell', async (pStateId: number, pPrice: number) => {
    const vin = Vehicle.GetCurrentVehicleIdentifier();
    if (vin && Keys.has(vin)) {
        RPC.execute('vrp:vehicles:sell', vin, pStateId, pPrice);
    }
    else {
        return emit('DoLongHudText', 'No keys for target vehicle!', 2);
    }
});

onNet('vrp:vehicles:sellPhone', (pVin: string, pStateId: number, pPrice: number) => {
    if (pVin && Keys.has(pVin)) {
        RPC.execute("vrp:vehicles:sellPhone", pVin, pStateId, pPrice);
    } else {
        return emit("DoLongHudText", "No keys for target vehicle!", 2);
    }
});

RPC.register('vrp:vehicles:getCurrentVehicleIdentifier', () => {
    return Vehicle.GetCurrentVehicleIdentifier();
});

on('vehicle:addNos', (size: string) => {
    const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);
    const netId = NetworkGetNetworkIdFromEntity(vehicle);
    const vehicleModel = GetEntityModel(vehicle);
    const vehicleClass = GetVehicleClass(vehicle);
    const vin = GetVehicleIdentifier(vehicle) || false;

    if (vehicleClass === 18) return;

    if (IsThisModelACar(vehicleModel) || IsThisModelABike(vehicleModel) || IsThisModelAQuadbike(vehicleModel)) {
        if (vin) {
            if (vin.startsWith("3")) {
                return emitNet("vrp:vehicles:addNitro", netId, size);
            } else {
                return emit("DoLongHudText", "You can only put nos inside a personal vehicle.", 2);
            }
        }
    }
});

on('vehicle:addHarness', (size: string) => {
    const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);
    const netId = NetworkGetNetworkIdFromEntity(vehicle);
    const vin = GetVehicleIdentifier(vehicle) || false;

    if (vin) {
        if (vin.startsWith("3")) {
            emit("harness", false, 100)
            emit("inventory:removeItem","harness", 1)
            emit("DoLongHudText","Harness installed.",1)
            return emitNet("vrp:vehicles:addHarness", netId, size);
        } else {
            return emit("DoLongHudText", "You can only put a harness inside a personal vehicle.", 2);
        }
    }
});

onNet('vehicle:refuel:showMenu', async (pArgs: any, pEntity: number) => {
    const isJerryCan = pArgs.isJerryCan;
    const fuelLevel = isJerryCan ? GetJerryCanFuelLevel() : GetVehicleFuel(pEntity);
    const isHelicopter = GetVehicleClass(pEntity) === 15;

    const [taxLevel, pCost] = await GetVehicleRefuelCost(fuelLevel, isJerryCan ? 35 : 100, isHelicopter);

    global.exports["vrp-ui"].showContextMenu([{
        title: "Gas Station",
        description: `The total cost is going to be $${pCost}, including ${taxLevel}% in taxes.`,
        action: "vehicle:refuel:handler",
        key: { pEntity, pCost, isJerryCan, isHelicopter }
    }]);
});

onNet('vehicle:refuel:jerryCan', async (pContext: PeekContext, pEntity: number) => {
    if (pEntity) {
        RefuelVehicle(pEntity, 0, false, true);
    }
});

onNet('vrp-vehicles:bustGarageCacheOpen', () => {
    Garage.ClearGarageVehicleCache(null, true);
});

let EntryAttempt: any;

onNet('baseevents:enteringVehicle', (pVehicle: number, pSeat: number, pClass: number) => {
    if (pSeat === -1 || pSeat === 0) {
        if (EntryAttempt) clearTimeout(EntryAttempt);

        EntryAttempt = setTimeout(() => {
            const playerPed = PlayerPedId();

            const isNetworkPed = NetworkGetEntityIsNetworked(pVehicle);
            const isDoorOpen = GetVehicleDoorAngleRatio(pVehicle, pSeat + 1) > 0.1;
            const isStill = IsPedStill(playerPed);

            if (!isNetworkPed || (!isStill && (isDoorOpen || pClass === 8 || pClass === 13))) {
                TaskWarpPedIntoVehicle(playerPed, pVehicle, pSeat);
            }

            EntryAttempt = undefined;
        }, 2000);
    }

    if (pSeat == -1 && pVehicle) {
        DoorLockCheck(pVehicle);

        const hasDriver = IsVehicleSeatFree(pVehicle, -1) !== true;

        if (hasDriver) return;

        Vehicle.VerifyEngineState(pVehicle);
    }

    SetVehicleCanEngineOperateOnFire(pVehicle, false);
});

onNet('baseevents:enteringAborted', () => {
    if (!EntryAttempt) return;

    const timeout = EntryAttempt;

    EntryAttempt = undefined;

    clearTimeout(timeout);
});

onNet('baseevents:enteredVehicle', (currentVehicle: number, currentSeat: number) => {
    Vehicle.GenerateVehicleInformation(currentVehicle);
    Vehicle.UpdateCurrentVehicle();

    const vehicleClass = GetVehicleClass(currentVehicle);
    if (vehicleClass === 18) SetVehicleRadioEnabled(currentVehicle, false);

    if (currentSeat === -1) Vehicle.VerifyEngineState(currentVehicle);

    if (IsHeliOrPlane(currentVehicle)) AircraftThread.start();

    const vehicleModel = GetEntityModel(currentVehicle);

    if (vehicleModel == GetHashKey('taxi')) {
        emit('taximeter:enteredTaxi');
    }

    if (!EntryAttempt) return;

    clearTimeout(EntryAttempt);

    if (VehicleHasNitro(currentVehicle)) {
        emit("noshud", GetNitroLevel(currentVehicle), false);
    }

    const engineHealth = GetVehicleEngineHealth(currentVehicle);
    const bodyHealth = GetVehicleBodyHealth(currentVehicle);

    if (engineHealth < 150 || bodyHealth < 100) {
        Vehicle.TurnOffEngine(currentVehicle, true);
    }
});

onNet('baseevents:leftVehicle', (currentVehicle: number, currentSeat: number) => {
    stalled = false;
    Vehicle.UpdateCurrentVehicle();

    SetHarness(false);
    SetSeatBelt(false);

    if (IsHeliOrPlane(currentVehicle)) AircraftThread.stop();

    if (GetEntityModel(currentVehicle) == GetHashKey('taxi')) {
        emit('taximeter:ExitedTaxi');
    }

    if (currentSeat === -1 && DriverThread.isActive) {
        DriverThread.stop();
    } else if (PassengerThread.isActive) {
        PassengerThread.stop();
    }
});

onNet('baseevents:vehicleEngineOn', (currentVehicle: number, currentSeat: number) => {
    if (currentSeat === -1 && !DriverThread.isActive) {
        DriverThread.start();
    } else if (CurrentSeat !== -1 && !PassengerThread.isActive) {
        PassengerThread.start();
    }
});

onNet('baseevents:vehicleEngineOff', (currentVehicle: number, currentSeat: number) => {
    if (currentSeat === -1 && DriverThread.isActive) {
        DriverThread.stop();
    } else if (CurrentSeat !== -1 && PassengerThread.isActive) {
        PassengerThread.stop();
    }
});

onNet('baseevents:vehicleChangedSeat', (currentVehicle: number, currentSeat: number, previousSeat: number) => {
    Vehicle.UpdateCurrentVehicle();

    SetHarness(false);
    SetSeatBelt(false);

    if (currentSeat === -1 && !DriverThread.isActive) {
        DriverThread.start();
    } else if (currentSeat !== -1 && !PassengerThread.isActive) {
        PassengerThread.start();
    }

    if (previousSeat === -1 && DriverThread.isActive) {
        DriverThread.stop();
    } else if (currentSeat === -1 && previousSeat !== -1 && PassengerThread.isActive) {
        PassengerThread.stop();
    }
});

export let stalled = false;

DriverThread.addHook("active", async function (this: Thread) {
    if (stalled) {
        Vehicle.TurnOffEngine(this.data.vehicle, true);
        await Delay(1000);
        PlayEntitySound(this.data.vehicle, "Landing_Tone", "DLC_PILOT_ENGINE_FAILURE_SOUNDS", 1000);
        await Delay(1000);
        PlayEntitySound(this.data.vehicle, "Landing_Tone", "DLC_PILOT_ENGINE_FAILURE_SOUNDS", 1000);
        stalled = false;
    }
});

DriverThread.addHook("afterStart", function (this: Thread) {
    const vehicleModel = GetEntityModel(this.data.vehicle);
    const vehicleClass = GetVehicleClass(this.data.vehicle);

    const pdBike = GetHashKey("npolmm");

    if (vehicleClass === 8 || vehicleModel === pdBike) {
        let fSteeringLock = GetVehicleHandlingFloat(this.data.vehicle, "CHandlingData", "fSteeringLock");
        fSteeringLock = Math.ceil((fSteeringLock * 0.6)) + 0.1;
        SetHandlingContextMultiplier(this.data.vehicle, "fSteeringLock", "bikes", "fixed", fSteeringLock, 3);
        ApplyHandlingMultipliers(this.data.vehicle, "fSteeringLock");
    }
});

onNet('baseevents:vehicleCrashed', async (currentVehicle: number, currentSeat: number, currentSpeed: number, previousSpeed: number, pVelocity: Vector3, impactDamage: number, heavyImpact: boolean, lightImpact: boolean) => {
    const wasJump = pVelocity.z <= -25;
    const prevCompedCurrent = previousSpeed - currentSpeed;
    let engineDamage = 0.0;

    if (heavyImpact) {
        DoRandomDegradation(currentVehicle); //Remove "2, true" when not testing // currentVehicle, 2, true
        let beltChange: number = 0;

        engineDamage = Math.floor(50 + impactDamage + previousSpeed * 4.5);
        if (impactDamage > 40) {
            if (impactDamage > 100) {
                impactDamage = 100;
            }
            beltChange = HasSeatBeltOn ? Math.floor(impactDamage / 2) : impactDamage;
        }

        const ejectLUL = beltChange ? GetRandom(100) < beltChange : false;

        if (ejectLUL && HasHarnessOn) {
            DoHarnessDamage(1);
        } else if (ejectLUL && !wasJump) {
            EjectLUL(currentVehicle, pVelocity);
        }
        if (currentSeat === -1 && !wasJump) {
            const fuelTankDmg = prevCompedCurrent * impactDamage * 10;
            Vehicle.FuelTankDamage(currentVehicle, fuelTankDmg);
        }
    }

    if (currentSeat !== -1) return;

    const stallChance = GetRandom(50);
    if (stallChance < 25) {
        // stalled = true;
    }

    const engineHealth = GetVehicleEngineHealth(currentVehicle);
    const bodyHealth = GetVehicleBodyHealth(currentVehicle);
    const speedDamage = prevCompedCurrent * 4;

    let damage = engineHealth - engineDamage;

    if (isNaN(damage)) return;

    if (damage < 150 || bodyHealth < 100) {
        damage = 150.0;
        Vehicle.TurnOffEngine(currentVehicle, true);
    }

    SetVehicleEngineHealth(currentVehicle, damage);

    if (speedDamage < 5 || (isNaN(engineDamage) && GetRandom(0, 1) !== 1)) return;

    const wheels = GetVehicleNumberOfWheels(currentVehicle);

    for (let i = 0; i < wheels; i += 1) {
        DoRandomTyreDamage(currentVehicle, i, wasJump ? 500 : speedDamage, wasJump ? 1000 : undefined);
    }
});

RPC.register('vrp:vehicles:getWaterHeight', () => {
    const [x, y, z] = GetEntityCoords(PlayerPedId(), false);
    return TestVerticalProbeAgainstAllWater(x, y, z, 32, -1);
});

RPC.register('vrp:vehicles:isModelFlyable', (pModel: string | number) => {
    const isHeli = IsThisModelAHeli(pModel);
    const isPlane = IsThisModelAPlane(pModel);
    return isHeli || isPlane;
});

RPC.register('vrp:vehicles:completeSpawn', (pNetId: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);

    if (!vehicle) return;

    const playerPed = PlayerPedId();
    const interior = GetInteriorFromEntity(playerPed);
    const roomHash = GetRoomKeyFromEntity(playerPed);

    SetVehicleOnGroundProperly(vehicle);
    emit("vrp-vehicles:spawnedVehicle", vehicle);

    if (!interior || !roomHash) return;

    ForceRoomForEntity(vehicle, interior, roomHash);
});

RPC.register('vrp:vehicles:getVehicleModelMetadata', (pNetId: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);

    if (!vehicle) return;

    const availableUpgrades = [];

    if (GetNumVehicleMods(vehicle, 11) > 0) availableUpgrades.push("Engine");
    if (GetNumVehicleMods(vehicle, 12) > 0) availableUpgrades.push("Brakes");
    if (GetNumVehicleMods(vehicle, 13) > 0) availableUpgrades.push("Transmission");
    if (GetNumVehicleMods(vehicle, 15) > 0) availableUpgrades.push("Suspension");
    if (GetNumVehicleMods(vehicle, 18) > -1) availableUpgrades.push("Turbo");

    return {
        class: GetVehicleRatingClass(vehicle),
        availableUpgrades: availableUpgrades
    };
});

on('vrp:vehicles:examineVehicle', async (p1: any, pEntity: number, pContext: PeekContext) => {
    const isAllowed = global.exports["vrp-business"].IsEmployedAt("hayes_autos")
        || global.exports["vrp-business"].IsEmployedAt("harmony_autos")
        || global.exports["vrp-business"].IsEmployedAt("tuner");

    // const hasEnough = global.exports["vrp-inventory"].hasEnoughOfItem("advrepairkit", 1, false);

    // if (!hasEnough) {
    //     return emit("DoLongHudText", "I cannot examine the vehicle right now.", 2);
    // }

    ShowVehicleDegradation(pEntity, isAllowed);
});

on('vrp-vehicles:client:refillNoS', () => {
    return RefillNOSCan(100);
});

onNet('vrp-vehicles:giveNitrous', () => {
    emit("player:receiveItem", "nitrous", 1, false, {}, JSON.stringify({ Status: "Empty" }));
});

on("onResourceStop", (resource: string) => {
    if (resource !== GetCurrentResourceName()) return;
    RemoveAllBlips();
})

RegisterCommand("perfrating", () => {
    const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);
    if (vehicle === 0) return;

    console.log(`Class: ${GetVehicleRatingClass(vehicle)} | Rating: ${GetVehicleRatingNumber(vehicle)}`);
}, false);
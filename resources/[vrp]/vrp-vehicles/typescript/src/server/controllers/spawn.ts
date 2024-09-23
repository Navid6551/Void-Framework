//import { GetEntityForwardCoords } from '../utils/tools';
import { GenerateIdentificationNumber, GetDecryptedVIN } from './vin';
import { AddKey } from './state/keys';
import { Delay, GetRandom } from '../utils/tools';
import { Repository } from './database/repository';
import { GetStateBag } from '../../shared/controllers/statebags';
import { FetchVehicleInfo } from './state/vehicle'; //AddVehicleInfo, FetchVehicleInfo, HasVehicleInfo
import { AddSpawnedVehicle } from './state/spawnedvehicles';

export function InitSpawn(): void { };

export const GlobalVehicles = new Map<number, Set<number>>();

export async function GetVehicleClass(pSource: number, pModel: string | number): Promise<number> {
    return await RPC.execute('GetVehicleClassFromName', pSource, pModel);
}

export function GetVehicleType(pClass: number): string {
    switch (pClass) {
        case 14: {
            return 'boats';
        }
        case 15: {
            return 'helicopters';
        }
        case 16: {
            return 'planes';
        }
        default: {
            return 'land';
        }
    }
}

function GetVehicleDefaultGarage(pClass: number): string {
    switch (pClass) {
        case 14: {
            return 'boats_a';
        }
        case 15: {
            return 'air_a';
        }
        case 16: {
            return 'air_a';
        }
        default: {
            return 'garage_alta';
        }
    }
}

export function GetDefaultSpawnData(): VehicleMetadata {
    return { fuel: GetRandom(35, 100), mileage: 0, harness: 0, nitro: 0, carPolish: 0, fakePlate: false, neonDisabled: false, handling: {}, afterMarkets: {}, wheelFitment: {}, carBombData: {} };
}

export function GetDefaultDegradation(): VehicleDegradation {
    return {
        axle: 100,
        brakes: 100,
        clutch: 100,
        electronics: 100,
        injector: 100,
        radiator: 100,
        tyres: 100,
        engine: 100,
        body: 100,
        transmission: 100
    };
}

export function GetDefaultDamage() {
    return {
        body: 1000.0,
        engine: 1000.0,
        dirt: 5,
        doors: [],
        wheels: [],
        windows: []
    }
}

export function GeneratePlateNumber(): string {
    let plate = '';

    for (let i = 0; i < 8; i += 1) {
        const entry = GetRandom(50) >= 25 ? String.fromCharCode(GetRandom(65, 90)) : GetRandom(0, 9);
        plate += entry;
    }

    return plate.toUpperCase();
}

export async function DoesPlateExist(pPlate: string): Promise<Boolean> {
    return Repository.doesPlateExist(pPlate);
}

export async function CreateLicensePlate(): Promise<string> {
    let plate = GeneratePlateNumber();

    while (await DoesPlateExist(plate)) {
        plate = GeneratePlateNumber();
        await Delay(10);
    }

    return plate;
}

export async function GenerateVehicleInfo(
    pSource: number,
    pCharacterId: number,
    pModel: string,
    pType = 'script',
    pOrigin = 'menu',
    pVIN?: string,
    pName?: string,
    pSize?: number,
    pOptions?: any,
    pPlate?: string,
): Promise<Vehicle> {
    const modelHash = GetHashKey(pModel);
    const vehicleClass = await GetVehicleClass(pSource, pModel);

    const cid = pCharacterId;
    const vin = pVIN ? pVIN : GenerateIdentificationNumber(pType, pOrigin, vehicleClass, modelHash);
    const model = pModel;
    const state = 'stored';
    const garage = GetVehicleDefaultGarage(vehicleClass);
    const plate = pPlate ? pPlate : GeneratePlateNumber(); //await CreateLicensePlate();
    const name = pName; //Repository.getVehicleModelName(pModel) || pName;
    const type = GetVehicleType(vehicleClass);
    const size = pSize ? pSize : 2;
    const degradation = pOptions?.degradation ? pOptions.degradation : GetDefaultDegradation();
    const data = pOptions?.metadata ? pOptions.metadata : GetDefaultSpawnData();
    const damage = pOptions?.damage ? pOptions.damage : GetDefaultDamage();
    const mods = pOptions?.mods ? pOptions.mods : {};
    const appearance = pOptions?.appearance ? pOptions.appearance : { colors: { primary: 0, secondary: 0, pearlescent: 0 } };
    const records: any = [];

    return {
        cid,
        vin,
        model,
        state,
        garage,
        plate: plate.padEnd(8),
        name,
        type,
        size,
        degradation,
        metadata: data,
        damage,
        mods,
        appearance,
        records,
        vinScratched: false,
        strikes: 0,
        wheelfitmment: ""
    };
}

export async function GetVehicleAppearance(pNetId: number, pHandle?: number): Promise<any> {
    const handle = pHandle ? pHandle : NetworkGetEntityFromNetworkId(pNetId);
    const owner = NetworkGetEntityOwner(handle);
    if (handle && owner) {
        return RPC.execute('GetVehicleAppearance', owner, pNetId);
    }
}

export async function GetVehicleMods(pNetId: number, pHandle?: number): Promise<any> {
    const handle = pHandle ? pHandle : NetworkGetEntityFromNetworkId(pNetId);
    const owner = NetworkGetEntityOwner(handle);
    if (handle && owner) {
        return RPC.execute('GetVehicleMods', owner, pNetId);
    }
}

export async function GetSpawnInfo(pVehicle: number, pSource?: number): Promise<any> {
    const stateBag = Entity(Number(pVehicle));
    const owner = !pSource ? NetworkGetEntityOwner(pVehicle) : pSource;
    const netId = NetworkGetNetworkIdFromEntity(pVehicle);

    const mods = RPC.execute("GetVehicleMods", owner, netId);
    const damage = RPC.execute("FetchVehicleDamage", owner, netId);
    const appearance = RPC.execute("GetVehicleAppearance", owner, netId);

    const [vehicleMods, vehicleDamage, vehicleAppearance] = await Promise.all([mods, damage, appearance]);

    let vehicleVin = stateBag.state.vin;
    let vehicleData = stateBag.state.data;

    if (!vehicleData) {
        vehicleData = GetDefaultSpawnData();
    }

    let vehicleDegradataion = stateBag.state.degradation;

    if (!vehicleDegradataion) {
        vehicleDegradataion = GetDefaultDegradation();
    }

    return {
        vin: vehicleVin,
        appearance: vehicleAppearance,
        mods: vehicleMods,
        damage: vehicleDamage,
        metadata: vehicleData,
        degradation: vehicleDegradataion,
    };
}

export async function SetVehicleInfo(pVehicle: number, pInfo: VehicleInfo): Promise<{ vehicle: number, stateBag: EntityInterface, owner: number, netId: number }> {
    const vehicle = pVehicle;
    const stateBag = Entity(vehicle);
    const owner = NetworkGetEntityOwner(vehicle);
    const netId = NetworkGetNetworkIdFromEntity(vehicle);

    if (pInfo.damage) {
        await RPC.execute("RestoreVehicleDamage", owner, netId, pInfo.damage);
    }

    if (pInfo.appearance) {
        await RPC.execute("SetVehicleAppearance", owner, netId, pInfo.appearance);
    }

    if (pInfo.mods) {
        await RPC.execute("SetVehicleMods", owner, netId, pInfo.mods);
    }

    if (pInfo.plate || pInfo.metadata?.fakePlate) {
        await RPC.execute(
            "SetVehicleNumberPlateText",
            owner,
            netId,
            pInfo.metadata?.fakePlate ? pInfo.metadata.fakePlate : pInfo.plate,
        );
    }

    if (pInfo.metadata?.wheelFitment) {
        emitNet("vrp-wheelfitment_cl:applySavedWheelFitment", owner, pInfo.metadata?.wheelFitment, netId);
    }

    stateBag.state.vin = pInfo.vin;
    stateBag.state.vinScratched = pInfo.vinScratched || 0;
    stateBag.state.data = pInfo.metadata || GetDefaultSpawnData();
    stateBag.state.degradation = pInfo.degradation || GetDefaultDegradation();

    return { vehicle, stateBag, owner, netId };
}

export async function SpawnVehicle(
    pSource: number,
    pModel: string,
    pCoords: number[],
    pHeading = 0.0,
    pVIN: string,
    pPlate?: string,
    pApp?: any,
    pMods?: any,
    pData?: VehicleMetadata,
    pDamage?: VehicleDamage,
    pDegradation?: VehicleDegradation,
    pNetworked = true,
): Promise<any> {
    //console.log("SpawnVehicle", pModel, pCoords, pHeading, pVIN, pPlate, pApp, pMods, pData, pDamage, pDegradation, pNetworked);
    const model = typeof pModel !== 'number' ? GetHashKey(pModel) : pModel;
    const [hasWater] = await RPC.execute<[boolean]>("vrp:vehicles:getWaterHeight", pSource);

    const safeZ = hasWater ? pCoords[2] : pCoords[2] - 25.0;

    const vehicle = CreateVehicle(model, pCoords[0], pCoords[1], safeZ, pHeading, pNetworked, false);

    //console.log("SpawnVehicle", vehicle);

    TriggerEvent("vrp-supression:bypass", vehicle);

    const info: VehicleInfo = {
        vin: pVIN,
        model: pModel,
        plate: pPlate,
        metadata: pData,
        mods: pMods,
        damage: pDamage,
        appearance: pApp,
        degradation: pDegradation,
        vinScratched: false,
    };

    let doesExist = false;

    for (let i = 0; i < 1000; i++) {
        if (DoesEntityExist(vehicle)) {
            doesExist = true;
            break;
        }
        await Delay(100);
    }

    if (!doesExist) return;

    const spawnData = await SetVehicleInfo(vehicle, info);

    SetEntityCoords(vehicle, pCoords[0], pCoords[1], pCoords[2], false, false, false, false);

    AddKey(pSource, pVIN);

    RPC.execute("vrp:vehicles:completeSpawn", pSource, spawnData.netId);

    return spawnData;
}

export async function BasicSpawn(
    pSource: number,
    pModel: string,
    pCoords?: Vector3,
    pHeading?: number,
    pOrigin = 'menu',
    pLivery?: number,
    pAppearance?: any,
    pMods?: any,
): Promise<any> {
    //console.log("BasicSpawn", pSource, pModel, pCoords, pHeading, pOrigin, pLivery, pAppearance, pMods);

    const model = typeof pModel === 'string' ? GetHashKey(pModel) : pModel;

    const appearance: any = pAppearance ? pAppearance : { colors: {}, tint: 0 };
    const mods: any = pMods ? pMods : { Engine: 3, Brakes: 2, Transmission: 2, Suspension: 3, Armor: 4 };

    switch (pModel) {
        case 'police': {
            appearance.colors.primary = 0;
            appearance.colors.pearlescent = 0;
            appearance.wheelType = 2;
            mods.FrontWheels = 10;
        }
    }

    if (pLivery) {
        appearance.livery = pLivery;
    }

    const playerPed = GetPlayerPed(pSource.toString());
    const coords = pCoords ? [pCoords.x, pCoords.y, pCoords.z] : GetEntityCoords(playerPed); // GetEntityForwardCoords(playerPed, 3.0);
    const heading = pHeading ? pHeading : GetEntityHeading(playerPed);

    const vehicleClass = await GetVehicleClass(pSource, model);
    const vin = await GenerateIdentificationNumber("", pOrigin, vehicleClass, model);

    return await SpawnVehicle(pSource, pModel, coords, heading, vin, undefined, appearance, mods);
}

export async function SpawnVehicleByInfo(
    pSource: number,
    pInfo: VehicleInfo,
    pCoords: Vector3,
    pHeading: number,
): Promise<any> {
    const { x, y, z } = pCoords;
    return SpawnVehicle(
        pSource,
        pInfo.model,
        [x, y, z],
        pHeading,
        pInfo.vin,
        pInfo.plate,
        pInfo.appearance,
        pInfo.mods,
        pInfo.metadata,
        pInfo.damage,
        pInfo.degradation,
    );
}

export async function SpawnPlayerVehicle(
    pSource: number,
    pVIN: string,
    pCoords: number[],
    pHeading: number, //?
    pUnique?: boolean,
): Promise<{ success: boolean; netId: number }> {
    const vehicle: any = await FetchVehicleInfo(pVIN, true);

    if (!vehicle || (pUnique && vehicle.state === 'out')) return false as any;

    //if (!HasVehicleInfo(pVIN)) AddVehicleInfo(vehicle);

    //const heading = typeof pHeading !== "number" ? GetEntityHeading(GetPlayerPed(pSource.toString())) : pHeading;

    const spawnData = await SpawnVehicle(
        pSource,
        vehicle.model,
        pCoords,
        pHeading,
        vehicle.vin,
        vehicle.plate,
        vehicle.appearance,
        vehicle.mods,
        vehicle.metadata,
        vehicle.damage,
        vehicle.degradation,
    );

    if (pUnique) vehicle.state = 'out';

    AddSpawnedVehicle(vehicle.vin, spawnData.netId, { x: pCoords[0], y: pCoords[1], z: pCoords[2] });

    return { success: spawnData?.netId !== 0, netId: spawnData.netId };
}

export function AddGlobalVehicle(pNetId: number, pPassenger?: number): void {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);

    if (!vehicle) return;

    if (!GlobalVehicles.has(pNetId)) {
        GlobalVehicles.set(pNetId, new Set<number>());
        SetEntityDistanceCullingRadius(vehicle, 6969.0);
    }

    if (pPassenger) {
        GlobalVehicles.get(pNetId)?.add(pPassenger);
        SetEntityDistanceCullingRadius(vehicle, 6969.0);
    }
}

export function RemoveGlobalVehicle(pNetId: number, pPassenger?: number): void {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);

    if (!vehicle || !GlobalVehicles.has(pNetId)) return;

    const players = GlobalVehicles.get(pNetId);

    if (pPassenger) {
        players?.delete(pPassenger);
        SetEntityDistanceCullingRadius(GetPlayerPed(pPassenger.toString()), 420.0);
    }

    if (players?.size === 0) {
        GlobalVehicles.delete(pNetId);
        SetEntityDistanceCullingRadius(vehicle, 420.0);
    }
}
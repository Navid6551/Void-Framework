import { GetDefaultDamage, GetDefaultDegradation, GetDefaultSpawnData, GetVehicleClass } from "../spawn";
import { GenerateIdentificationNumber } from "../vin";

export async function InitVehicle(): Promise<void> { };

export function UpdateVehicleMetadata<T = unknown>(pVin: string, pNetId: number, pType: string, pValue: T) {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag) {
        const metaData = bag.state.data;

        if (metaData) {
            metaData[pType] = pValue;

            bag.state.data = {
                fuel: metaData.fuel,
                mileage: metaData.mileage,
                harness: metaData.harness,
                nitro: metaData.nitro,
                carPolish: metaData.carPolish,
                fakePlate: metaData.fakePlate,
                neonDisabled: metaData.neonDisabled,
                handling: metaData.handling,
                afterMarkets: metaData.afterMarkets,
                wheelFitment: metaData.wheelFitment
            };

            if (pVin && bag.state.vin) { //Idk pVin?
                SQL.execute("UPDATE _vehicle SET metadata = ? WHERE vin = ?", [JSON.stringify(metaData), pVin]);
            }
        }
    } //TODO; Return result
}

export function GenerateMetadata(pNetId: number) {
    const ent = Entity(NetworkGetEntityFromNetworkId(Number(pNetId)));
    ent.state.data = GetDefaultSpawnData();
}

export async function GenerateVehicleInformation(pSource: number, pVehicle: number, pModel: number) {
    const ent = Entity(Number(pVehicle));

    if (ent) {
        if (!ent.state.vin) {
            const vehicleClass = await GetVehicleClass(pSource, pModel);
            ent.state.vin = GenerateIdentificationNumber("world", "pdm", vehicleClass, pModel);
        }
        if (!ent.state.vinScratched) {
            ent.state.vinScratched = false;
        }
        if (!ent.state.data) {
            ent.state.data = GetDefaultSpawnData();
        }
        if (!ent.state.degradation) {
            ent.state.degradation = GetDefaultDegradation();
        }
        if (!ent.state.damage) {
            ent.state.damage = GetDefaultDamage();
        }

        return {
            vin: ent.state.vin
        };
    }
}

export function AddCarBomb(pNetId: number, pMinSpeed: number, pTicksBeforeExplode: number, pTicksForRemoval: number, pGridSize: number, pColoredSquares: number, pTimeToComplete: number) {
    const ent = Entity(NetworkGetEntityFromNetworkId(Number(pNetId)));
    if (!ent) return;

    if (!ent.state.data) {
        GenerateMetadata(pNetId);

        const newEnt = Entity(NetworkGetEntityFromNetworkId(Number(pNetId)));

        const metaData = newEnt.state.data;

        metaData.carBombData = {
            minSpeed: pMinSpeed,
            ticksBeforeExplode: pTicksBeforeExplode,
            ticksForRemoval: pTicksForRemoval,
            gridSize: pGridSize,
            coloredSquares: pColoredSquares,
            timeToComplete: pTimeToComplete
        }

        ent.state.data = {
            fuel: metaData.fuel,
            mileage: metaData.mileage,
            harness: metaData.harness,
            nitro: metaData.nitro,
            neonDisabled: metaData.neonDisabled,
            handling: metaData.handling,
            afterMarkets: metaData.afterMarkets,
            carBombData: {
                minSpeed: pMinSpeed,
                ticksBeforeExplode: pTicksBeforeExplode,
                ticksForRemoval: pTicksForRemoval,
                gridSize: pGridSize,
                coloredSquares: pColoredSquares,
                timeToComplete: pTimeToComplete
            }
        }

        return true;
    } else {
        const metaData = ent.state.data;

        metaData.carBombData = {
            minSpeed: pMinSpeed,
            ticksBeforeExplode: pTicksBeforeExplode,
            ticksForRemoval: pTicksForRemoval,
            gridSize: pGridSize,
            coloredSquares: pColoredSquares,
            timeToComplete: pTimeToComplete
        }

        ent.state.data = {
            fuel: metaData.fuel,
            mileage: metaData.mileage,
            harness: metaData.harness,
            nitro: metaData.nitro,
            neonDisabled: metaData.neonDisabled,
            handling: metaData.handling,
            afterMarkets: metaData.afterMarkets,
            carBombData: {
                minSpeed: pMinSpeed,
                ticksBeforeExplode: pTicksBeforeExplode,
                ticksForRemoval: pTicksForRemoval,
                gridSize: pGridSize,
                coloredSquares: pColoredSquares,
                timeToComplete: pTimeToComplete
            }
        }

        return true;
    }

    return false;
}

export async function FetchVehicleInfo(pVin: string, pBool?: boolean) {
    const vehicle = await SQL.execute<VehicleInfo>("SELECT * FROM _vehicle WHERE vin = @vin", {
        vin: pVin
    });

    if (vehicle[0]) {
        return {
            vin: vehicle[0].vin,
            model: vehicle[0].model,
            plate: vehicle[0].plate,
            degradation: JSON.parse(vehicle[0].degradation),
            metadata: JSON.parse(vehicle[0].metadata),
            damage: JSON.parse(vehicle[0].damage),
            mods: JSON.parse(vehicle[0].mods),
            appearance: JSON.parse(vehicle[0].appearance),
            vinScratched: vehicle[0].vinScratched,
        };
    }

    return false;
}

export async function IsVehicleFullyUpgraded(pSource: number, pVin: string, pHandle: number) {
    //TODO: Make so it also checks locals, and not just personal vehicles

    const vehicle = await SQL.execute<VehicleInfo>("SELECT * FROM _vehicle WHERE vin = @vin", {
        vin: pVin
    });

    if (vehicle[0]) {
        //Is personal
        const mods = JSON.parse(vehicle[0].mods);
        if (!mods) return false;

        if (mods.Engine === 3 && mods.Brakes === 3 && mods.Transmission === 3 && mods.Turbo === 1) {
            return true;
        }

        return false;
    } else {
        //Is a local
        if (!DoesEntityExist(Number(pHandle))) return false;
        const netId = NetworkGetNetworkIdFromEntity(pHandle);
        const mods = RPC.execute<{ Engine: number, Brakes: number, Transmission: number, Turbo: number }>("GetVehicleMods", pSource, netId);
        if (!mods) return false;

        if (mods.Engine === 3 && mods.Brakes === 3 && mods.Transmission === 3 && mods.Turbo === 1) {
            return true;
        }

        return false;
    }
}

export async function IsVehicleVinScratched(pHandle: number) { //TODO: Just grab 
    if (!DoesEntityExist(Number(pHandle))) return false;
    const ent = Entity(Number(pHandle));
    if (!ent.state) return false;
    const state = ent.state;
    const result = state.vinScratched ? state.vinScratched : false;
    return result;
}
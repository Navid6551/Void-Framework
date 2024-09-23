import { Repository } from '../database/repository';
import { GetSpawnInfo } from '../spawn';
const QBCore = globalThis.exports['vrp-core'].GetCoreObject()

export async function StoreVehicleInGarage(pSource: number, pVehicle: number, pGarage: string) {
    const spawnInfo = await GetSpawnInfo(pVehicle);
    if (!spawnInfo) return;

    if (spawnInfo.vin) {
        const result = await SQL.execute("UPDATE _vehicle SET state = @state, degradation = @degradation, metadata = @metadata, damage = @damage, mods = @mods, appearance = @appearance, garage = @garage WHERE vin = @vin", {
            state: "stored",
            degradation: JSON.stringify(spawnInfo.degradation),
            metadata: JSON.stringify(spawnInfo.metadata),
            damage: JSON.stringify(spawnInfo.damage),
            mods: JSON.stringify(spawnInfo.mods),
            appearance: JSON.stringify(spawnInfo.appearance),
            garage: pGarage,
            vin: spawnInfo.vin
        });

        if (!result) return;

        const user = QBCore.Functions.GetPlayer(pSource);
        if (!user) return;

        const result2 = await Repository.addParkingLog({
            vin: spawnInfo.vin,
            cid: user.PlayerData.citizenid,
            action: "stored",
            engine: spawnInfo.damage.engine,
            body: spawnInfo.damage.body,
            fuel: spawnInfo.metadata.fuel,
            garage: pGarage
        });

        if (!result2) return;

        DeleteEntity(pVehicle);

        return true;
    }
}

RPC.register("vrp:vehicles:getPlayerVehicles", async (pSource: number, pCid: number, pGarage: string) => {
    const data = await SQL.execute("SELECT * FROM _vehicle WHERE cid = @cid AND garage = @garage AND NOT state = @state", {
        cid: pCid,
        garage: pGarage,
        state: "out"
    })

    if (!data) return [];

    return data
});

RPC.register("vrp:vehicles:getAllPlayerVehicles", async (pSource: number, pCid: number) => {
    const data = await SQL.execute("SELECT * FROM _vehicle WHERE cid = @cid", {
        cid: pCid
    })

    if (!data) return [];

    return data
});

RPC.register("vrp:vehicles:getPlayerVehiclesByCharacterId", async (pSource: number, pCid: number) => {
    const data = await SQL.execute("SELECT * FROM _vehicle WHERE cid = @cid", {
        cid: pCid
    })

    if (!data) return [];

    return data
});

RPC.register("vrp:vehicles:getGarages", async () => {
    const garages = await SQL.execute<GarageInfoMap[]>("SELECT * FROM _garage");

    if (!garages) return [];

    const mappedGarages = garages.map((garage) => {
        return {
            garage_id: garage.garage_id,
            name: garage.name,
            type: garage.type,
            business_id: garage.business_id,
            shared: garage.shared,
            parking_limit: garage.parking_limit,
            location: JSON.parse(garage.location || "{}"),
            vehicle_types: JSON.parse(garage.vehicle_types || "[]"),
            parking_spots: JSON.parse(garage.parking_spots || "[]")
        }
    });

    return mappedGarages;
});
import { Base } from "../utils/vpx";
import { Repository } from "./database/repository";
import { BasicSpawn, GenerateVehicleInfo, GetVehicleMods, SpawnPlayerVehicle } from "./spawn";
import { AddKey, GetVehicleIdentifier, vehicleKeys } from "./state/keys";
import { FetchVehicleInfo, IsVehicleFullyUpgraded, IsVehicleVinScratched, UpdateVehicleMetadata } from "./state/vehicle";
import { SetVehicleDegradation } from "./systems/damage";
const QBCore = globalThis.exports['vrp-core'].GetCoreObject()
export async function InitExports(): Promise<void> { };

RPC.register('vrp:vehicles:getKeys', async(pSource: any) => {
    const Player = QBCore.Functions.GetPlayer(pSource)

    return vehicleKeys.filter((pItem: any) => pItem.cid === Player.PlayerData.citizenid)
})

global.exports("BasicSpawn", BasicSpawn);
global.exports("SpawnPlayerVehicle", SpawnPlayerVehicle);
global.exports("GenerateVehicleInfo", GenerateVehicleInfo);
global.exports("FetchVehicleInfo", FetchVehicleInfo);
global.exports("IsVehicleFullyUpgraded", IsVehicleFullyUpgraded);
global.exports("IsVehicleVinScratched", IsVehicleVinScratched);
global.exports("AddKey", AddKey);
global.exports("GetVehicleIdentifier", GetVehicleIdentifier);
global.exports("UpdateVehicleMetadata", UpdateVehicleMetadata);
global.exports("GetVehicleMods", GetVehicleMods);
global.exports("SetVehicleDegradation", SetVehicleDegradation);

global.exports("AddPersonalVehicle", async (pSource: number, pModel: string, pType: VehicleType, pOrigin: VehicleOrigin) => {
    const user = QBCore.Functions.GetPlayer(pSource);
    if (!user) return;

    const vehicleInfo = await GenerateVehicleInfo(pSource, user.PlayerData.citizenid, pModel, pType, pOrigin);
    if (!vehicleInfo) return;
    const result = await Repository.addVehicle(vehicleInfo);
    if (!result) return;

    return vehicleInfo.vin;
});
const QBCore = globalThis.exports['vrp-core'].GetCoreObject()
export const vehicleKeys: any = []

export function AddKey(pSource: number, pVIN: string) {
    const Player = QBCore.Functions.GetPlayer(pSource)
    vehicleKeys.push({
        cid: Player.PlayerData.citizenid,
        vin: pVIN
    })
    emitNet("vrp:vehicles:addKey", pSource, pVIN);
}

export function GetVehicleIdentifier(pNetId: number, pHandle? :number) {
    const vehicle = pHandle ? pHandle : NetworkGetEntityFromNetworkId(pNetId);
    if (!DoesEntityExist(Number(vehicle))) return false;
    const ent = Entity(Number(vehicle));
    if (!ent.state) return false;
    const state = ent.state;
    const result = state.vin ? state.vin : false;
    return result;
}
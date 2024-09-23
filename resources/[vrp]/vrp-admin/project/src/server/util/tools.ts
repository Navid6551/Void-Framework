import { QBCore } from "server/server";

export async function getHexId(pSource: number) {
    return QBCore.Functions.GetIdentifier(pSource, 'steam');
}

export async function hexIdToSteamId(pHexId: string) {
    return global.exports['vrp-core'].HexIdToSteamId(pHexId);
}
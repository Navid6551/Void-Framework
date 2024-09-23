import { GetVehicleMetadata } from "../vehicle";

export async function InitAfterMarkets(): Promise<void> {};

function GetVehicleAfterMarket(pVehicle: number, pValue?: string) {
    const afterMarkets = GetVehicleMetadata(pVehicle, "afterMarkets");
    if (afterMarkets) {
        if (pValue) {
            return afterMarkets[pValue] ?? null;
        } else {
            return afterMarkets;
        }
    }
    return null;
}

global.exports("GetVehicleAfterMarket", GetVehicleAfterMarket);
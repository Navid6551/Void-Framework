import { GetVehicleMetadata } from "../vehicle";

export async function InitWheelfitment(): Promise<void> {};

function GetVehicleWheelFitment(pVehicle: number) {
    return GetVehicleMetadata(pVehicle, "wheelFitment");
}

global.exports("GetVehicleWheelFitment", GetVehicleWheelFitment);
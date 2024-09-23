import * as Spawn from "../spawn";
import * as Vehicle from "../state/vehicle";

export async function SetVehicleFakeLicensePlate(pSource: number, pNetId: number, pSetFakeLicensePlate: boolean) {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag) {
        const metaData = bag.state.data;

        if (metaData) {
            if (pSetFakeLicensePlate) {
                const fakePlate = Spawn.GeneratePlateNumber();

                Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "fakePlate", fakePlate);

                await RPC.execute(
                    "SetVehicleNumberPlateText",
                    pSource,
                    pNetId,
                    fakePlate,
                );

                return true;
            } else {
                if (bag.state.vin) {
                    Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "fakePlate", false);

                    const vehicleInfo = await Vehicle.FetchVehicleInfo(bag.state.vin);

                    if (vehicleInfo) {
                        if (vehicleInfo.plate) {
                            await RPC.execute(
                                "SetVehicleNumberPlateText",
                                pSource,
                                pNetId,
                                vehicleInfo.plate,
                            );

                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
    }
}

export async function GetLicensePlate(pVin: string) {
    const vehicleInfo = await Vehicle.FetchVehicleInfo(pVin);

    if (vehicleInfo) {
        return {
            hasVehicleInfo: true,
            licensePlate: vehicleInfo.plate
        }
    } else {
        return {
            hasVehicleInfo: false,
            licensePlate: null
        }
    }
}
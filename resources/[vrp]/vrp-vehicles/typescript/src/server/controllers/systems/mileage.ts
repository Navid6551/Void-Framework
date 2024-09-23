import * as Vehicle from "../state/vehicle";
import * as Spawn from "../spawn";

export function GetVehicleMileage(pVehicle: number) {
    const bag = Entity(Number(pVehicle));
    return bag.state?.data?.mileage ? bag.state?.data?.mileage : 0;
}

export async function AddVehicleMileage(pNetId: number, pAmount: number) {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag) {
        let mileage = GetVehicleMileage(vehicle);
        const metaData = bag.state.data;

        if (metaData) {
            const newMileage = mileage += pAmount;

            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "mileage", newMileage);
        } else {
            bag.state.data = Spawn.GetDefaultSpawnData();
        }
    }
}
import * as Vehicle from "../state/vehicle";

export async function AddVehicleCarPolish(pNetId: number, pDays: number) {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag) {
        const metaData = bag.state.data;

        const carPolishExpiry = Math.floor(Date.now() / 1000) + (pDays * 86400);

        if (metaData) {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "carPolish", carPolishExpiry);
        }
    }
}

export async function RemoveVehicleCarPolish(pNetId: number) {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag) {
        const metaData = bag.state.data;

        if (metaData) {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "carPolish", 0);
        }
    }
}
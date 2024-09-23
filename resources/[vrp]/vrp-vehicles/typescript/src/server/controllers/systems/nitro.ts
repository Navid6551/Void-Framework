import * as Vehicle from "../state/vehicle";

export async function AddVehicleNitrous(pNetId: number, pSize: string) {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag) {
        const metaData = bag.state.data;

        if (metaData) {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "nitro", 100);
        }
    }
}

export async function NitroUsed(pNetId: number, pAmount: number) {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag) {
        const metaData = bag.state.data;

        if (metaData) {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "nitro", pAmount);
        }
    }
}
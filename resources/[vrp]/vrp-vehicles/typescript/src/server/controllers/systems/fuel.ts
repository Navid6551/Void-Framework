import * as Vehicle from "../state/vehicle";

export async function InitFuel(): Promise<void> { };

export function SetVehicleFuel(pNetId: number, pAmount: number): void {
    const bag = Entity(NetworkGetEntityFromNetworkId(Number(pNetId)));
    if (!bag) return;

    const metaData = bag.state.data;

    if (metaData) {
        if (pAmount < 0) {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "fuel", 0);
        } else {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "fuel", pAmount);
        }
    }
}

export async function AddVehicleFuel(pNetId: number, pAmount: number): Promise<void> {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(vehicle);
    if (!bag) return;

    const metaData = bag.state.data;

    if (metaData) {
        const fuel = metaData.fuel;
        const newFuel = fuel + pAmount;

        Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "fuel", newFuel);
    }
}
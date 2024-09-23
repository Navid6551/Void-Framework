import * as Vehicle from "../state/vehicle";

export async function AddVehicleHarness(pNetId: number, pSize: string) {
    //Should we allow local cars to have harnesses?
    //Only allow harnesses on cars with turbos?
    //Update db vehicle metadata when adding harnesses and nos?

    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag) {
        const metaData = bag.state.data;

        if (metaData) {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "harness", 3);
        }
    }
}

export async function DoHarnessDamage(pNetId: number, pAmount: number) {
    const bag = Entity(NetworkGetEntityFromNetworkId(Number(pNetId)));
    if (!bag) return;

    const metaData = bag.state.data;

    if (metaData) {
        const curDur = metaData.harness;
        const newDur = curDur - pAmount;

        if (newDur < 0) {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "harness", 0);
        } else {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "harness", newDur);
        }
    }
}
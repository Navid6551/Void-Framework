import * as Vehicle from "../state/vehicle";
export async function SaveVehicleWheelFitment(pVin: string, pNetId: number, pChanged: any) {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag) {
        const metaData = bag.state.data;

        if (metaData) {
            Vehicle.UpdateVehicleMetadata(bag.state.vin, pNetId, "wheelFitment", pChanged);
        }
    }
}
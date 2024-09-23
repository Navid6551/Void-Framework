import { Thread } from "../../classes/thread";
import { CurrentSeat, CurrentVehicle } from "../vehicle";

export async function InitAircraft(): Promise<void> { };

export function IsHeliOrPlane(pVehicle: number) {
    const vehicleClass = GetVehicleClass(pVehicle);
    return vehicleClass === 15 || vehicleClass === 16;
}

export const AircraftThread = new Thread(async function (this: Thread) {
    this.data.bodyHealth = GetVehicleBodyHealth(this.data.vehicle);
    this.data.bodyHealth <= 100 && SetVehicleBodyHealth(this.data.vehicle, 120);
}, 100);

AircraftThread.addHook("preStart", function () {
    this.data.vehicle = CurrentVehicle;
    this.data.seat = CurrentSeat;
    this.data.isAircraft = IsHeliOrPlane(this.data.vehicle);
    if (this.data.isAircraft !== true) {
        return this.abort();
    }
});
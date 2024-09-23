import { Thread } from "../../classes/thread";
import { DriverThread } from "../threads/driver";
import { GetVehicleMetadata } from "../vehicle";
import { DoRandomDegradation } from "./damage";

export async function InitMileage(): Promise<void> { };

export function GetVehicleMileage(pVehicle: number) {
    const mileage = GetVehicleMetadata(pVehicle, "mileage");
    if (mileage) {
        return mileage || 0;
    } else {
        return 0;
    }
}

export function SetVehicleMileage(pVehicle: number, pAmount: number) {
    const curMileage = GetVehicleMileage(pVehicle);
    const newMileage = pAmount - curMileage;
    if (newMileage <= 0) return;
    DoRandomDegradation(pVehicle, newMileage / 10 * 2, true);
    TriggerServerEvent("vrp:vehicles:addMileage", NetworkGetNetworkIdFromEntity(pVehicle), newMileage);
}

DriverThread.addHook("preStart", function (this: Thread) {
    this.data.mileageTick = 0;
    this.data.mileage = GetVehicleMileage(this.data.vehicle);
    this.data.speedCount = 0;
    this.data.averageSpeed = 0;
});

DriverThread.addHook("active", function (this: Thread) {
    this.data.speedCount += this.data.speed;
    if (++this.data.mileageTick < 30) return;
    this.data.averageSpeed = this.data.speedCount / 30 * 2.236936;
    this.data.mileageTick = 0;
    this.data.speedCount = 0;
    if (this.data.averageSpeed <= 0) return;
    this.data.mileage += this.data.averageSpeed * 0.00833;
});

DriverThread.addHook("preStop", function (this: Thread) {
    SetVehicleMileage(this.data.vehicle, this.data.mileage);
});

DriverThread.addHook("afterStop", function (this: Thread) {
    this.data.mileage = 0;
    this.data.mileageTick = 0;
    this.data.speedCount = 0;
    this.data.averageSpeed = 0;
});
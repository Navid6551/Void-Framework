import { Thread } from "../../classes/thread";
import { CurrentVehicle, GenerateVehicleInformation, TurnOffEngine, VerifyEngineState } from "../vehicle";

export async function InitDriver(): Promise<void> { };

DecorRegister("Vehicle:Temperature", 3);
DecorRegister("PLAYER_VEHICLE", 3);

export const DriverThread = new Thread(async function (this: Thread) {
    this.data.health = GetVehicleEngineHealth(this.data.vehicle);
    this.data.bodyHealth = GetVehicleBodyHealth(this.data.vehicle);
    this.data.speed = GetEntitySpeed(this.data.vehicle);

    await VerifyEngineState(this.data.vehicle);

    if (this.data.health <= 0 || this.data.bodyHealth <= 50) {
        TurnOffEngine(this.data.vehicle);
    }

    if (this.data.temperature > 0 && ++this.data.temperatureTick >= 2) {
        this.data.temperatureTick = 0;
        --this.data.temperature
    }
}, 1000);

DriverThread.addHook("preStart", function (this: Thread) {
    if (!VerifyEngineState(CurrentVehicle)) this.abort();
    DecorSetInt(CurrentVehicle, "PLAYER_VEHICLE", 1);

    this.data.vehicle = CurrentVehicle;
    this.data.netId = NetworkGetNetworkIdFromEntity(CurrentVehicle);
    this.data.hasLicense = true;
    this.data.vehicleModel = GetEntityModel(this.data.vehicle);
    this.data.vehicleClass = GetVehicleClass(this.data.vehicle);

    this.data.temperatureTick = 0;
    this.data.temperature = DecorGetInt(this.data.vehicle, "Vehicle:Temperature") || 0;

    GenerateVehicleInformation(this.data.vehicle);
});

DriverThread.addHook("preStop", function (this: Thread) {
    DecorSetInt(this.data.vehicle, "Vehicle:Temperature", this.data.temperature);
});

DriverThread.addHook("afterStop", function (this: Thread) {
    emit("noshud", 0, false);
});
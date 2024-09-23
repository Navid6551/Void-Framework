import { Thread } from "../../classes/thread";
import { taskBar } from "../../utils/tools";
import { DriverThread } from "../threads/driver";
import { CurrentSeat, CurrentVehicle, GetVehicleMetadata, InVehicle } from "../vehicle";

export let HasSeatBeltOn = false;
export let HasHarnessOn = false;

export async function InitHarness(): Promise<void> { }

export function VehicleHasHarness(pVehicle: number): boolean {
    const harness = GetVehicleMetadata(pVehicle, "harness");
    return harness ? harness > 0 : false;
}

export function GetHarnessLevel(pVehicle: number): number {
    const harness = GetVehicleMetadata(pVehicle, "harness");
    return typeof harness === "number" ? harness : 0;
}

export function DoHarnessDamage(pAmount: number): void {
    const netId = NetworkGetNetworkIdFromEntity(CurrentVehicle);
    if (!netId) return;

    emitNet("vrp:vehicles:DoHarnessDamage", netId, pAmount);
}

global.exports("GetHarnessLevel", GetHarnessLevel);
global.exports("VehicleHasHarness", VehicleHasHarness);

export function SetSeatBelt(pOn: boolean): void {
    if (pOn && !InVehicle) return;

    HasSeatBeltOn = pOn;

    emit("seatbelt", pOn);
}

export function SetHarness(pOn: boolean): void {
    if (pOn && (!InVehicle || !VehicleHasHarness(CurrentVehicle))) return;

    HasHarnessOn = pOn;

    emit("harness", pOn, GetHarnessLevel(CurrentVehicle));
}

global.exports("SetSeatBelt", SetSeatBelt);
global.exports("SetHarness", SetHarness);

DriverThread.addHook("preStart", function (this: Thread) {
    this.data.harnessTick = 0;
    this.data.harnessLevel = GetHarnessLevel(this.data.vehicle);
});

DriverThread.addHook("active", function (this: Thread) {
    if (++this.data.harnessTick < 3) return;

    this.data.harnessTick = 0;

    this.data.harnessLevel = GetHarnessLevel(this.data.vehicle);

    if (this.data.harnessLevel <= 0 && HasHarnessOn) {
        SetHarness(false);
    }
});

DriverThread.addHook("afterStop", function (this: Thread) {
    this.data.harnessTick = 0;
});

export function EjectLUL(pVehicle: number, pVelocity: Vector3): void {
    const playerPed = PlayerPedId();
    const [x, y, z] = GetOffsetFromEntityInWorldCoords(pVehicle, 1, 0, 1);

    SetEntityCoords(playerPed, x, y, z, false, false, false, false);
    SetPedToRagdoll(playerPed, 5511, 5511, 0, false, false, false);
    SetEntityVelocity(playerPed, pVelocity.x, pVelocity.y, pVelocity.z);

    const calc = Math.round(GetEntitySpeed(playerPed) * 1.5);
    const newHealth = GetEntityHealth(playerPed) - calc;

    //global.exports["ragdoll"].SetPlayerHealth(newHealth >= 0 ? newHealth : 0);
    SetEntityHealth(playerPed, newHealth >= 0 ? newHealth : 0);
}

RegisterCommand("+toggleSeatbelt", async () => {
    if (!InVehicle) return;

    const hasHarness = VehicleHasHarness(CurrentVehicle);
    const isDriver = CurrentSeat === -1;

    if (!HasHarnessOn && hasHarness && isDriver) {
        const finished = await taskBar(5000, "Putting on Harness");
        if (finished !== 100) return;

        SetHarness(true);
        SetSeatBelt(true);

        emit("InteractSound_CL:PlayOnOne", "seatbelt", 0.7);
    } else {
        if (HasHarnessOn) {
            const finished = await taskBar(1000, "Taking off Harness");
            if (finished !== 100) return;

            SetHarness(false);
            SetSeatBelt(false);

            emit("InteractSound_CL:PlayOnOne", "seatbeltoff", 0.7);
        } else {
            if (!HasSeatBeltOn && !hasHarness) {
                SetSeatBelt(true);
                emit("InteractSound_CL:PlayOnOne", "seatbelt", 0.7);
            } else if (HasSeatBeltOn && !hasHarness) {
                SetSeatBelt(false);
                emit("InteractSound_CL:PlayOnOne", "seatbeltoff", 0.7);
            }
        }
    }
}, false);

RegisterCommand("-toggleSeatbelt", () => { }, false);

global.exports["vrp-keybinds"].registerKeyMapping("", "Vehicle", "Seatbelt Toggle", "+toggleSeatbelt", "-toggleSeatbelt", "B");
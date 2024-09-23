import { AnimationTask } from "../../classes/animationTask";
import { Thread } from "../../classes/thread";
import { DriverThread } from "../threads/driver";
import { GetVehicleMetadata } from "../vehicle";

export async function InitCarPolish(): Promise<void> { };

export function GetVehicleCarPolish(pVehicle: number) {
    const carPolish = GetVehicleMetadata(pVehicle, "carPolish");
    return typeof carPolish === "number" ? carPolish : 0;
}

global.exports("GetVehicleCarPolish", GetVehicleCarPolish);

export function HasCarPolish(pVehicle: number) {
    const carPolish = GetVehicleMetadata(pVehicle, "carPolish");
    return typeof carPolish === "number" && carPolish >= 0;
}

export async function ApplyCarPolish(pNetId: number, pItemId: string, pDays: number) {
    const pEntity = NetworkGetEntityFromNetworkId(pNetId);
    if (!pEntity) return;
    
    const anim = new AnimationTask(PlayerPedId(), "normal", "Waxing vehicle", pDays + 20 * 1000, "WORLD_HUMAN_MAID_CLEAN", null);
    const finished = await anim.start();
    
    if (finished == 100) {
        SetVehicleDirtLevel(pEntity, 0);
        RemoveDecalsFromVehicle(pEntity);
        
        emitNet("vrp:vehicles:addCarPolish", pNetId, pDays);
        TriggerEvent("inventory:removeItem", pItemId, 1);
    }
}

export const HasCarPolishExpired = (pUnix: number) => {
    return Math.round(Date.now() / 1000) > pUnix;
}

DriverThread.addHook("afterStart", function (this: Thread) {
    this.data.carCleanTick = 0;
    this.data.hasCarPolish = HasCarPolish(this.data.vehicle);

    if (this.data.hasCarPolish) {
        this.data.carPolishExpires = GetVehicleCarPolish(this.data.vehicle);
    }
});

DriverThread.addHook("active", function (this: Thread) {
    if (this.data.hasCarPolish && ++this.data.carCleanTick > 60) {
        this.data.carCleanTick = 0;
        
        if (GetVehicleDirtLevel(this.data.vehicle) > 0 && !HasCarPolishExpired(this.data.carPolishExpires)) {
            SetVehicleDirtLevel(this.data.vehicle, 0);
            RemoveDecalsFromVehicle(this.data.vehicle);
        }
    }
});

DriverThread.addHook("afterStop", function (this: Thread) {
    if (HasCarPolish(this.data.vehicle) && HasCarPolishExpired(this.data.carPolishExpires)) {
        emitNet("vrp:vehicles:removeCarPolish", this.data.netId);
    }
});
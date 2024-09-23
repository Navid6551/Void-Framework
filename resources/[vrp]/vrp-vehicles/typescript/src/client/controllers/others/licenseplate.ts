import { AnimationTask } from "../../classes/animationTask";

export async function InitLicensePlate(): Promise<void> {};

export async function GetLicensePlate(pVIN: string): Promise<any> {
    if (pVIN) {
        const result = await RPC.execute("vrp:vehicles:getLicensePlate", pVIN);
        return result;
    }
}

export async function SetVehicleFakeLicensePlate(pVehicle: number, pSetFakeLicensePlate: boolean): Promise<void> {
    const anim = new AnimationTask(PlayerPedId(), "normal", pSetFakeLicensePlate ? "Adding fake plates" : "Removing fake plates", 5000, "anim@amb@clubhouse@tutorial@bkr_tut_ig3@", "machinic_loop_mechandplayer");
    const result = await anim.start();

    if (result === 100) {
        const netId = NetworkGetNetworkIdFromEntity(pVehicle);
        const couldApply = await RPC.execute("vrp:vehicles:setFakeLicensePlate", netId, pSetFakeLicensePlate);

        if (couldApply) {
            emit("inventory:removeItem", "fakeplate", 1);
        }
    }
}
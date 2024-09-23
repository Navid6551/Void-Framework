import { Thread } from "../../classes/thread";
import { CurrentVehicle, CurrentSeat } from "../vehicle";

export const PassengerThread = new Thread(async function (this: Thread) { }, 1000);

export async function InitPassenger(): Promise<void> {
    if (CurrentVehicle && CurrentSeat !== -1) {
        await PassengerThread.start();
    }
};
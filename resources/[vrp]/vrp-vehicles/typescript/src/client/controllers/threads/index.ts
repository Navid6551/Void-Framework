import { Delay } from "../../utils/tools";
import { InitDriver } from "./driver";
import { InitPassenger } from "./passenger";
import { InitNitro } from "./nitro";
import { InitAircraft } from "./aircraft";

export async function InitThreads(): Promise<void> {
    await Delay(1000);
    await InitDriver();
    await InitPassenger();
    await InitNitro();
    await InitAircraft();
}
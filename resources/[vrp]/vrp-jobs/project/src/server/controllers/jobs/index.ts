import { DodoJobServer } from "./dodo";
import { FinishServerJob } from "./fishing"
import { GarbageServerJob } from "./garbage";

export const ServerSideJos = async() => {
    await FinishServerJob();
    await DodoJobServer();
    await GarbageServerJob();
}
import { DodoJob } from "./dodo";
import { FinishJob } from "./fishing"
import { GarbageJob } from "./garbage";

export const MainJObs = async() => {
    await FinishJob();
    await DodoJob();
    await GarbageJob();
}
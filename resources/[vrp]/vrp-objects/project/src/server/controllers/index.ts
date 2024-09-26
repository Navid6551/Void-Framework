import { InitConfig } from "@shared/config";
import { InitEvents } from "./events";
import { InitObject, loadAllObjects } from "./object";

export const Init = async (): Promise<void> => {
    await InitConfig();
    await InitEvents();
    await InitObject();
    await loadAllObjects()
}

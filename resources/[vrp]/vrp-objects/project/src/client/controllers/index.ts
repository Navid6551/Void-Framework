import { InitConfig } from "@shared/config";
import { InitPlacement } from "./placement";
import { initEvents } from "./events";
import { InitMultiplacement } from "./multiplacement";
import { InitGroupSelect } from "./groupselect";

export const Init = async (): Promise<void> => {
    await InitConfig();
    await initEvents();
    await InitPlacement();
    await InitGroupSelect();
    await InitMultiplacement();
}
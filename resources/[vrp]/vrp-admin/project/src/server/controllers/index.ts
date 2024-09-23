import { InitConfig } from "@shared/config";
import { InitEvents } from "./events";
import { InitBans } from "./bans";
import { InitCommands } from "./commands";

export const Init = async (): Promise<void> => {
    await InitConfig();
    await InitEvents();
    await InitBans();
    await InitCommands();
}
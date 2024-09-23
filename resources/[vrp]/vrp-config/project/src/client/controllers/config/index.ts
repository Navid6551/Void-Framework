import { InitConfigs } from "./configs";
import { InitEvents } from "./events";

export const InitConfig = async (): Promise<void> => {
    await InitConfigs();
    await InitEvents();
}
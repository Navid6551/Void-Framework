import { InitAdminMenu } from "./adminMenu";
import { InitEvents } from "./events";
import { InitAdminUI } from "./adminUI";

export const Init = async (): Promise<void> => {
    await InitAdminMenu();
    await InitEvents();
    await InitAdminUI();
}
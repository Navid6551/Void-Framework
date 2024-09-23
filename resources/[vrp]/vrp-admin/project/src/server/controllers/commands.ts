import { isAdmin } from "./events";

export async function InitCommands(): Promise<void> { };

RegisterCommand("vrp-admin:logout", (src: number) => {
    if (!isAdmin(src)) return;
    emitNet("noinstancezone", src);
}, false);
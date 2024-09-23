import { Events, Utils } from "@vpx/client";
import { getOption } from "./options";
import { initializeList, registerBinds } from "./adminUI";
import { currentJob } from "./events";
import { deleteEntity, deselectEntity, selectEntity, selection, setClosestObject } from "./selection";

export let commands = [];

export async function InitAdminMenu() { }

const GetIsAdmin = Utils.cache(async () => {
    const result = await RPC.execute('vrp:admin:isAdmin');
    return [true, result];
}, { timeToLive: 600000 });

export const IsAdmin = async () => {
    return (await GetIsAdmin.get())[0];
};

export const IsDev = async () => {
    return (await GetIsAdmin.get())[1];
};

export async function openAdminMenu() {
    const result = await RPC.execute('vrp:admin:isAdmin');
    // console.log("Tryint to open")
    // console.log(result[0])

    if (result[0]) { //await IsAdmin()
        const option = await getOption('openDefaultMenu');
        const commandUI = await RPC.execute('vrp:admin:getCommandUI');
        setCommands(commandUI);
        if (option.data) {
            registerBinds();
            initializeList(2);
        }
        else {
            registerBinds();
            initializeList(3);
        }
    }
}

RegisterCommand('+openAdminMenu', () => openAdminMenu(), false);
RegisterCommand('-openAdminMenu', () => {}, false);
RegisterCommand('+adminSelect', () => selectEntity(), false);
RegisterCommand('-adminSelect', () => deselectEntity(), false);
RegisterCommand('+adminDeleteEntity', () => deleteEntity(), false);
RegisterCommand('-adminDeleteEntity', () => { }, false);
RegisterCommand('vrp-admin:toggleGodMode', (_0x1f8ca6, _0x3635d6) => {
    Events.emitNet('vrp-admin:giveGodMode', _0x3635d6[0], _0x3635d6[1], _0x3635d6[2]);
}, false);
RegisterCommand('vrp-admin:toggleBlur', (_0x37fd71, _0x3bf3d8) => {
    Events.emitNet('vrp-admin:toggleBlur', _0x3bf3d8[0]);
}, false);
RegisterCommand('vrp-admin:selectClosestObject', (_0x2c81c0, _0x1e16e1) => {
    let closestObject = Math.trunc(Number(_0x1e16e1[0]));
    if (Number.isNaN(closestObject)) closestObject = GetHashKey(_0x1e16e1[0]);
    setClosestObject(closestObject);
}, false);

global.exports['vrp-keybinds'].registerKeyMapping('', 'zzAdmin', 'Delete Target', '+adminDeleteEntity', '-adminDeleteEntity', '');
global.exports['vrp-keybinds'].registerKeyMapping('', 'zzAdmin', 'Select Target', '+adminSelect', '-adminSelect', '');
global.exports['vrp-keybinds'].registerKeyMapping('', 'zzAdmin', 'Open Menu', '+openAdminMenu', '-openAdminMenu', '');

RegisterCommand("menu", async () => await openAdminMenu(), false);

export async function setCommands(pCommands) {
    commands = pCommands;
}

export function updateUI() {
    SetEntityDrawOutline(selection?.entity?.handle ?? undefined, false);
    global.exports['vrp-adminUI'].setCommandUI(null);
    global.exports['vrp-adminUI'].exitNUI();
    global.exports['vrp-selector'].deselect();
}

on('vrp-config:configLoaded', (pModule: string, pConfig: any) => {
    if (pModule !== 'vrp-admin') return;
    GetIsAdmin.reset();
    emitNet('vrp-commands:buildCommands', currentJob);
});
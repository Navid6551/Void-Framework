import { Procedures, Utils } from "@vpx/client";
import { commands, setCommands } from "./adminMenu";
import { getValue, setValue } from "./state";
import { adminBinds, getFavCommands, getKeyBinds, initOptions, setOptions, updateFavCommands, updateKeyBinds } from "./options";
import { availableLicenses } from "client/util/license";

export let definedNames = [];
export let validVehicles = [];
export let validVehiclePresets = [];
export let validGarages = [];
export let itemList = [];
export let validJobs = [];
export let validLicenses = [];
export let bindsRegistered = false;

export async function InitAdminUI() { }

export let adminMode = false;

RegisterNuiCallbackType('adminMenu');
on('__cfx_nui:adminMenu', async (data, cb) => {
    switch (data.action) {
        case 'updatePlayerLogs':
            updatePlayerLogs(data.searchParam);
            break;
        case 'updateOptions':
            setOptions(data.options);
            break;
        case 'updateKeybinds':
            updateKeyBinds(data.keyBinds);
            break;
        case 'updateFavCommands':
            updateFavCommands(data.favCommands);
            break;
        case 'getDefinedNames':
            await getDefinedNames(data.playerList);
            break;
        case 'updateCommandState':
            RPC.execute('vrp:admin:runCommandFromClient', data.commandAction, data.commandData);
            break;
        case 'toggleAdminMode':
            setAdminMode(!adminMode);
            break;
        case 'runEvent':
            emit(data.event);
            break;
        case 'clearDefinedNames':
            definedNames = [];
            break;
    }
    cb();
});

RegisterNuiCallbackType('runCommandMenu');
on('__cfx_nui:runCommandMenu', (data, cb) => {
    RPC.execute('vrp:admin:runCommandFromClient', data.action, data.data);
    cb();
});

export async function updatePlayerLogs(pPlayerList) {
    const playerLogs = await RPC.execute('vrp:admin:getPlayerLogs', pPlayerList);
    global.exports['vrp-adminUI'].updatePlayerLogs(playerLogs);
}

export const GetPlayerList = Utils.cache(async () => {
    const playerList = await RPC.execute('vrp:admin:getPlayerList');
    return [true, playerList];
}, { timeToLive: 30000 });

export const GetBannedPlayers = Utils.cache(async () => {
    const bannedPlayers = await RPC.execute('vrp:admin:getBannedPlayers');
    return [true, bannedPlayers];
}, { timeToLive: 60000 });

export async function initializeList(pType) {
    getKeyBinds();
    const menuData = [];
    for (const key in commands) {
        const command = commands[key];
        const adminMenu = command.adminMenu;
        if (adminMenu && adminMenu.command && (adminMenu.command.child == false || adminMenu.command.child == true)) {
            const value = getValue(adminMenu.command.action);
            if (value == null || !value) {
                setValue(adminMenu.command.action, false);
            }
            adminMenu.command.child = getValue(adminMenu.command.action);
        }
        menuData.push(commands[key].adminMenu);
    }

    const playerList = GetPlayerList.get();
    const options = initOptions();
    const itemListNames = getItemListNames();
    const vehicles = getValidVehicles();
    const vehiclePresets = []; //await fetchVehiclePresets();
    const jobs = getValidJobs();
    const licenses = getValidLicenses();
    const favoriteCommands = getFavCommands();
    const bannedPlayers = []; //GetBannedPlayers.get();
    const garages = await fetchGarages();
    const result = await Promise.all([playerList, options, itemListNames, vehicles, jobs, licenses, favoriteCommands, bannedPlayers, garages, vehiclePresets]);

    const commandList = {
        playerData: result[0] ? result[0].CurrentPlayers : [],
        options: result[1],
        menuData: menuData,
        playerLogs: null,
        adminMode: adminMode,
        itemList: result[2],
        vehicleList: result[3],
        jobList: result[4],
        licenseList: result[5],
        favCommands: result[6],
        disconnectedPlayers: result[0] ? result[0].Disconnected : [],
        bannedList: result[7],
        garageList: result[8],
        vehiclePresetList: result[9]
    };
    global.exports['vrp-adminUI'].setCommandUI(commandList, null, pType);

    //if (definedNames.length != 0) {
    //    await getDefinedNames(definedNames);
    //}
}

export async function getDefinedNames(pDefinedNames) {
    if (pDefinedNames == 'empty') {
        definedNames = null;
        return;
    }
    const names = await RPC.execute('vrp:admin:getDefinedNames', pDefinedNames);
    definedNames = pDefinedNames;
    global.exports['vrp-adminUI'].updateDefinedNames(names);
}

export async function executeBind(pKey) {
    if (!adminMode) return;
    if (commands == null || commands.length <= 0) {
        const commandUI = await RPC.execute('vrp:admin:getCommandUI');
        await setCommands(commandUI);
    }
    const bind = adminBinds.find(_bind => _bind.key === pKey);
    if (bind) {
        const command = commands.find(_command => _command.adminMenu != null && _command.adminMenu.command.title.toLowerCase() === bind.parent.toLowerCase());
        if (command == null) return;
        RPC.execute('vrp:admin:runCommandFromClient', command.adminMenu.command.action, {
            toggle: !getValue(command.adminMenu.command.action)
        });
    }
}

export async function getValidVehicles() {
    if (validVehicles.length >= 1) return validVehicles;
    const carConfig = await RPC.execute<any[]>('showroom:getCarConfig');
    const vehicles = [];
    for (const key in carConfig[0]) {
        if (carConfig[0]) {
            const vehicle = carConfig[0][key];
            if (vehicle) {
                vehicles.push({
                    model: vehicle.model,
                    name: vehicle.name
                });
            }
        }
    }
    validVehicles = vehicles;
    return vehicles;
}

export async function fetchVehiclePresets() {
    if (validVehiclePresets.length >= 1) return validVehiclePresets;
    const vehiclePresets = await RPC.execute<any[]>('vrp-adminUI:fetchVehiclePresets');
    validVehiclePresets = vehiclePresets;
    return vehiclePresets;
}

export async function fetchGarages() {
    if (validGarages.length >= 1) return validGarages;
    const garages = await RPC.execute<any[]>('vrp-adminUI:fetchGarages');
    validGarages = garages;
    return garages;
}

export async function getItemListNames() {
    if (itemList.length >= 1) return itemList;
    itemList = global.exports['vrp-inventory'].getItemListNames();
    return itemList;
}

export async function getValidJobs() {
    if (validJobs.length >= 1) return validJobs;
    const jobManagerValidJobs = [] //global.exports['vrp-base'].getModule('JobManager').ValidJobs;
    const jobs = [];
    for (const key in jobManagerValidJobs) {
        if (jobManagerValidJobs) {
            const job = jobManagerValidJobs[key];
            if (job) {
                jobs.push({
                    job: key,
                    name: job.name
                });
            }
        }
    }
    validJobs = jobs;
    return validJobs;
}

export async function getValidLicenses() {
    if (validLicenses.length >= 1) return validLicenses;
    const licenses = [];
    for (const key in availableLicenses) {
        const license = availableLicenses[key];
        if (license) {
            licenses.push({
                licenseID: key,
                name: license
            });
        }
    }
    validLicenses = licenses;
    return validLicenses;
}

export function registerBinds() {
    if (bindsRegistered) return;
    getKeyBinds();
    getValidVehicles();
    for (const key in adminBinds) {
        const bind = adminBinds[key];
        if (bind.key != 'none') {
            RegisterCommand('+' + bind.key, () => executeBind(bind.key), false);
            RegisterCommand('-' + bind.key, () => {
            }, false);
            global.exports['vrp-keybinds'].registerKeyMapping('', 'zzAdmin', bind.key, '+' + bind.key, '-' + bind.key, '');
        }
    }
    bindsRegistered = true;
}

export function setAdminMode(pAdminMode) {
    adminMode = pAdminMode;
    emit('vrp-admin:currentDevmode', adminMode);
    global.exports['vrp-adminUI'].updateAdminMode(adminMode);
}
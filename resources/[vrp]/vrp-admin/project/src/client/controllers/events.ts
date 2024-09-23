import { ArrayToMap, Delay } from "@shared/utils/tools";
import { setCommands, updateUI } from "./adminMenu";
import { fetchGarages, getItemListNames, getValidJobs, getValidLicenses, getValidVehicles, initializeList, registerBinds, setAdminMode } from "./adminUI";
import { InitCommands, clientCommandArray } from "./commands";
import { attachClient } from "./commands/attach";
import { blipDropped, blipReady, isRenderingText, onDroppedBlip, onJoiningBlip, updatePlayerCoords } from "./commands/blip";
import { bringClient } from "./commands/bring";
import { initOptions } from "./options";
import { initializeScopeHandler, onDroppedScope, onJoiningScope } from "./scope";
import { getValue, setValue } from "./state";
import { toggleGodMode } from "./commands/godMode";
import { Events } from "@vpx/client";
import { runCloakScopeTick, setCloakedPlayers, updateCloakedPlayers } from "./commands/cloak";
import { showLockdownStats } from "./commands/lockdownStats";

export async function InitEvents(): Promise<void> { };

const voiceModes = [
    {
        mode: 1,
        range: 0,
        priority: 1
    },
    {
        mode: 2,
        range: 0,
        priority: 1
    },
    {
        mode: 3,
        range: 0,
        priority: 1
    }
];

let editorInterval = null;
let isRecording = false;
export let currentJob = 'unemployed';

onNet('vrp-admin:runClientCommand', (pName, pUser, pArgs, _0x1df988) => {
    RunClientCommand(pName, pUser, pArgs, _0x1df988);
});

onNet('vrp-admin:bringClient', pCoords => {
    bringClient(pCoords);
});

onNet('vrp-admin:attachClient', (pCoords, pTargetData) => {
    attachClient(pCoords, pTargetData);
});

onNet('vrp-admin:asdasdasd', _0x26839a => {
    const _0x51b8ea = PlayerId();
    const _0x216c1d = GetPlayerServerId(_0x51b8ea);
    if (_0x26839a[_0x216c1d]) {
        return;
    }
    TriggerEvent('vrp:voice:proximity:override', 'gag', voiceModes);
    TriggerServerEvent('vrp:voice:transmission:state', -1, 'gag', true, 'gag');
});

onNet('vrp-admin:asdasdasf', () => {
    TriggerEvent('vrp:voice:proximity:override', 'gag', voiceModes, -1, -1);
    TriggerServerEvent('vrp:voice:transmission:state', -1, 'gag', false, 'gag');
});

onNet('vrp-admin:mutePlayer', pServerId => {
    MumbleSetVolumeOverrideByServerId(pServerId, 0);
});

onNet('vrp-admin:unmutePlayer', pServerId => {
    MumbleSetVolumeOverrideByServerId(pServerId, -1);
});

onNet('vrp-admin:cloakList', (pPlayers, pToggle, pServerId) => {
    updateCloakedPlayers(pPlayers, pToggle, pServerId);
});

onNet('onPlayerJoining', function (pServerId) {
    onJoiningBlip(pServerId);
    onJoiningScope(+pServerId);
});

onNet('onPlayerDropped', function (pServerId) {
    onDroppedBlip(pServerId);
    onDroppedScope(+pServerId);
});

on('vrp:infinity:player:coords:array', pCoords => {
    if (!isRenderingText) return;
    updatePlayerCoords(ArrayToMap(pCoords));
});

on('vrp-admin:blip:dropped', pServerId => {
    blipDropped(pServerId);
});

on('vrp-admin:blip:ready', pServerId => {
    blipReady(pServerId);
});

on('vrp-base:playerSpawned', async () => {
    const [isAdmin, isDev] = await RPC.execute<[boolean, boolean]>('vrp:admin:isAdmin');
    if (isAdmin) {
        const commandUI = await RPC.execute('vrp:admin:getCommandUI');
        setCommands(commandUI);
        registerBinds();
        initOptions();
        getItemListNames();
        getValidVehicles();
        fetchGarages();
        getValidJobs();
        getValidLicenses();
        if (isDev) {
            setAdminMode(true);
        }
    }
    const cloakList = await RPC.execute('vrp:admin:getCurrentCloakList');
    setCloakedPlayers(cloakList);
    runCloakScopeTick();
});

on('vrp:admin:updateUI', () => {
    updateUI();
});

onNet('vrp:admin:openMenu', async pType => {
    const commandUI = await RPC.execute('vrp:admin:getCommandUI');
    setCommands(commandUI);
    initializeList(pType);
});

async function RunClientCommand(pName, pUser, pArgs, pArg) {
    if (clientCommandArray.length == 0) {
        InitCommands();
    }

    const command: CommandData = clientCommandArray.find((command: CommandData) => {
        return command.name === pName;
    });

    if (!command) return console.log("Command not found");

    if (command.name == pName) {
        const result = await command.executedFunction(pUser, pArgs);
        //RPC.execute('vrp:admin:triggerLogFromClient', pArg, result, command.blockClientLog);
    }
}

on('vrp-admin:hotreload', async () => {
    const [isAdmin, isDev] = await RPC.execute<[boolean, boolean]>('vrp:admin:requestAdminPermission');
    if (isAdmin) {
        const commandUI = await RPC.execute('vrp:admin:getCommandUI');
        setCommands(commandUI);
        registerBinds();
        await initOptions();
        await getItemListNames();
        await getValidVehicles();
        await fetchGarages();
        await getValidJobs();
        await getValidLicenses();
        await initializeScopeHandler();
        if (isDev) {
            setAdminMode(true);
        }
    }
    const cloakList = await RPC.execute('vrp:admin:getCurrentCloakList'); //?
    setCloakedPlayers(cloakList); //?
    runCloakScopeTick();
});

onNet('vrp-admin:setLastVehicle', async pNetId => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (vehicle == null || vehicle == 0 || !vehicle) return;
    await setValue('lastVeh', vehicle);
});

on('vrp-admin:enterlastVeh', async () => {
    const vehicle = await getValue('lastVeh');
    if (vehicle && DoesEntityExist(vehicle)) {
        TaskWarpPedIntoVehicle(PlayerPedId(), vehicle, -1);
    } else {
        TriggerEvent('DoLongHudText', 'Failed to find Vehicle.', 2);
    }
});

on('vrp-admin:gotolastLocation', async () => {
    const coords = await getValue('lastCoords');
    const playerId = PlayerId();
    const playerPed = GetPlayerPed(playerId);
    if (coords && coords[0]) {
        RequestCollisionAtCoord(coords[0], coords[1], coords[2]);
        SetPedCoordsKeepVehicle(playerPed, coords[0], coords[1], coords[2]);
        FreezeEntityPosition(playerPed, true);
        SetPlayerInvincible(playerPed, true);
        const _0x2a1219 = GetGameTimer();
        while (!HasCollisionLoadedAroundEntity(playerPed)) {
            if (GetGameTimer() - _0x2a1219 > 5000)
                break;
            await Delay(10);
        }
        FreezeEntityPosition(playerPed, false);
        SetPlayerInvincible(playerPed, false);
    }
});

onNet('vrp-admin:setAdminMode', async pEnabled => {
    setAdminMode(pEnabled);
});

onNet('vrp-admin:closeMenu', async p1 => {
    global.exports['vrp-adminUI'].enableMenu(false, false);
    global.exports['vrp-adminUI'].exitNUI();
});

onNet('vrp-admin:logClient', pMessage => {
    console.log(pMessage);
});

on('vrp-admin:editor:toggle', () => {
    if (editorInterval != null) {
        clearInterval(editorInterval);
        editorInterval = null;
        DoScreenFadeIn(1);
        return;
    }
    editorInterval = setInterval(() => {
        if (!IsPauseMenuActive()) {
            DoScreenFadeIn(1);
            clearInterval(editorInterval);
            editorInterval = null;
        }
    }, 10);
    ActivateRockstarEditor();
});

on('vrp-admin:editor:start', () => {
    if (isRecording) return emit('DoLongHudText', 'Already recording.', 2);
    StartRecording(1);
    isRecording = true;
});

on('vrp-admin:editor:stop', () => {
    if (!isRecording) return emit('DoLongHudText', 'You are not recording.', 2);
    isRecording = false;
    StopRecordingAndSaveClip();
});

onNet('vrp-admin:damageMe', pAmount => {
    ApplyDamageToPed(PlayerPedId(), pAmount, true);
});

onNet('vrp-admin:damageVeh', async pNetId => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (!vehicle || !DoesEntityExist(vehicle)) return;
    PopOutVehicleWindscreen(vehicle);
    for (let i = 0; i < 6; i++) {
        SetVehicleDoorBroken(vehicle, i, false);
        SmashVehicleWindow(vehicle, i);
    }
    for (let i = 0; i < 256; i++) {
        const _0x13a6db = (Math.random() - 0.5) * 2;
        const _0x2649c2 = (Math.random() - 0.5) * 2;
        const _0x421cd1 = (Math.random() - 0.5) * 2;
        SetVehicleDamage(vehicle, _0x13a6db, _0x2649c2, _0x421cd1, 300, 100, true);
        await Delay(1);
    }
});

onNet('vrp-admin:explodeVeh', async (pNetId, pCoords) => {
    if (pCoords) {
        AddExplosion(pCoords[0], pCoords[1], pCoords[2], 5, 10, true, false, 1);
    }
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    if (!vehicle || !DoesEntityExist(vehicle)) return;
    pCoords = GetEntityCoords(vehicle, false);
    AddExplosion(pCoords[0], pCoords[1], pCoords[2], 5, 10, true, false, 1);
});

onNet('vrp-admin:explodeMe', () => {
    const coords = GetEntityCoords(PlayerPedId(), false);
    AddExplosion(coords[0], coords[1], coords[2], 5, 10, true, false, 1);
});

onNet('vrp-admin:burnMe', async () => {
    const playerPed = PlayerPedId();
    StartEntityFire(playerPed);
    await Delay(2500);
    StopEntityFire(playerPed);
});

onNet('vrp-admin:burnEnt', async pNetId => {
    const entity = NetworkGetEntityFromNetworkId(pNetId);
    if (!entity || !DoesEntityExist(entity)) return;
    StartEntityFire(entity);
    await Delay(2500);
    StopEntityFire(entity);
});

Events.onNet('vrp-admin:toggleGodMode', (pEnabled, pTimer) => {
    toggleGodMode(pEnabled, pTimer, true);
});

onNet('vrp-admin:openInventory', async _0x256ef8 => {
    if (_0x256ef8) {
        emit('server-inventory-open', '1', _0x256ef8);
        return;
    }
    const content = await RPC.execute('vrp:admin:getInventoryNames');
    global.exports['vrp-ui'].openApplication('notepad', {
        canSave: false,
        content: content,
    });
});

onNet('vrp-jobmanager:playerBecameJob', pJob => {
    currentJob = pJob;
});

Events.onNet('vrp-admin:showLockdownStats', () => {
    showLockdownStats();
});

RPC.register('GetOffsetFromEntityInWorldCoords', () => {
    return GetOffsetFromEntityInWorldCoords(PlayerPedId(), 1.5, 5.0, 0.0);
});
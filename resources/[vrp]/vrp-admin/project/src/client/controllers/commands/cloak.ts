import { Delay } from "@shared/utils/tools";
import { scopeHandler } from "../scope";
import { IsInGodMode } from "./godMode";

export let cloakedPlayers = [];
export let cloakTick = null;
export let cloakScopeTick = null;

export async function updateCloakedPlayers(pPlayers, pToggle, pServerId) {    
    cloakedPlayers = pPlayers;
    if (scopeHandler[pServerId] && scopeHandler[pServerId].inScope) {
        _0x3f64ec(pServerId, pToggle);
    }
    if (GetPlayerFromServerId(pServerId) == PlayerId()) {
        if (pToggle)
            cloakTick = setTick(() => {
                runCloak();
            });
        else {
            stopCloak();
        }
    }
}

export async function setCloakedPlayers(pPlayers) {
    cloakedPlayers = pPlayers;
}

export async function updateScopeHandler(_0x4d9e6f) { }

async function _0x3f64ec(pServerId, pToggle) {
    let player = GetPlayerFromServerId(pServerId);
    let index = 0;
    if (pToggle) {
        while (player == -1 && index < 200) {
            index++;
            player = GetPlayerFromServerId(pServerId);
            await Delay(10);
        }
        if (index == 200) {
            console.log('Failed out of Cloak player check');
        }
    }
    if (PlayerId() != player) {
        NetworkConcealPlayer(player, pToggle, false);
    }
}

function runCloak() {
    const playerId = PlayerId();
    const playerPed = GetPlayerPed(playerId);
    SetEntityAlpha(playerPed, 100, null);
    SetPlayerInvincible(playerId, true);
    SetPedCanRagdoll(playerPed, false);
}

function stopCloak() {
    const playerId = PlayerId();
    const playerPed = GetPlayerPed(playerId);
    SetEntityAlpha(playerPed, 255, null);
    SetPlayerInvincible(playerId, IsInGodMode());
    SetPedCanRagdoll(playerPed, true);
    clearTick(cloakTick);
}

export function runCloakScopeTick() {
    cloakScopeTick = setTick(async () => {
        handleCloak();
        await Delay(100);
    });
}

function handleCloak() {
    for (const key in cloakedPlayers) {
        const serverId = cloakedPlayers[key];
        const playerId = PlayerId();
        const player = GetPlayerServerId(playerId);
        const cloakedPlayer = GetPlayerFromServerId(serverId);
        if (cloakedPlayer == playerId || serverId == player) continue;
        if (cloakedPlayer > 0 && PlayerId() != cloakedPlayer) {
            NetworkConcealPlayer(cloakedPlayer, true, false);
        }
    }
    for (const key in scopeHandler) {
        const data = scopeHandler[key];
        if (cloakedPlayers.indexOf(data.player) == -1) {
            const playerId = PlayerId();
            const player = GetPlayerServerId(playerId);
            const cloakedPlayer = GetPlayerFromServerId(data.player);
            if (cloakedPlayer == playerId || data.player == player) {
                continue;
            }
            NetworkConcealPlayer(cloakedPlayer, false, false);
        }
    }
}
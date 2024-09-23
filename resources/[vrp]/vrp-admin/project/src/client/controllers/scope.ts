import { ScopeHandler } from '../types/client';
import { updateScopeHandler } from './commands/cloak';

export const scopeHandler: ScopeHandler = {};

export function onJoiningScope(player: number): void {
    if (scopeHandler[player] == null) {
        scopeHandler[player] = { player: player, inScope: true };
    } else {
        scopeHandler[player].inScope = true;
    }
    updateScopeHandler(scopeHandler);
}

export function onDroppedScope(player: number): void {
    if (scopeHandler[player] == null) {
        scopeHandler[player] = { player: player, inScope: false };
    } else {
        scopeHandler[player].inScope = false;
    }
    updateScopeHandler(scopeHandler);
}

export async function initializeScopeHandler(): Promise<void> {
    const activePlayers = GetActivePlayers();
    for (const activePlayer in activePlayers) {
        const player = activePlayers[activePlayer];
        const serverId = GetPlayerServerId(player);
        scopeHandler[serverId] == null ? scopeHandler[serverId] = {
            player: serverId,
            inScope: true
        } : scopeHandler[serverId].inScope = true;
    }
    updateScopeHandler(scopeHandler);
}
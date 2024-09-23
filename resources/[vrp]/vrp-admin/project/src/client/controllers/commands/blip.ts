import { Delay } from '@shared/utils/tools';
import { BlipHandler } from '../../util/bliphandler';
import { BlipSettings } from '../../types/client';
import { scopeHandler } from '../scope';
import { Player, Stack } from '../../classes/stack';
import { GetDrawTextWdith } from '../../util/util';

const TEXT_SCALE = 0.4;

const playerBlipsNameWidthCache = new Map<string, number>();

let BlipHandlers: { [key: number]: any } = [];
let drawTextTimer = null;
export let isRenderingText: boolean = false;

function GetBlipSettings(pServerId: string): BlipSettings {
    const settings: BlipSettings = {
        short: true,
        sprite: 1,
        category: 7,
        color: 1,
        heading: true,
        text: pServerId,
        route: null,
        scale: 1.0,
    };

    return settings;
}

export function enableBlips(pEnabled: boolean, pRenderText: boolean): void {
    clearTick(drawTextTimer);
    UnregisterBlipsForAllPlayers();
    isRenderingText = pRenderText;

    if (pEnabled) {
        drawTextTimer = setTick(() => {
            renderNames();
        });
        RegisterBlipsForAllPlayers();
    }
}

function draw3DTextScreen(x: number, y: number, text: string, scale: number): void {
    SetTextFont(0);
    SetTextProportional(true);
    SetTextScale(0.0, scale);
    SetTextColour(255, 0, 0, 255);
    SetTextDropshadow(0, 0, 0, 0, 55);
    SetTextEdge(2, 0, 0, 0, 150);
    SetTextDropShadow();
    SetTextOutline();
    SetTextEntry('STRING');
    SetTextCentre(true);
    AddTextComponentString(text);
    DrawText(x, y);
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let testPlayers: Player[] = [];
RegisterCommand('aa', () => {
    const [x, y, z] = [157.5, -997.1, 29.35];
    const players = [
        { x, y, z: z + 1.0, sX: -1, sY: -1, text: `[1] - Name1`, n: 1, stack: null, textWidth: null },
        { x: x + 0.5, y, z: z + 1.0, sX: -1, sY: -1, text: `[2] - Name2`, n: 2, stack: null, textWidth: null },
        { x, y: y - 0.5, z: z + 1.0, sX: -1, sY: -1, text: `[3] - Name3`, n: 3, stack: null, textWidth: null },
        { x: x + 0.5, y: y - 0.5, z: z + 1.0, sX: -1, sY: -1, text: `[4] - Name4`, n: 4, stack: null, textWidth: null },
        { x: x + 2.0, y: y - 6.0, z: z + 1.0, sX: -1, sY: -1, text: `[5] - Name5`, n: 5, stack: null, textWidth: null },
        { x: x + 2.0, y: y - 6.0, z: z + 1.0, sX: -1, sY: -1, text: `[6] - Name6`, n: 6, stack: null, textWidth: null },
        { x: x + 2.0, y: y - 6.0, z: z + 5.0, sX: -1, sY: -1, text: `[7] - Name7`, n: 7, stack: null, textWidth: null },
    ];
    const newPlayers = [];
    for (let i = 0; i < 2; i++) {
        const randX = getRandomInt(-100, 100);
        const randY = getRandomInt(-100, 100);
        for (let j = 0; j < players.length; j++) {
            const player = players[j];
            const index = i * players.length + j;
            newPlayers.push({ x: player.x + randX, y: player.y + randY, z: player.z, text: `[${index}] Name${index}`, n: index, stack: null, textWidth: null });
        }
    }
    players.push(...newPlayers);
    testPlayers = players;
}, false);

function generatePlayerStacks(players: Player[]): Stack[] {
    const visiblePlayers = players.filter((player) => {
        const [onScreen, sX, sY] = World3dToScreen2d(player.x, player.y, player.z);
        if (!onScreen) return false;
        player.sX = sX;
        player.sY = sY;
        if (!playerBlipsNameWidthCache.has(player.text)) {
            playerBlipsNameWidthCache.set(player.text, GetDrawTextWdith(player.text, 0, TEXT_SCALE));
        }
        player.textWidth = playerBlipsNameWidthCache.get(player.text);
        return true;
    });

    // Create stacks of players overlapping each other.
    const stacks: Stack[] = [];
    for (const player of visiblePlayers) {
        let overlappingStack: Stack = null;
        for (const stack of stacks) {
            if (stack.isPlayerOverlapping(player)) {
                overlappingStack = stack;
                break;
            }
        }
        if (overlappingStack) {
            overlappingStack.addPlayer(player);
        } else {
            overlappingStack = new Stack();
            overlappingStack.addPlayer(player);
            stacks.push(overlappingStack);
        }
    }

    // Dirty merge. Try to find better way to do this.
    const mergeStacksIter = (stacks: Stack[]) => {
        stacks = [...stacks];
        const mergedStacks: Stack[] = [];
        while (stacks.length > 0) {
            let stack = stacks.pop();
            for (let i = 0; i < stacks.length; i++) {
                const otherStack = stacks[i];
                if (stack.isStackOverlapping(otherStack)) {
                    stacks.splice(i, 1);
                    stack = stack.merge(otherStack);
                    break;
                }
            }
            mergedStacks.push(stack);
        }
        return mergedStacks;
    }

    let mergedStacks: Stack[] = stacks;
    while (true) {
        mergedStacks = mergeStacksIter(mergedStacks);
        const newMergedStacks = mergeStacksIter(mergedStacks);
        if (mergedStacks.length === newMergedStacks.length) {
            break;
        } else {
            mergedStacks = newMergedStacks;
        }
    }

    return mergedStacks;
}

function renderNames(): void {
    const currentPlayerPed = PlayerPedId();
    const playersInScope: Player[] = [];
    for (const key in scopeHandler) {
        const data = scopeHandler[key];
        if (data.inScope) {
            const player = GetPlayerFromServerId(+data.player);
            const playerPed = GetPlayerPed(player);
            if (playerPed === currentPlayerPed) continue;
            const [x, y, z] = GetEntityCoords(playerPed, false) ?? [];
            const text = `[${data.player}] - ${GetPlayerName(player)}`;
            playersInScope.push({ x, y, z: z + 1.15, text, textWidth: null, sX: null, sY: null });
        }
    }

    const playerStacks = generatePlayerStacks(playersInScope); //testPlayers
    for (const stack of playerStacks) {
        for (const player of stack.getPlayersForRendering()) {
            draw3DTextScreen(player.x, player.y, player.text, TEXT_SCALE);
        }
    }
}

export async function onJoiningBlip(player: number): Promise<void> {
    if (BlipHandlers[player]) {
        BlipHandlers[player].inScope = true;
        await Delay(1000);
        if (BlipHandlers[player].inScope) {
            BlipHandlers[player].onModeChange('entity');
        }
    }
}

export async function onDroppedBlip(player: number): Promise<void> {
    if (BlipHandlers[player]) {
        BlipHandlers[player].inScope = false;
        BlipHandlers[player].onModeChange('coords');
    }
}

export async function updatePlayerCoords(pCoords: Map<any, any>): Promise<void> {
    for (const serverId in BlipHandlers) {
        const handler = BlipHandlers[serverId];

        if (handler && handler.mode == 'coords' && pCoords.get(+serverId)) {
            handler.onUpdateCoords(pCoords.get(+serverId));

            if (handler.entityExistLocally()) {
                handler.onModeChange('entity');
            }
        }
    }
}

function removeBlip(player: string): void {
    BlipHandlers[player].disable();
    BlipHandlers[player] = null;
}

function UnregisterBlipsForAllPlayers() {
    for (const player in BlipHandlers) {
        const handler = BlipHandlers[player];
        if (handler) {
            removeBlip(player);
        }
    }
    BlipHandlers = [];
}

function addBlip(player: string): void {
    const blipSettings = GetBlipSettings(player);
    const blip = new BlipHandler('player', +player, blipSettings);
    blip.enable(true);
    BlipHandlers[player] = blip;
}

function RegisterBlipsForAllPlayers(): void {
    const playerList = global.exports['vrp-infinity'].GetPlayerListJS();
    for (const player in playerList) {
        addBlip('' + playerList[player].serverId);
    }
}

export function blipReady(pServerId: number): void {
    if (isRenderingText) {
        addBlip('' + pServerId);
    }
}

export function blipDropped(pServerId: number): void {
    if (isRenderingText) {
        removeBlip('' + pServerId);
    }
}
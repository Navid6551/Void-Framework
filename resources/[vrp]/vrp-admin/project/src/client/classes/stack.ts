import { getDistanceBetweenCoords } from "client/util/util";

const TEXT_HEIGHT = 0.02;
const TEXT_GAP = 0.025;
const MAX_RENDERED_PLAYERS_PER_STACK = 4;

export interface Player {
    x: number;
    y: number;
    z: number;
    sX: number;
    sY: number;
    text: string;
    textWidth: number;
}

export class Stack {
    players: Player[] = [];
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;

    getPlayersForRendering() {
        const plyPos = GetEntityCoords(PlayerPedId(), false);
        const playersForRendering: { x: number, y: number, text: string }[] = [];
        const sortedPlayers = this.players.sort((a, b) => {
            const distA = getDistanceBetweenCoords(plyPos, [a.x, a.y, a.z]);
            const distB = getDistanceBetweenCoords(plyPos, [b.x, b.y, b.z]);
            const distDiff = distA - distB;
            if (Math.abs(distDiff) > 5.0) {
                return distDiff;
            }

            if (Math.abs(b.sY - a.sY) < 0.005) return 0;
            return b.sY - a.sY;
        });
        const startY = sortedPlayers[0].sY;
        let offset = 0;
        for (const player of sortedPlayers) {
            playersForRendering.push({ x: player.sX, y: startY - offset, text: player.text });
            offset += TEXT_GAP;
        }
        if (playersForRendering.length > MAX_RENDERED_PLAYERS_PER_STACK) {
            const remainingPlayers = playersForRendering.splice(MAX_RENDERED_PLAYERS_PER_STACK);
            const nextPlayer = remainingPlayers[0];
            const lastPlayer = playersForRendering[playersForRendering.length - 1];
            playersForRendering.push({ x: lastPlayer.x, y: nextPlayer.y, text: `${remainingPlayers.length} Others...` });
        }
        return playersForRendering;
    }

    addPlayer(player: Player) {
        this.players.push(player);
        if (!this.minX || player.sX < this.minX) this.minX = player.sX;
        if (!this.maxX || player.sX + player.textWidth > this.maxX) this.maxX = player.sX + player.textWidth;
        if (!this.maxY || player.sY > this.maxY) this.maxY = player.sY;
        this.minY = this.maxY - this.height();
    }

    merge(stack: Stack) {
        const mergedStack = new Stack();
        stack.players.forEach((player) => mergedStack.addPlayer(player));
        this.players.forEach((player) => mergedStack.addPlayer(player));
        return mergedStack;
    }

    isPlayerOverlapping(player: Player) {
        return !(player.sX > this.maxX ||
            player.sX + player.textWidth < this.minX ||
            player.sY > this.maxY ||
            player.sY + TEXT_HEIGHT < this.minY);
    }

    isStackOverlapping(stack: Stack) {
        return !(stack.minX > this.maxX ||
            stack.maxX < this.minX ||
            stack.minY > this.maxY ||
            stack.maxY < this.minY);
    }

    height() {
        const renderedPlayers = Math.min(MAX_RENDERED_PLAYERS_PER_STACK + 1, this.players.length);
        return ((TEXT_HEIGHT + TEXT_GAP / 2) * renderedPlayers);
    }
}
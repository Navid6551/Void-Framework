import { Vector } from "@shared/classes/vector";
import { Delay } from "@shared/utils/tools";

let isAttached = false;

export async function attachClient(pCoords: number[], pTargetData: TargetData) {
    const playerPed = PlayerPedId();
    if (!isAttached) {
        isAttached = true;
        const coords = new Vector(pCoords[0], pCoords[1], pCoords[2]);
        if (coords.isCoordinateEqual(coords, new Vector(0, 0, 0))) return;
        SetEntityCollision(playerPed, false, false);
        RequestCollisionAtCoord(coords.x, coords.y, coords.z);
        SetEntityCoords(playerPed, coords.x, coords.y, coords.z, false, false, false, false);
        FreezeEntityPosition(playerPed, true);
        SetPlayerInvincible(playerPed, true);
        SetEntityVisible(playerPed, false, false);
        const _0x4bd1c1 = GetGameTimer();
        let targetPlayer = GetPlayerFromServerId(pTargetData.TargetUser.source);
        let index = 0;
        while (targetPlayer == -1 && index < 200) {
            index++;
            targetPlayer = GetPlayerFromServerId(pTargetData.TargetUser.source);
            await Delay(10);
        }
        if (index == 200) {
            emit('DoLongHudText', 'Failed To attach');
        }
        let targetPlayerPed = GetPlayerPed(targetPlayer);
        let timeout = false;
        while (!HasCollisionLoadedAroundEntity(playerPed) || playerPed == 0) {
            if (GetGameTimer() - _0x4bd1c1 > 10000) {
                timeout = true;
                emit('DoLongHudText', 'Failed To attach');
                break;
            }
            targetPlayerPed = GetPlayerPed(targetPlayer);
            await Delay(10);
        }
        FreezeEntityPosition(playerPed, false);
        SetPlayerInvincible(playerPed, false);
        SetEntityVisible(playerPed, true, false);
        if (!timeout && playerPed != playerPed) {
            AttachEntityToEntity(playerPed, playerPed, 11816, 0, -1.48, 2, 0, 0, 0, false, false, false, false, 2, true);
            NetworkSetInSpectatorMode(true, playerPed);
        }
    } else {
        const targetPlayer = GetPlayerFromServerId(pTargetData.TargetUser.source);
        const playerPed = GetPlayerPed(targetPlayer);
        NetworkSetInSpectatorMode(false, playerPed);
        isAttached = false;
        DetachEntity(playerPed, true, true);
        SetEntityCollision(playerPed, true, true);
    }
}
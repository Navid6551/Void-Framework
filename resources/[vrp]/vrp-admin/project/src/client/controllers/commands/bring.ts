import { Vector } from "@shared/classes/vector";
import { Delay } from "@shared/utils/tools";

export async function bringClient(pCoords) {
    const playerPed = PlayerPedId();
    const coords = new Vector(pCoords[0], pCoords[1], pCoords[2]);
    if (coords.isCoordinateEqual(coords, new Vector(0, 0, 0))) return;
    RequestCollisionAtCoord(coords.x, coords.y, coords.z);
    SetPedCoordsKeepVehicle(playerPed, coords.x, coords.y, coords.z);
    FreezeEntityPosition(playerPed, true);
    SetPlayerInvincible(playerPed, true);
    const timer = GetGameTimer();
    while (!HasCollisionLoadedAroundEntity(playerPed)) {
        if (GetGameTimer() - timer > 5000) {
            break;
        }
        await Delay(10);
    }
    FreezeEntityPosition(playerPed, false);
    SetPlayerInvincible(playerPed, false);
}
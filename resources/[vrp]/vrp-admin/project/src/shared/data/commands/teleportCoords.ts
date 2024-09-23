import { RankValue } from "../../classes/enums";
import { setValue } from "../../../client/controllers/state";
import { Delay, MatchCoords } from "../../utils/tools";
import { Vector } from "../../classes/vector";

interface TeleportCoordsArgs {
    Coords: string;
}

export const teleportCoords: CommandData = {
    name: 'teleportCoords',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: TeleportCoordsArgs) {
        const coords = await MatchCoords(pArgs.Coords); //TODO; Fix this
        const playerPed = PlayerPedId();
        if (coords!.isCoordinateEqual(coords!, new Vector(0, 0, 0))) {
            return 'Failed to find Coords';
        }
        const playerCoords = GetEntityCoords(playerPed, false);
        setValue('lastCoords', [
            playerCoords[0],
            playerCoords[1],
            playerCoords[2]
        ]);
        RequestCollisionAtCoord(coords!.x, coords!.y, coords!.z);
        SetPedCoordsKeepVehicle(playerPed, coords!.x, coords!.y, coords!.z);
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
        return '' + coords!.x + ' ' + coords!.y + ' ' + coords!.z;
    },
    log: 'Teleported to Coord ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Teleport Coords',
                cat: 'Player',
                child: {
                    inputs: ['Coords'],
                    triggers: {
                        '0': {
                            name: 'Last Position',
                            event: 'vrp-admin:gotolastLocation',
                        },
                    },
                },
            },
            options: { bindKey: null },
        },
    },
};
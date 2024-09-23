import { RankValue } from "../../classes/enums";
import { setValue } from "../../../client/controllers/state";
import { Delay } from "../../utils/tools";
import { Vector } from "../../classes/vector";

export const teleport: CommandData = {
    name: 'teleport',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: TargetData) {
        const targetPlayerCoords = global.exports['vrp-infinity'].GetPlayerCoords(pArgs?.Target?.source, true);
        const target = new Vector(targetPlayerCoords[0], targetPlayerCoords[1], targetPlayerCoords[2]);
        const playerPed = PlayerPedId();
        if (target.isCoordinateEqual(target, new Vector(0, 0, 0))) {
            return 'Faile to find player';
        }
        const localPlayerCoords = GetEntityCoords(playerPed, false);
        setValue('lastCoords', [
            localPlayerCoords[0],
            localPlayerCoords[1],
            localPlayerCoords[2]
        ]);
        RequestCollisionAtCoord(target.x, target.y, target.z);
        SetPedCoordsKeepVehicle(playerPed, target.x, target.y, target.z);
        FreezeEntityPosition(playerPed, true);
        SetPlayerInvincible(playerPed, true);
        const timer = GetGameTimer();
        while (!HasCollisionLoadedAroundEntity(playerPed)) {
            if (GetGameTimer() - timer > 5000) break;
            await Delay(10);
        }
        FreezeEntityPosition(playerPed, false);
        SetPlayerInvincible(playerPed, false);
        return '' + pArgs?.Target?.name;
    },
    log: 'Teleported to ',
    target: true,
    canTargetAbove: true,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Teleport',
                cat: 'Player',
                child: {
                    inputs: ['Target'],
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
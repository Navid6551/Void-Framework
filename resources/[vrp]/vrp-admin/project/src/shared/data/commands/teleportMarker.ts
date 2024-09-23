import { RankValue } from "../../classes/enums";
import { setValue } from "../../../client/controllers/state";
import { Delay } from "../../utils/tools";
import { Vector } from "../../classes/vector";

export const teleportMarker: CommandData = {
    name: 'teleportMarker',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData) {
        const blip = GetFirstBlipInfoId(8);
        if (!DoesBlipExist(blip)) {
            emit('DoLongHudText', 'Failed to find marker.', 2);
            return 'Failed to find marker';
        }
        const blipCoords = GetBlipInfoIdCoord(blip);
        const coords = new Vector(blipCoords[0], blipCoords[1], blipCoords[2]);
        const playerPed = PlayerPedId();
        const playerCoords = GetEntityCoords(playerPed, false);
        setValue('lastCoords', [
            playerCoords[0],
            playerCoords[1],
            playerCoords[2]
        ]);
        for (let i = 1; i < 1000; i++) {
            SetPedCoordsKeepVehicle(playerPed, coords.x, coords.y, i + 0);
            const groundZ = GetGroundZFor_3dCoord(coords.x, coords.y, i + 0, false);
            if (groundZ[0]) {
                SetPedCoordsKeepVehicle(playerPed, coords.x, coords.y, i + 0);
                break;
            }
            await Delay(5);
        }
        return '' + coords.x + ' ' + coords.y + ' ' + coords.z;
    },
    log: 'Teleported to Marker. ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Teleport Marker',
                cat: 'Player',
                child: null,
            },
            options: {
                bindKey: {
                    value: null,
                    options: [],
                },
            },
        },
    },
};
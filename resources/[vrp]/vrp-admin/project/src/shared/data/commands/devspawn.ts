import { RankValue } from "../../classes/enums";

export const devspawn: CommandData = {
    name: 'devspawn',
    value: RankValue.dev,
    executedFunction: async function cmdDefault() {
        const playerPed = PlayerPedId();
        const playerCoords = GetEntityCoords(playerPed, false);
        const playerHeading = GetEntityHeading(playerPed);

        const coords = {
            x: playerCoords[0],
            y: playerCoords[1],
            z: playerCoords[2],
            w: playerHeading
        };

        global.exports.storage.setDev(coords, 'devspawn');
        return '' + coords.x + ' ' + coords.y + ' ' + coords.z;
    },
    log: 'Changed their dev spawn. ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Dev Spawn',
                cat: 'Utility',
                child: null,
            },
            options: { bindKey: null },
        },
    },
    closeMenu: true,
};
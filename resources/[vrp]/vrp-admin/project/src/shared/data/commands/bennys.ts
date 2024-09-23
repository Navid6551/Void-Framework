import { RankValue } from "../../classes/enums";

export const bennys: CommandData = {
    name: 'bennys',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData) {
        const playerCoords = GetEntityCoords(GetPlayerPed(pUser.source));
        global.exports["vrp-bennys"].enterLocationDev(playerCoords);
        return '';
    },
    log: '  Opened Bennys.',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Bennys',
                cat: 'Utility',
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
    closeMenu: true,
};
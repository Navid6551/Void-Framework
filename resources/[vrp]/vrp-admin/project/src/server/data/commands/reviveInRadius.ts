import { GetDistance } from "@shared/utils/tools";
import { RankValue } from "../../../shared/classes/enums";

export const reviveInRadius: CommandData = {
    name: 'reviveInRadius',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData) {
        const players = getPlayers();
        const ply = GetPlayerPed(pUser.source);
        const plyCoords = GetEntityCoords(ply, false);

        Object.entries(players).forEach(([index, src]: any) => {
            const target = GetPlayerPed(src);
            const targetCoords = GetEntityCoords(target, false);
            const distance = GetDistance(plyCoords, targetCoords);
            if (distance < 50)  {
                emit("vrp-death:reviveSV", Number(src));
                emit("reviveGranted", Number(src));
                emit("ems:healplayer", Number(src));
            }
        });

        return '';
    },
    log: 'Revived in Radius',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Revive in Radius',
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
    blockClientLog: true,
};
import { RankValue } from "../../../shared/classes/enums";

export const revive: CommandData = {
    name: 'revive',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: TargetData) {
        const target = pArgs?.TargetUser ? pArgs.TargetUser.source : pUser.source;

        emit("vrp-death:reviveSV", Number(target));
        emit("reviveGranted", Number(target));
        emit("ems:healplayer", Number(target));
        emit("vrp-admin:sendLog", "reviveTarget", false, target);

        return '' + pArgs?.TargetUser ? pArgs.TargetUser.source.toString() : pUser.source.toString() + ')';
    },
    log: 'Revived (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Revive',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot'],
                }
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};
import { RankValue } from "../../../shared/classes/enums";

interface ResetWorldArgs {
    Target: Target;
}

export const resetWorld: CommandData = {
    name: 'resetWorld',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: ResetWorldArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to reset world. Target does not exist.';

        global.exports['vrp-infinity'].ResetWorld(target.source);

        return '';
    },
    log: 'Restted World.',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Reset World',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};
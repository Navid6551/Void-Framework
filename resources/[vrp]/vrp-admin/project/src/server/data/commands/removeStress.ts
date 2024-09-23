import { RankValue } from "../../../shared/classes/enums";

export const removeStress: CommandData = {
    name: 'removeStress',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: TargetData) {
        const target: null | Target | UserData = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to remove stress. Target does not exist.';

        emit('server:setStress', target.source, 0);

        return pArgs?.Target !== undefined ? ` for ${target.name}` : `.`;
    },
    log: 'Removed Stress',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Remove Stress',
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
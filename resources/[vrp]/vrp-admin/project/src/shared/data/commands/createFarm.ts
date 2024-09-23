import { RankValue } from "../../classes/enums";

interface CreateFarmArgs {
    Free: boolean;
    'Fruit whitelist': boolean;
}

export const createFarm: CommandData = {
    name: 'createFarm',
    value: RankValue.helper,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: CreateFarmArgs) {
        emit('vrp-farming:create-farm', pArgs.Free, pArgs['Fruit whitelist']);
        return '';
    },
    log: ' Created Farm ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Create Farm',
                cat: 'Utility',
                child: {
                    checkBox: ['Free', 'Fruit whitelist'],
                },
            },
            options: { bindKey: null },
        },
    },
    closeMenu: true,
};
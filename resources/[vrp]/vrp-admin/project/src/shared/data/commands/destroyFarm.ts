import { RankValue } from "../../classes/enums";

interface DestroyFarmArgs { }

export const destroyFarm: CommandData = {
    name: 'destroyFarm',
    value: RankValue.helper,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: DestroyFarmArgs) {
        emit('vrp-farming:destroy-farm');
        return '';
    },
    log: ' Farm Destroyed ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: { title: 'Destroy Farm', cat: 'Utility' },
            options: { bindKey: null },
        },
    },
    closeMenu: true,
};
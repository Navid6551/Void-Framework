import { RankValue } from "../../classes/enums";

interface RockstarEditorArgs { }

export const rockstarEditor: CommandData = {
    name: 'rockstarEditor',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: RockstarEditorArgs) {
        emit('vrp-admin:editor:toggle');
        return '';
    },
    log: ' Toggle Rockstar Editor ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Rockstar Editor',
                cat: 'Utility',
            },
            options: { bindKey: null },
        },
    },
    closeMenu: true,
};
import { RankValue } from "../../classes/enums";

interface CreateBookArgs { }

export const createBook: CommandData = {
    name: 'createBook',
    value: RankValue.helper,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: CreateBookArgs) {
        emit('vrp-books:writeBook', true);
        return '';
    },
    log: ' Opened Create Book ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: { title: 'Create Book', cat: 'Utility' },
            options: { bindKey: null },
        },
    },
    closeMenu: true,
};
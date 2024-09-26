import { RankValue } from "../../classes/enums";

interface AddNewGangArgs {
    code: string;
    gangName: string;
    leader: number
}

export const addNewGang: CommandData = {
    name: 'addNewGang',
    value: RankValue.admin,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: AddNewGangArgs) {

        const [success, message] = global.exports['vrp-gangsystem'].CreateNewGang(pArgs)
        if (!success) {
            return message
        }

        return `Name: ${pArgs.code}, Leader: ${pArgs.leader}`;
    },
    log: ' Created New Gang () ',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Create New Gang',
                cat: 'Utility',
                child: {
                    inputs: ['code', 'gangName', 'leader'],
                },
            },
            options: { bindKey: null },
        },
    },
    closeMenu: true,
};
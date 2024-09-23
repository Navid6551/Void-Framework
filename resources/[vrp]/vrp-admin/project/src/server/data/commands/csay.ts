import { RankValue } from "../../../shared/classes/enums";

interface CsayArgs {
    Text: string;
}

export const csay: CommandData = {
    name: 'csay',
    value: RankValue.admin,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: CsayArgs) {
        emitNet("chatMessage", -1, "Admin", 1, pArgs.Text);
        return '' + pArgs.Text + ')';
    },
    log: 'sent announcement (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'cSay',
                cat: 'Utility',
                child: {
                    inputs: ['Text'],
                }
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};
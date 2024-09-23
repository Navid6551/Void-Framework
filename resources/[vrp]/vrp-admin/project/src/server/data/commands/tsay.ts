import { RankValue } from "../../../shared/classes/enums";

interface TsayArgs {
    Text: string;
}

export const tsay: CommandData = {
    name: 'tsay',
    value: RankValue.admin,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: TsayArgs) {
        emitNet("pNotify:SendNotification", -1, {
            text: `<center><span style="font-size:28px;color:red;">${pArgs.Text}<br /><hr style="border-color: rgba(255, 0, 0, 0.5);">${pArgs.Text}</span></center>`,
            layout: "top",
            timeout: 15000,
            type: "error",
            animation: {
                open: "gta_effects_fade_in",
                close: "gta_effects_fade_out"
            },
            queue: "announcement",
            progressBar: false
        });
        return '' + pArgs.Text + ')';
    },
    log: 'sent notification (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'tSay',
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
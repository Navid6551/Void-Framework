import { RankValue } from "../../../shared/classes/enums";

interface TempBanArgs {
    Length: string;
    Target: Target;
}

export const tempBan: CommandData = {
    name: 'tempBan',
    value: RankValue.admin,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: TempBanArgs) {
        console.log("tempBan", pArgs);
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to temp ban. Target does not exist.';
        const length = pArgs?.Length;
        if (!length) return 'Failed to temp ban. Length not specified.';

        //Length is in days.

        return '' + '-' + GetPlayerName(target.source) + '-';
    },
    log: 'Temp banned ',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Temp Ban',
                cat: 'Player',
                child: {
                    inputs: ['Target', 'Length'],
                }
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};
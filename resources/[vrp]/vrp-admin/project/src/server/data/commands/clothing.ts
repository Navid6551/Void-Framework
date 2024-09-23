import { RankValue } from "../../../shared/classes/enums";

export const clothing: CommandData = {
    name: 'clothing',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: TargetData) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to open clothing menu. Target does not exist.';

        emitNet('raid_clothes:admin:open', target.source, 'clothing_shop');

        return '' + '-' + GetPlayerName(target.source) + '-';
    },
    log: 'Opened Clothing Menu for ',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Clothing',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot'],
                }
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
    closeMenu: true,
};
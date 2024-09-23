import { RankValue } from "../../../shared/classes/enums";

interface KickArgs {
    Reason: string;
    Target: Target;
}

export const kick: CommandData = {
    name: 'kick',
    value: RankValue.mod,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: KickArgs) {
        const target: null | Target | UserData = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to kick. Target does not exist.';
        const reason = pArgs?.Reason;
        if (!reason) return 'Failed to kick. Reason is empty.';

        DropPlayer(target.source.toString(), reason);

        return '' + target.name + '- for ' + '(' + reason + ')';
    },
    log: 'Kicked -',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Kick',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot', 'Reason'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};
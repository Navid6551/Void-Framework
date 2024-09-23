import { Base } from "@vpx/server";
import { RankValue } from "../../../shared/classes/enums";

interface TwatArgs {
    Twat: string;
    Target: Target;
}

export const twat: CommandData = {
    name: 'twat',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: TwatArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to send twat. Target does not exist.';
        const twat = pArgs?.Twat;
        if (!twat) return 'Failed to send twat. Twat is empty.';

        const user: User = await Base.getModule<PlayerModule>("Player").GetUser(target.source);
        if (!user) return 'Failed to send twat. User is invalid.';

        global.exports["vrp-phone"].addTwatterEntry(user.character.id, user.character.first_name, user.character.last_name, twat);

        return '' + twat + ') as ' + '-' + target.name + '-';
    },
    log: 'Twatted (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Twat',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot', 'Twat'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};
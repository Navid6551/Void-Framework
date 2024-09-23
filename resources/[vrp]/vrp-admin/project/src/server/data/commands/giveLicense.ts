import { RankValue } from "../../../shared/classes/enums";
import { Base } from "@vpx/server";

interface GiveLicenseArgs {
    License: string;
    Target: Target;
}

export const giveLicense: CommandData = {
    name: 'giveLicense',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: GiveLicenseArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to give license. Target does not exist.';
        if (!pArgs.License) return 'Failed to give license. No license specified.';

        const user: User = Base.getModule<PlayerModule>('Player').GetUser(target.source);
        if (!user) return 'Failed to give license. Target does not exist.';

        const update = await SQL.execute('UPDATE user_licenses SET status = @status WHERE cid = @cid AND type = @type', {
            status: 1,
            cid: user.character.id,
            type: pArgs.License
        });
        if (!update) return 'Failed to give license.';

        return '' + pArgs.License + ') to ' + '-' + target.name + '-';
    },
    log: 'Gave License (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Give License',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot', 'License'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};
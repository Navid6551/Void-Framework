import { Base } from "@vpx/server";
import { RankValue } from "../../../shared/classes/enums";

interface GiveCashArgs {
    Amount: number;
    Target: Target;
}

export const giveCash: CommandData = {
    name: 'giveCash',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: GiveCashArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to give license. Target does not exist.';
        const amount = Number(pArgs.Amount);
        if (!amount || amount < 0) return 'Failed to give cash. No amount specified.';

        const user: User = Base.getModule<PlayerModule>('Player').GetUser(target.source);
        if (!user) return 'Failed to give cash. Target does not exist.';

        user.addMoney(amount ?? 100);

        return '' + pArgs.Amount + ')';
    },
    log: 'Gave Cash (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Give Cash',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot', 'Amount'],
                },
            },
            options: { bindKey: null },
        },
    },
    blockClientLog: true,
};
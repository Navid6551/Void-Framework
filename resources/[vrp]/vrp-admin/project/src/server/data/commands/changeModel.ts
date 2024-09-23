import { RankValue } from "../../../shared/classes/enums";

interface ChangeModelArgs {
    Model: string;
    Target: Target;
}

export const changeModel: CommandData = {
    name: 'changeModel',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: ChangeModelArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to change model. Target does not exist.';
        if (!pArgs.Model) return 'Failed to change model. No model specified.';

        emitNet('raid_clothes:AdminSetModel', target.source, pArgs.Model);
        emitNet('vrp-admin:raid_clothes:model', target.source, pArgs.Model);

        return '' + '-' + GetPlayerName(target.source) + '-' + ' model to ' + pArgs.Model + '.';
    },
    log: 'Changed ',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Change Model',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot', 'Model'],
                }
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
    closeMenu: true,
};
import { RankValue } from "../../../shared/classes/enums";

interface SetWorldArgs {
    World: string;
    Target: Target;
}

export const setWorld: CommandData = {
    name: 'setWorld',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: SetWorldArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to set world. Target does not exist.';
        if (!pArgs.World) return 'Failed to set world. No world specified.';

        global.exports['vrp-infinity'].SetWorld(target.source, pArgs.World, 'inactive', true);

        return '' + pArgs.World + ')';
    },
    log: 'Set World (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Set World',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot', 'World'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};
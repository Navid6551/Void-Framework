import { RankValue } from "../../classes/enums";
import { getValue, setValue } from "../../../client/controllers/state";
import { toggleNoclip } from "../../../client/controllers/commands/noclip";

interface NoclipArgs {
    toggle: boolean;
}

export const noclip: CommandData = {
    name: 'noclip',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: NoclipArgs) {
        let toggle = false;
        if (pArgs.toggle != null) {
            toggle = pArgs.toggle;
        }

        const value = getValue('cloak');
        emit('attachedItems:block', value || toggle);
        setValue('noclip', toggle);
        toggleNoclip();
        return '' + toggle + ')';
    },
    log: 'Nocliped (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Noclip',
                cat: 'Player',
                child: false,
            },
            options: {
                bindKey: {
                    value: null,
                    options: [],
                },
            },
        },
    },
    blockClientLog: true,
};
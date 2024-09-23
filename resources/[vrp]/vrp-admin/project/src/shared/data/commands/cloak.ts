import { RankValue } from "../../classes/enums";
import { getValue, setValue } from "../../../client/controllers/state";

interface CloakArgs {
    toggle: boolean;
}

export const cloak: CommandData = {
    name: 'cloak',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: CloakArgs) {
        let isCloaked = false;
        if (pArgs.toggle != null) {
            isCloaked = pArgs.toggle;
        }

        const value = getValue('noclip');

        emit('attachedItems:block', value || isCloaked);

        setValue('cloak', isCloaked);

        RPC.execute('vrp:admin:cloak', isCloaked);

        emit('vrp-admin:cloakStatus', isCloaked);

        return '' + isCloaked + ')';
    },
    log: 'Toggled Cloaked (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: { title: 'Cloak', cat: 'Player', child: false },
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
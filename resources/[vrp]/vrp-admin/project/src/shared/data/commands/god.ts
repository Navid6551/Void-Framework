import { RankValue } from "../../classes/enums";
import { toggleGodMode } from "../../../client/controllers/commands/godMode";

interface GodArgs {
    toggle: boolean;
}

export const god: CommandData = {
    name: 'god',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: GodArgs) {
        let toggle = false;
        if (pArgs.toggle != null) {
            toggle = pArgs.toggle;
        }
        toggleGodMode(toggle);
        return '' + toggle + ')';
    },
    log: 'set into god mode (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'God',
                cat: 'Player',
                child: false,
            },
            options: {
                bindKey: { value: null, options: [] },
            },
        },
    },
};
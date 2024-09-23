import { RankValue } from "../../classes/enums";
import { setValue } from "../../../client/controllers/state";
import { toggleDebugMode } from "../../../client/controllers/commands/debug";

interface DebugArgs {
    toggle: boolean;
}

export const debug: CommandData = {
    name: 'debug',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: DebugArgs) {
        let toggle = false;
        if (pArgs.toggle != null) {
            toggle = pArgs.toggle;
        }
        setValue('debug', toggle);
        toggleDebugMode(toggle);
        return '' + toggle + ')';
    },
    log: 'Toggled Debug Mode (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Debug Mode',
                cat: 'Utility',
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
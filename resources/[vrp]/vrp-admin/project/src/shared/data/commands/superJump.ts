import { RankValue } from "../../classes/enums";
import { setValue } from "../../../client/controllers/state";
import { toggleSuperJump } from "../../../client/controllers/commands/superJump";

interface SuperJumpArgs {
    toggle: boolean;
}

export const superJump: CommandData = {
    name: 'superJump',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: SuperJumpArgs) {
        let toggle = false;
        if (pArgs.toggle != null) {
            toggle = pArgs.toggle;
        }
        setValue('superJump', toggle);
        toggleSuperJump(toggle);
        return '' + toggle + ')';
    },
    log: 'SuperJummped (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'SuperJump',
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
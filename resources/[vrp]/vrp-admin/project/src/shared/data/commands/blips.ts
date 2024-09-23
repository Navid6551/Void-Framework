import { RankValue } from "../../classes/enums";
import { enableBlips } from "../../../client/controllers/commands/blip";
import { setValue } from "../../../client/controllers/state";

interface BlipArgs {
    toggle: boolean;
}

export const blips: CommandData = {
    name: 'blips',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: BlipArgs) {
        let isBlip = false;
        if (pArgs.toggle != null) {
            isBlip = pArgs.toggle;
        }

        setValue('blips', isBlip);

        enableBlips(isBlip, isBlip);

        return '' + isBlip + ')';
    },
    log: 'Toggled Blips (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: { title: 'Player Blips', cat: 'Player', child: false },
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
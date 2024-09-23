import { RankValue } from "../../classes/enums";
import { setValue } from "../../../client/controllers/state";

interface InteriorSprintArgs {
    toggle: boolean;
}

export const interiorSprint: CommandData = {
    name: 'interiorSprint',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: InteriorSprintArgs) {
        let toggle = false;
        if (pArgs.toggle != null) {
            toggle = pArgs.toggle;
        }
        setValue('interiorSprint', toggle);
        SetPedConfigFlag(PlayerPedId(), 427, toggle);
        return '' + toggle + ')';
    },
    log: 'Interior Sprint (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Interior Sprint',
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
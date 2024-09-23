import { getValue, setValue } from "../../../client/controllers/state";
import { RankValue } from "../../classes/enums";

interface SprintArgs {
    toggle: boolean;
}

export const sprint: CommandData = {
    name: 'sprint',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: SprintArgs) {
        let toggle = false;
        if (pArgs.toggle != null) {
            toggle = pArgs.toggle;
        }
        setValue('sprint', toggle);
        if (toggle && await getValue('sprintTimer') != null) {
            return '' + toggle + ')';
        } else {
            if (!toggle) {
                stopSprint();
                return '' + toggle + ')';
            }
        }
        await setValue('sprintTimer', setInterval(startSprint, 10));
        async function startSprint() {
            RestorePlayerStamina(PlayerId(), 100);
        }
        async function stopSprint() {
            clearInterval(await getValue('sprintTimer'));
            await setValue('sprintTimer', null);
            ResetPlayerStamina(PlayerId());
        }
        return '' + toggle + ')';
    },
    log: 'set unlimited sprint (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Unlimited Sprint',
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
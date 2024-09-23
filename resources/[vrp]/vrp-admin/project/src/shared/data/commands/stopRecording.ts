import { RankValue } from "../../classes/enums";

interface StopRecordingArgs { }

export const stopRecording: CommandData = {
    name: 'stopRecording',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: StopRecordingArgs) {
        emit('vrp-admin:editor:stop');
        return '';
    },
    log: ' Stopped recording ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Stop recording',
                cat: 'Utility',
            },
            options: { bindKey: null },
        },
    },
    closeMenu: true,
};
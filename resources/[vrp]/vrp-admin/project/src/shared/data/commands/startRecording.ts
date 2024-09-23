import { RankValue } from "../../classes/enums";

interface StartRecordingArgs { }

export const startRecording: CommandData = {
    name: 'startRecording',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: StartRecordingArgs) {
        emit('vrp-admin:editor:start');
        return '';
    },
    log: ' Started recording ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Start recording',
                cat: 'Utility',
            },
            options: { bindKey: null },
        },
    },
    closeMenu: true,
};
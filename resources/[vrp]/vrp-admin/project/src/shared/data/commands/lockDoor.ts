import { RankValue } from "../../classes/enums";

interface LockDoorArgs {
    Entity: number;
}

export const lockDoor: CommandData = {
    name: 'lockDoor',
    value: RankValue.special,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: LockDoorArgs) {
        const doorId = global.exports['vrp-doors'].GetTargetDoorId(pArgs.Entity);
        if (!doorId) return 'Failed to lock door. Door does not exist.';
        emitNet('vrp-doors:change-lock-state', doorId, true);
        return 'Locked door ' + doorId;
    },
    log: '',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Lock Door',
            child: null,
            action: '',
            entityType: 3,
            unlockedDoor: true,
        },
    },
};
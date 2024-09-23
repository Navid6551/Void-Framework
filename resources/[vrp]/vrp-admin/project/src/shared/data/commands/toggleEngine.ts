import { RankValue } from "../../classes/enums";

interface ToggleEngineArgs {
    Entity: number;
}

export const toggleEngine: CommandData = {
    name: 'toggleEngine',
    value: RankValue.special,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: ToggleEngineArgs) {
        const entity = pArgs.Entity;
        if (!entity || !DoesEntityExist(entity)) return 'Invalid Entity.';
        const isVehicleRunning = GetIsVehicleEngineRunning(entity);
        const running = !isVehicleRunning;
        running ? global.exports['vrp-sync'].SyncedExecution('SetVehicleEngineOn', entity, true, false, true) : (global.exports['vrp-sync'].SyncedExecution('SetVehicleUndriveable', entity, true), global.exports['vrp-sync'].SyncedExecution('SetVehicleEngineOn', entity, false, false, true));
        return running + ').';
    },
    log: 'Toggled Engine (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Toggle Engine',
            child: null,
            action: '',
            entityType: 2,
        },
    },
    blockClientLog: true,
};
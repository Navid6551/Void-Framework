import { RankValue } from "../../classes/enums";

interface PopTireArgs {
    Entity: number;
}

const vehicleTires = [0, 1, 2, 3, 4, 5, 45, 47];

export const popTire: CommandData = {
    name: 'popTire',
    value: RankValue.special,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: PopTireArgs) {
        const entity = pArgs.Entity;
        if (!entity || !DoesEntityExist(entity)) return 'Failed to pop tire. Entity does not exist.';
        for (const tire of vehicleTires) {
            if (GetTyreHealth(entity, tire) > 0 && !IsVehicleTyreBurst(entity, tire, false)) {
                global.exports['vrp-sync'].SyncedExecution('SetVehicleTyreBurst', entity, tire, true, 1000);
                return '';
            }
        }
        return '';
    },
    log: 'Popped Tire.',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Pop Tire',
            child: null,
            action: '',
            entityType: 2,
        },
    },
    blockClientLog: true,
};
import { RankValue } from "../../classes/enums";
import { Procedures } from "@vpx/client";
import { Delay } from "../../utils/tools";

interface DeleteEntityArgs {
    Entity: number;
}

export const deleteEntity: CommandData = {
    name: 'deleteEntity',
    value: RankValue.admin,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: DeleteEntityArgs) {
        global.exports['vrp-sync'].SyncedExecution('DeleteEntity', +pArgs.Entity);
        const object = global.exports['vrp-objects'].GetObjectByEntity(+pArgs.Entity);
        if (object != null) {
            await RPC.execute('vrp-objects:DeleteObject', object.id); //Procedures
        } else {
            await Delay(250);
            if (DoesEntityExist(+pArgs.Entity)) {
                global.exports['vrp-sync'].SyncedExecution('SetEntityCoords', +pArgs.Entity, 0, 0, 0);
            }
            emit('vrp:admin:updateUI');
        }
        return '[' + pArgs.Entity + ']';
    },
    log: 'Deleted Entity ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Delete Entity',
            child: null,
            action: '',
            entityType: -1,
        },
        adminMenu: {
            command: {
                title: 'Delete Entity',
                cat: 'Player',
                child: {
                    inputs: ['Entity'],
                },
            },
            options: { bindKey: null },
        },
    },
};
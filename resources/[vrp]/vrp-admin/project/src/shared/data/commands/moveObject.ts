import { RankValue } from "../../classes/enums";

interface MoveObjectModelArgs {
    Entity: number;
}

export const MoveObject: CommandData = {
    name: 'MoveObject',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: MoveObjectModelArgs) {
        const object = global.exports['vrp-objects'].GetObjectByEntity(+pArgs.Entity);
        if (!object?.id) return 'Failed to move object. No synced object found for this entity.';
        global.exports['vrp-objects'].MoveObject(object.id, {
            groundSnap: true,
            useModelOffset: true,
            adjustZ: true,
            distance: 25,
            maxDistance: 400,
            allowGizmo: true,
            startPinned: true,
            startWithGizmo: true
        });
        return 'Moved Object [' + object.id + '].';
    },
    log: '',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Move Object',
            child: null,
            action: '',
            entityType: 3,
            syncedObject: true
        }
    },
    closeMenu: true,
};
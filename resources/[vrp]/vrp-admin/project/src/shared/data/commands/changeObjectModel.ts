import { RankValue } from "../../classes/enums";

interface ChangeObjectModelArgs {
    Entity: number;
    Model: string | number;
}

export const ChangeObjectModel: CommandData = {
    name: 'ChangeObjectModel',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: ChangeObjectModelArgs) {
        const object = global.exports['vrp-objects'].GetObjectByEntity(+pArgs.Entity);
        if (!object?.id) return 'Failed to change model. No synced object found for this entity.';
        const model = typeof pArgs.Model === 'string' ? GetHashKey(pArgs.Model) : pArgs.Model;
        if (!pArgs.Model || !IsModelValid(model)) return 'Failed to change model. Provided model is invalid.';

        global.exports['vrp-objects'].MoveObject(object.id, {
            groundSnap: true,
            useModelOffset: true,
            adjustZ: true,
            distance: 25,
            maxDistance: 400,
            allowGizmo: true,
            startPinned: true,
            startWithGizmo: true
        }, () => true, model);

        return 'Changed Object Model [' + object.id + '].';
    },
    log: '',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Change Object Model',
            child: {
                inputs: { Model: 'text' },
            },
            action: '',
            entityType: 3,
            syncedObject: true,
        },
    },
    closeMenu: true,
};
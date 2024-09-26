import { PolyZone } from "@shared/classes/polyzone";
import { Vector3 } from "@shared/classes/vector";
import { calculateDistance, loadModel, removeEntity } from "@shared/utils/tools";
import { deleteObject, TaskQueue } from "client/util/tools";

// Initialize key bindings for various actions
export async function initEvents() {
    global.exports['vrp-keybinds'].registerKeyMapping('', 'Objects', 'Cursor Select', '+gizmoSelect', '-gizmoSelect', 'MOUSE_BUTTON');
    global.exports['vrp-keybinds'].registerKeyMapping('', 'Objects', 'Translation', '+gizmoTranslation', '-gizmoTranslation', 'E');
    global.exports['vrp-keybinds'].registerKeyMapping('', 'Objects', 'Rotation', '+gizmoRotation', '-gizmoRotation', 'R');
    global.exports['vrp-keybinds'].registerKeyMapping('', 'Objects', 'Local', '+gizmoLocal', '-gizmoLocal', 'Q');
}

export const objectMap = new Map<number, any>();
export const entityMap = new Map<number, number>();
export const namespaceMap = new Map<string, any>();
export const objectLoader = new TaskQueue();
export let visibleObjects: any[] = [];

export async function spawnObject(object: any): Promise<number> {
    console.log(`[OBJECTS] Spawning object ${object.id} at ${object.x},${object.y},${object.z}`);
    await loadModel(object.data.model);

    if (!HasModelLoaded(object.data.model)) {
        throw new Error(`Unable to load model ${object.data.model} (id: ${object.id}) at ${object.x},${object.y},${object.z}`);
    }

    const entityId = CreateObjectNoOffset(
        object.data.model,
        object.x,
        object.y,
        object.z,
        false,
        false,
        false
    );

    SetEntityRotation(entityId, object.data.rotation.x, object.data.rotation.y, object.data.rotation.z, 2, true);
    FreezeEntityPosition(entityId, object.data.metadata.freeze ?? true);
    Entity(entityId).state.DontClear = true;
    SetEntityAsMissionEntity(entityId, true, true);
    SetModelAsNoLongerNeeded(object.data.model);

    return entityId;
}

export const AddVisibleObject = async(data: any) => {
    const object = objectMap.get(data.id);
    if (!object) return false;

    console.log(`[OBJECTS] Entered zone (ID: ${data.id})`);
    emit('vrp-objects:objectCreating', object);
    if (WasEventCanceled()) return false;

    if (object.data.model === 0) return false;

    if (namespaceMap.has(object.id)) {
        namespaceMap.delete(object.id);
    }

    entityMap.forEach((objId, entityId) => {
        if (objId === object.id) {
            entityMap.delete(entityId);
        }
    });

    console.log(`[OBJECTS] Attempting to create object (ID: ${object.id})`);
    const newEntityId = await spawnObject(object);
    namespaceMap.set(object.id, newEntityId);
    entityMap.set(newEntityId, object.id);

    visibleObjects.push({
        id: object.id,
        vector: { x: object.x, y: object.y, z: object.z },
    });

    emit('vrp-objects:objectCreated', object, newEntityId);

    return true
}

export const getObject = (id: number) => {
    return objectMap.get(id);
};

export const getObjectByEntity = (entityId: number) => {
    const objectId = entityMap.get(entityId);
    if (!objectId) return null;
    return objectMap.get(objectId);
};

export const getObjectsByNamespace = (namespace: string) => {
    return [...objectMap.values()].filter(object => {
        return object.ns === namespace
    });
};

RegisterCommand('nameSpace', () => {
    console.log('get this shit')
    console.log([...objectMap.values()])
}, false)

export const getEntityByObjectId = (objectId: any): any | undefined => {
    return namespaceMap.get(objectId);
};

export const updateObject = async (objectId: number, x: number, y: number, z: number, rotation: any, metadata: any) => {
    return await RPC.execute('vrp-objects:UpdateObject', objectId, x, y, z, rotation, metadata);
};

export const removeObject = async (objectId: number) => {
    return await RPC.execute('vrp-objects:DeleteObject', objectId);
};

export const getVisibleEntities = () => {
    return Array.from(visibleObjects.values());
};

export const getvisibleObjects = (namespace?: string) => {
    const objects = [...visibleObjects.keys()].map(entityId => objectMap.get(entityId));
    if (!namespace) return objects;
    return objects.filter(object => object.ns === namespace);
};

export async function addObject(object: any, withinProximity: boolean = false) {
    console.log(`[OBJECTS] Adding object (ID: ${object.id})`);

    if (!object.data || !object.data.builder) return;

    objectMap.set(object.id, object);

    emit('vrp-objects:objectLoaded', object);

    return await AddVisibleObject(object)
}


onNet('vrp-objects:loadDynamicObjects', async (objects: any[]) => {
    objects.forEach(async(object) => {
        await addObject(object, true)
    });
    console.log(`[OBJECTS] Loaded ${objects.length} objects.`);
});

onNet('vrp-objects:addNewObject', addObject)

onNet('vrp-objects:removeDynamicObject', async (objectId: any) => {
    const object = objectMap.get(objectId);
    const entityId = namespaceMap.get(objectId);

    if (object && !entityId) {
        console.log(`[OBJECTS] Removing object (ID: ${objectId})`);
        objectMap.delete(objectId);
    } else if (object && entityId) {
        console.log(`[OBJECTS] Removing object (ID: ${objectId}) [${entityId}] | Exists: ${DoesEntityExist(entityId)}`);
        emit('vrp-objects:objectDeleting', object, entityId);
        if (WasEventCanceled()) return;
        emit('vrp-objects:objectDeleted', object, entityId);
        await deleteObject(entityId);
        namespaceMap.delete(objectId);
        entityMap.delete(entityId);
        objectMap.delete(objectId);   
    }
});

onNet('vrp-objects:updateDynamicObjects', async (updatedObject: any) => {
    const objectId = updatedObject.id;
    const newData = updatedObject.data;
    const newCoords = updatedObject.newCoords;
    const existingObject = objectMap.get(objectId);
    const existingEntity = namespaceMap.get(objectId);

    console.log(`[OBJECTS] Updating object (ID: ${objectId}) [${existingEntity}] | Old Model: ${existingObject?.data?.model} | New Model: ${newData?.model}`);

    if (existingObject && !existingEntity) {
        existingObject.data = {
            builder: newData.builder,
            model: newData.model,
            rotation: newData.rotation,
            metadata: newData.metadata,
        };

        if (newCoords) {
            existingObject.x = newCoords.x;
            existingObject.y = newCoords.y;
            existingObject.z = newCoords.z;
        }

        objectMap.set(objectId, existingObject);
    } else if (existingObject && existingEntity) {
        existingObject.data = {
            builder: newData.builder,
            model: newData.model,
            rotation: newData.rotation,
            metadata: newData.metadata,
        };

        if (newCoords) {
            existingObject.x = newCoords.x;
            existingObject.y = newCoords.y;
            existingObject.z = newCoords.z;

            SetEntityCoords(existingEntity, existingObject.x, existingObject.y, existingObject.z, false, false, false, false);
            SetEntityRotation(existingEntity, existingObject.data.rotation.x, existingObject.data.rotation.y, existingObject.data.rotation.z, 2, true);
            objectMap.set(objectId, existingObject);
        }

        emit('vrp-objects:objectUpdated', existingObject, existingEntity);

        emit('vrp-objects:objectRecreating', existingObject, existingEntity);
        if (WasEventCanceled()) return;

        deleteObject(existingEntity);

        const newEntity = await spawnObject(existingObject);
        namespaceMap.set(objectId, newEntity);
        entityMap.delete(existingEntity);
        entityMap.set(newEntity, objectId);

        emit('vrp-objects:objectRecreated', existingObject, newEntity);
    }
});

// on('vrp-polyzone:enter', async (zoneName: string, data: any) => {
//     if (zoneName !== 'object_zone') return;

    
// });

// on('vrp-polyzone:exit', async (zoneName: string, data: any) => {
//     if (zoneName !== 'object_zone') return;

//     const object = objectMap.get(data.id);
//     const entityId = namespaceMap.get(object?.id!);

//     if (!object || !entityId || !DoesEntityExist(entityId)) return;

//     emit('vrp-objects:objectDeleting', object, entityId);
//     if (WasEventCanceled()) return;

//     console.log(`[OBJECTS] Deleting object (ID: ${data.id}) [${entityId}]`);
//     emit('vrp-objects:objectDeleted', object, entityId);
//     deleteObject(entityId);
//     namespaceMap.delete(object.id);
//     entityMap.delete(entityId);
// });

on('onResourceStop', async (resourceName: string) => {
    if (resourceName !== GetCurrentResourceName()) {
      return
    }
    for (const [entity, objectID] of entityMap) {
        console.log(
        '[OBJECTS] Deleting object (ID: ' +
        objectID +
          ') [' +
          entity +
          '] | Exists: ' +
          DoesEntityExist(entity)
      )
      deleteObject(entity)
      objectMap.delete(objectID)
    }
    entityMap.clear()
    namespaceMap.clear()
    visibleObjects = []
})


// Export functions
global.exports('GetObject', getObject);
global.exports('GetObjectByEntity', getObjectByEntity);
global.exports('GetVisibleEntities', getVisibleEntities);
global.exports('GetvisibleObjects', getvisibleObjects);
global.exports('GetEntityByObjectId', getEntityByObjectId);
global.exports('GetObjectsByNamespace', getObjectsByNamespace);
global.exports('DeleteObject', deleteObject);
global.exports('UpdateObject', updateObject);

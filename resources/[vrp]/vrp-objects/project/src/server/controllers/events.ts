import { Repository } from "./respository";
import { addObjectAndSave, allObjects, getObjectById, removeObject, updateObject } from "./object";

export async function InitEvents(): Promise<void> {
    // Initialize any necessary events here if needed
    // For now, it's an empty async function
}

RPC.register('vrp-objects:UpdateObject', async(src: number, objectId: any, pX: any, pY: any, pZ: any, pRotation: any, metadata: any) => {
    console.log(`[OBJECTS] Update Object - Source: ${src}, Object ID: ${objectId}`, `Metadata:`, metadata);

    const [dbOBject] = await Repository.getObjectById(objectId)
    const object = getObjectById(objectId)
    
    if (typeof pX === 'object') {
        for (const [k, v] of Object.entries(pX) as any) {
            object[k] = v
        }
    } else {
        object.newCoords = {
            x: pX,
            y: pY, 
            z: pZ
        }
    
        object.data.rotation = pRotation
        object.data.metadata = metadata
        object.data.coords = object.newCoords
    }
    
    if (dbOBject) {
        await Repository.updateObjectByID(objectId, object.data)
    }

    return updateObject(object)
});

RPC.register('vrp-objects:DeleteObject', async(pSource: number, objectId: number) => {
    const [success, message] = await Repository.removeObjectById(objectId)

    console.log(`[OBJECTS] Delete Object - Source: ${pSource}, Object ID: ${objectId}`, message);

    return removeObject(objectId)
});

RPC.register('vrp-objects:SaveObject', addObjectAndSave);

RPC.register('vrp-objects:SeedObjects', async (pSource: any) => {
    emitNet('vrp-objects:loadDynamicObjects', pSource, allObjects);
})
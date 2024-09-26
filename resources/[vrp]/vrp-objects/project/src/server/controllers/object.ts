import { Repository } from "./respository";
export const allObjects: any = [];
export async function InitObject() { }

export const loadAllObjects = async () => {
    console.log('[OBJECTS] LOADING ALL OBJECTS')
    const objects: any = await Repository.getObjects();

    const result = await Promise.all(objects.map((obj: any) => {
        const data = JSON.parse(obj.data);
        const coords = JSON.parse(obj.coords);
        const retData = {
            id: obj.id,
            ns: obj.ns,
            x: coords.x,
            y: coords.y,
            z: coords.z,
            coords: coords,
            data: data
        }
        allObjects.push(retData);
        return retData
    }))

    console.log('[OBJECTS] LOAD ('+ result.length +') OBJECT')

    return result
}

export const getObjectsByNamespace = (namespace: string) => {
    return allObjects.filter((object: any) => object.ns === namespace);
};

export const getObjectById = (pId: any) => {
    const find = allObjects.find((pItem: any) => {
        return pItem.id === pId
    })

    if (!find) {
        return false
    }

    return find
}

export const addObject = (object: any) => {
    const find = allObjects.find((pItem: any) => {
        return pItem.id === object.id
    })

    if (find) {
        return true
    }

    object.coords = {
        x: object.x,
        y: object.y,
        z: object.z
    };
    
    allObjects.push(object);
    emitNet('vrp-objects:addNewObject', -1, object)

    return true
}

export const updateObject = (object: any) => {
    const find = allObjects.findIndex((pItem: any) => {
        return pItem.id === object.id
    })

    if (find === -1) {
        return false
    }
    allObjects[find] = object
    
    emitNet('vrp-objects:updateDynamicObjects', -1, object)

    return true
}

export const removeObject = (objectId: any) => {
    const find = allObjects.findIndex((pItem: any) => {
        return pItem.id === objectId
    })

    if (find === -1) {
        return false
    }

    allObjects.splice(find, 1)
    emitNet('vrp-objects:removeDynamicObject', -1, objectId)

    return true
}

export const addObjectAndSave = async(pSource: number, category: string, modelName: string, coords: { x: number, y: number, z: number }, rotation: { x: number, y: number, z: number }, options: any, additionalData: any) => {
    console.log(`[OBJECTS] Save Object - Source: ${pSource}, Category: ${category}, Model Name: ${modelName}, Coordinates:`, coords, `Rotation:`, rotation, `Options:`, options, `Additional Data:`, additionalData);

    let object: any = {
        ns: category,
        x: coords.x,
        y: coords.y,
        z: coords.z,
        coords: {x: coords.x, y: coords.y, z: coords.z},
        data: {
            builder: pSource,
            model: modelName,
            rotation: rotation,
            metadata: options
        }
    };

    const [success, insertID] = await Repository.addObject(object)
    if(!success) {
        return false
    };

    object.id = insertID

    return addObject(object)
}

global.exports('addObject', addObject)
global.exports('addObjectAndSave', addObjectAndSave)
global.exports('deleteObject', removeObject)
global.exports('updateObject', updateObject)
global.exports('GetObject', getObjectById);
global.exports('GetObjectsByNamespace', getObjectsByNamespace);
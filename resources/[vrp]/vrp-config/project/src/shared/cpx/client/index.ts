export const Events = {
    on: (event: string, callback: Function) => {
        return CPX.Events.on(event, callback);
    },
    onNet: (event: string, callback: Function) => {
        return CPX.Events.onNet(event, callback);
    },
    emit: (event: string, ...args: any[]) => {
        return CPX.Events.emit(event, ...args);
    },
    emitNet: (event: string, ...args: any[]) => {
        return CPX.Events.emitNet(event, ...args);
    },
    remove: (event: string, callback: Function) => {
        return CPX.Events.remove(event, callback);
    }
}

export const Procedures = {
    register: (name: string, callback: Function) => {
        return CPX.Procedures.register(name, callback);
    },
    execute: (name: string, ...args: any[]) => {
        return CPX.Procedures.execute(name, ...args);
    }
}

export const Zones = {
    isActive: (zone: string, data: any) => {
        return CPX.Zones.isActive(zone, data);
    },
    onEnter: (zone: string, callback: Function) => {
        return CPX.Zones.onEnter(zone, callback);
    },
    onExit: (zone: string, callback: Function) => {
        return CPX.Zones.onExit(zone, callback);
    },
    addBoxZone: (id: string, zone: string, pCoords: any, pLength: number, pWidth: number, pOptions: any, pData = {}) => {
        return CPX.Zones.addBoxZone(id, zone, pCoords, pLength, pWidth, pOptions, pData);
    },
    addBoxTarget: (id: string, event: string, pCoords: any, pLength: number, pWidth: number, pOptions: any, pData = {}) => {
        return CPX.Zones.addBoxTarget(id, event, pCoords, pLength, pWidth, pOptions, pData);
    }
}

export const Streaming = {
    loadModel: (model: string) => {
        return CPX.Streaming.loadModel(model);
    },
    loadTexture: (texture: string) => {
        return CPX.Streaming.loadTexture(texture);
    },
    loadAnim: (anim: string) => {
        return CPX.Streaming.loadAnim(anim);
    },
    loadClipSet: (clipSet: string) => {
        return CPX.Streaming.loadClipSet(clipSet);
    },
    loadWeaponAsset: (weaponAsset: string, p1: any, p2: any) => {
        return CPX.Streaming.loadWeaponAsset(weaponAsset);
    },
    loadNamedPtfxAsset: (asset: string) => {
        return CPX.Streaming.loadNamedPtfxAsset(asset);
    }
}

export const Utils = {
    cache: (callback: any, options: any) => {
        return CPX.Utils.cache(callback, options);
    },
    cacheableMap: (callback: any, options: any) => {
        return CPX.Utils.cacheableMap(callback, options);
    },
    waitForCondition: (condition: any, timeout: number) => {
        return CPX.Utils.waitForCondition(condition, timeout);
    },
    getMapRange: (p1: any, p2: any, p3:any) => {
        return CPX.Utils.getMapRange(p1, p2, p3);
    },
    getDistance: ([x1, y1, z1]: number[], [x2, y2, z2]: number[]) => {
        return CPX.Utils.getDistance([x1, y1, z1], [x2, y2, z2]);
    },
    getRandomNumber: (min: number, max: number) => {
        return CPX.Utils.getRandomNumber(min, max);
    }
}

export const Interface = {
    addPeekEntryByModel: (model: string | string[] | number[], data: any, options: any) => {
        return CPX.Interface.addPeekEntryByModel(model, data, options);
    },
    addPeekEntryByTarget: (event: string, data: any, options: any) => {
        return CPX.Interface.addPeekEntryByTarget(event, data, options);
    },
    addPeekEntryByFlag: (flag: string[], data: any, options: any) => {
        return CPX.Interface.addPeekEntryByFlag(flag, data, options);
    },
    taskBar: (length: number, name: string, runCheck = false, moveCheck = null) => {
        return CPX.Interface.taskBar(length, name, runCheck, moveCheck);
    },
    phoneConfirmation: (title: string, text: string, icon?: string) => {
        return CPX.Interface.phoneConfirmation(title, text, icon);
    },
    phoneNotification: (app: string, title: string, body: string, showEvenIfActive = true) => {
        return CPX.Interface.phoneNotification(app, title, body, showEvenIfActive);
    }
}

export const Hud = {
    createBlip: (type: any, ...args: any) => {
        return CPX.Hud.createBlip(type, ...args);
    },
    applyBlipSettings: (blip: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any) => {
        return CPX.Hud.applyBlipSettings(blip, p1, p2, p3, p4, p5, p6, p7);
    }
}
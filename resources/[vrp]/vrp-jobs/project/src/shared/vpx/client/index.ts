export const Events = {
    on: (event: string, callback: Function) => {
        return VPX.Events.on(event, callback);
    },
    onNet: (event: string, callback: Function) => {
        return VPX.Events.onNet(event, callback);
    },
    emit: (event: string, ...args: any[]) => {
        return VPX.Events.emit(event, ...args);
    },
    emitNet: (event: string, ...args: any[]) => {
        return VPX.Events.emitNet(event, ...args);
    },
    remove: (event: string, callback: Function) => {
        return VPX.Events.remove(event, callback);
    }
}

export const Procedures = {
    register: (name: string, callback: Function) => {
        return VPX.Procedures.register(name, callback);
    },
    execute: (name: string, ...args: any[]) => {
        return VPX.Procedures.execute(name, ...args);
    }
}

export const Zones = {
    isActive: (zone: string, data: any) => {
        return VPX.Zones.isActive(zone, data);
    },
    onEnter: (zone: string, callback: Function) => {
        return VPX.Zones.onEnter(zone, callback);
    },
    onExit: (zone: string, callback: Function) => {
        return VPX.Zones.onExit(zone, callback);
    },
    addBoxZone: (id: string, zone: string, pCoords: any, pLength: number, pWidth: number, pOptions: any, pData = {}) => {
        return VPX.Zones.addBoxZone(id, zone, pCoords, pLength, pWidth, pOptions, pData);
    },
    addBoxTarget: (id: string, event: string, pCoords: any, pLength: number, pWidth: number, pOptions: any, pData = {}) => {
        return VPX.Zones.addBoxTarget(id, event, pCoords, pLength, pWidth, pOptions, pData);
    }
}

export const Streaming = {
    loadModel: (model: string) => {
        return VPX.Streaming.loadModel(model);
    },
    loadTexture: (texture: string) => {
        return VPX.Streaming.loadTexture(texture);
    },
    loadAnim: (anim: string) => {
        return VPX.Streaming.loadAnim(anim);
    },
    loadClipSet: (clipSet: string) => {
        return VPX.Streaming.loadClipSet(clipSet);
    },
    loadWeaponAsset: (weaponAsset: string, p1: any, p2: any) => {
        return VPX.Streaming.loadWeaponAsset(weaponAsset);
    },
    loadNamedPtfxAsset: (asset: string) => {
        return VPX.Streaming.loadNamedPtfxAsset(asset);
    }
}

export const Utils = {
    cache: (callback: any, options: any) => {
        return VPX.Utils.cache(callback, options);
    },
    cacheableMap: (callback: any, options: any) => {
        return VPX.Utils.cacheableMap(callback, options);
    },
    waitForCondition: (condition: any, timeout: number) => {
        return VPX.Utils.waitForCondition(condition, timeout);
    },
    getMapRange: (p1: any, p2: any, p3:any) => {
        return VPX.Utils.getMapRange(p1, p2, p3);
    },
    getDistance: ([x1, y1, z1]: number[], [x2, y2, z2]: number[]) => {
        return VPX.Utils.getDistance([x1, y1, z1], [x2, y2, z2]);
    },
    getRandomNumber: (min: number, max: number) => {
        return VPX.Utils.getRandomNumber(min, max);
    }
}

export const Interface = {
    addPeekEntryByModel: (model: string | string[] | number[], data: any, options: any) => {
        return VPX.Interface.addPeekEntryByModel(model, data, options);
    },
    addPeekEntryByTarget: (event: string, data: any, options: any) => {
        return VPX.Interface.addPeekEntryByTarget(event, data, options);
    },
    addPeekEntryByFlag: (flag: string[], data: any, options: any) => {
        return VPX.Interface.addPeekEntryByFlag(flag, data, options);
    },
    taskBar: (length: number, name: string, runCheck = false, moveCheck = null) => {
        return VPX.Interface.taskBar(length, name, runCheck, moveCheck);
    },
    phoneConfirmation: (title: string, text: string, icon?: string) => {
        return VPX.Interface.phoneConfirmation(title, text, icon);
    },
    phoneNotification: (app: string, title: string, body: string, showEvenIfActive = true) => {
        return VPX.Interface.phoneNotification(app, title, body, showEvenIfActive);
    }
}

export const Hud = {
    createBlip: (type: any, ...args: any) => {
        return VPX.Hud.createBlip(type, ...args);
    },
    applyBlipSettings: (blip: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any) => {
        return VPX.Hud.applyBlipSettings(blip, p1, p2, p3, p4, p5, p6, p7);
    }
}
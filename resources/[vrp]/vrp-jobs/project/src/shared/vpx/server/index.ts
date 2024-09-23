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

export const DB = {
    execute: <T>(pQuery: string, pParams: any): T => {
        return VPX.DB.execute(pQuery, pParams);
    },
    insert: (pQuery: string, pParams: any) => {
        return VPX.DB.insert(pQuery, pParams);
    },
    prepare: (pQuery: string, pParams: any) => {
        return VPX.DB.prepare(pQuery, pParams);
    },
    query: (pQuery: string, pParams: any) => {
        return VPX.DB.query(pQuery, pParams);
    },
    scalar: (pQuery: string, pParams: any) => {
        return VPX.DB.scalar(pQuery, pParams);
    },
    single: (pQuery: string, pParams: any) => {
        return VPX.DB.single(pQuery, pParams);
    },
    transaction: (pQuery: string, pParams: any) => {
        return VPX.DB.transaction(pQuery, pParams);
    },
    update: (pQuery: string, pParams: any) => {
        return VPX.DB.update(pQuery, pParams);
    }
}
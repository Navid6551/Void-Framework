export class Cache {
    _entries: Map<string, any>;
    constructor() {
        this._entries = new Map();
    }

    has(pKey: string) {
        return this._entries.has(pKey);
    }

    isExpired(pKey: string) {
        const { ttl: pTTL, timestamp: pTimestamp } = this._entries.get(pKey);
        return Date.now() - pTimestamp > pTTL;
    }

    get(pKey: string) {
        return this._entries.get(pKey).value;
    }

    set(pKey: string, pValue: any, pTTL = 1000) {
        this._entries.set(pKey, {
            value: pValue,
            timestamp: Date.now(),
            ttl: pTTL
        });
    }

    delete(pKey: string) {
        return this._entries.delete(pKey);
    }

    clear() {
        this._entries.clear();
    }

    forEach(pCb: Function) {
        this._entries.forEach((pItem: any, p1: any) => pCb(pItem.value, p1));
    }

    find(pCb: Function) {
        return [...this._entries.entries()].find((pItem: any) => pCb(pItem.value));
    }

    some(pCb: Function) {
        return [...this._entries.entries()].some((pItem: any) => pCb(pItem.value));
    }
}
import {__privateAdd, __privateSet, __privateGet} from 'nopixel-sdk'
var _map, _ttl;
export var client_Cache = class {
  constructor(ttl: any) {
    __privateAdd(this, _map, void 0);
    __privateAdd(this, _ttl, void 0);
    __privateSet(this, _ttl, ttl != null ? ttl : 5);
    __privateSet(this, _map, /* @__PURE__ */ new Map());
  }
  setTTL(ttl: any) {
    __privateSet(this, _ttl, ttl);
  }
  set(key: any, value: any, ttl: any = null) {
    __privateGet(this, _map).set(key, { value, expiration: Date.now() + (ttl != null ? ttl : __privateGet(this, _ttl)) * 1e3 });
    return this;
  }
  get(key: any, stale = false) {
    const entry = __privateGet(this, _map).get(key);
    const valid = entry ? stale ? true : entry.expiration > Date.now() : false;
    if (!entry || !valid) {
      if (entry)
        __privateGet(this, _map).delete(key);
      return;
    }
    return entry.value;
  }
  has(key: any, stale = false) {
    const entry = __privateGet(this, _map).get(key);
    const valid = entry ? stale ? true : entry.expiration > Date.now() : false;
    if (entry && !valid) {
      __privateGet(this, _map).delete(key);
    }
    return valid;
  }
  delete(key: any) {
    return __privateGet(this, _map).delete(key);
  }
  clear() {
    __privateGet(this, _map).clear();
  }
  values(stale = false) {
    const values = [];
    const date = Date.now();
    for (const entry of __privateGet(this, _map).values()) {
      if (stale || entry.expiration > date) {
        values.push(entry.value);
      }
    }
    return values;
  }
  keys(stale = false) {
    const keys = [];
    const date = Date.now();
    for (const [key, entry] of __privateGet(this, _map).entries()) {
      if (stale || entry.expiration > date) {
        keys.push(key);
      }
    }
    return keys;
  }
  entries(stale = false) {
    const entries = [];
    const date = Date.now();
    for (const [key, entry] of __privateGet(this, _map).entries()) {
      if (stale || entry.expiration > date) {
        entries.push([key, entry.value]);
      }
    }
    return entries;
  }
};
_map = new WeakMap();
_ttl = new WeakMap();
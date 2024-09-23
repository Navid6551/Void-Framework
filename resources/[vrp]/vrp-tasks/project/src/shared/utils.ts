function Cacheable(getValueCb: any, options: any) {
  const key = "_"
  const map = CacheableMap((ctx, _, ...args) => {
    return getValueCb(ctx, ...args)
  }, options)
  return {
    get: function(...args) {
      return map.get(key, ...args)
    },
    reset: function() {
      map.reset(key)
    }
  }
}
function CacheableMap(getValueCb: any, options: any) {
  const ttl = options.timeToLive || 6e4
  const cachedValues = {}
  async function ensureCachedValue(key, ...args) {
    let cachedValue = cachedValues[key]
    if (!cachedValue) {
      cachedValue = { value: null, lastUpdated: 0 }
      cachedValues[key] = cachedValue
    }
    const now = Date.now()
    if (cachedValue.lastUpdated === 0 || now - cachedValue.lastUpdated > ttl) {
      const [shouldCache, value] = await getValueCb(cachedValue, key, ...args)
      if (shouldCache) {
        cachedValue.lastUpdated = now
        cachedValue.value = value
      }
      return value
    }
    return await new Promise((resolve) => setTimeout(() => resolve(cachedValue.value), 0))
  }
  return {
    get: async function(key, ...args) {
      return await ensureCachedValue(key, ...args)
    },
    reset: function(key) {
      const cachedValue = cachedValues[key]
      if (cachedValue)
        cachedValue.lastUpdated = 0
    }
  }
}
function getUUID() {
  // if (typeof global.crypto === "object") {
  //   return esm_browser_v4()
  // } else {
  //   return new uuid(4).toString()
  // }
}
function hashString(pString) {
  // return esm_browser_v5(pString, esm_browser_v5.URL)
}
function WaitForCondition(conditionCallback: any, timeoutMS: any) {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const tickId = setInterval(() => {
      const hasTimedOut = Date.now() - start > timeoutMS
      if (conditionCallback() || hasTimedOut) {
        clearInterval(tickId)
        return resolve(hasTimedOut)
      }
    }, 1)
  })
}
function Wait(pTime: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), pTime))
}
function WaitForNextFrame() {
  return Wait(0)
}
export const Utils = {
  cache: Cacheable,
  cacheableMap: CacheableMap,
  waitForCondition: WaitForCondition,
  getUUID,
  getStringHash: hashString,
  wait: Wait,
  waitForNextFrame: WaitForNextFrame,
  // deflate: deflate_1,
  // inflate: inflate_1,
  // ...math_exports
}
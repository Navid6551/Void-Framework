const TrackedModules = new Map();

const ResourceName = GetCurrentResourceName();
// on('vrp-config:configLoaded', (pModule, pConfig) => {
//     if (pModule === 'vrp-graffiti:sprays') {
//         sprays = pConfig;
//     } 
// });

// export function GetConfig(pKey) {
//     return GlobalConfig[pKey];
// }

export function GetModuleConfig(pModule, pKey) {
    if (!TrackedModules.has(pModule)) {
        const config = exports['config'].GetModuleConfig(pModule);
        if (config == undefined)
            return;
        TrackedModules.set(pModule, config);
    }
    const config = TrackedModules.get(pModule);
    return pKey ? config === null || config === void 0 ? void 0 : config[pKey] : config;
}

export function GetResourceConfig(pKey) {
    return GetModuleConfig(ResourceName, pKey);
}
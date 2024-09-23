const ResourceName = GetCurrentResourceName();
export let IsReady = false;
export const TrackedModules = new Map();

export const InitConfigs = async (): Promise<void> => {
    console.log("[CONFIG] Initializing configs...");
    const clientConfig = await RPC.execute<ModuleConfigEntry[]>(`${ResourceName}:getClientConfig`);
    for (const config of clientConfig) {
        TrackedModules.set(config.configId, config.data);
        emit(`${ResourceName}:configLoaded`, config.configId, config.data);
    }
    IsReady = true;
    emit(`${ResourceName}:configReady`);
    console.log("[CONFIG] Configs initialized!");
}

export function SetModuleConfig(configId: string, data: any) {
    TrackedModules.set(configId, data);
    emit(`${ResourceName}:configLoaded`, configId, data);
}

export function GetModuleConfig(configId: string) {
    return TrackedModules.get(configId);
}
global.exports("GetModuleConfig", GetModuleConfig);

export function IsConfigReady() {
    return IsReady;
}
global.exports("IsConfigReady", IsConfigReady);

export function GetMiscConfig(key: string) {
    const config = GetModuleConfig("misc");
    if (config === undefined) return;
    return config[key] ?? null;
}
global.exports("GetMiscConfig", GetMiscConfig);
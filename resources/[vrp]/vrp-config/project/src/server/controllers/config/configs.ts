import { GetConfigObject } from "./config-object";

const ResourceName = GetCurrentResourceName();
export let IsReady = false;
export const TrackedModules = new Map<string, any>();
export let ClientConfig: ModuleConfigEntry[] = [];

const GetClientConfig = () => {
    if (ClientConfig.length > 0) return;
    ClientConfig = GetConfigObject();
}

export const InitConfigs = async (): Promise<void> => {
    console.log("[CONFIG] Initializing configs...");
    GetClientConfig();
    for (const config of ClientConfig) {
        if (config.data === undefined) {
            console.log(`[CONFIG] Config with id ${config.configId} has no data!`);
            continue;
        };
        if (TrackedModules.has(config.configId)) {
            console.log(`[CONFIG] Config with id ${config.configId} already exists!`);
            continue;
        }
        console.log(`[CONFIG] Config with id ${config.configId} loaded!`);
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

export function IsConfigReady(): boolean {
    return IsReady;
}
global.exports("IsConfigReady", IsConfigReady);

export function GetMiscConfig(key: string) {
    const config = GetModuleConfig("misc");
    if (config === undefined) return;
    return config[key] ?? null;
}
global.exports("GetMiscConfig", GetMiscConfig);
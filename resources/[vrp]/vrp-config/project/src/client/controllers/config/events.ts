import { SetModuleConfig } from "./configs";

const ResourceName = GetCurrentResourceName();

export const InitEvents = async (): Promise<void> => { }

onNet(`${ResourceName}:setConfig`, (clientConfig: any[]) => {
    if (clientConfig === undefined || !(clientConfig instanceof Array)) return;
    for (const config of clientConfig) {
        SetModuleConfig(config.configId, config.data);
    }
});
import { GetModuleConfig, IsReady } from "./controllers/config/configs";

export const InitLib = () => { };

const GetModuleConfigWithKey = (pModule: string, pKey: string) => {
    const config = GetModuleConfig(pModule);
    if (config === undefined) return;
    return pKey ? config?.[pKey] : config;
};

global.exports("GetConfigLib", () => {
    const InvokingResource = GetInvokingResource();
    return {
        IsConfigReady: () => IsReady,
        GetModuleConfig: GetModuleConfigWithKey,
        GetMainConfig: (pKey: string) => GetModuleConfigWithKey("main", pKey),
        GetMiscConfig: (pKey: string) => GetModuleConfigWithKey("misc", pKey),
        GetResourceConfig: (pKey: string) => GetModuleConfigWithKey(InvokingResource, pKey),
    };
});
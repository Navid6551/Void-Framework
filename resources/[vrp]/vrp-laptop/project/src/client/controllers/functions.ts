import { loadAnimDict } from "../utils/tools";

const LaptopAnimation = async() => {
    await loadAnimDict('amb@code_human_in_bus_passenger_idles@female@tablet@base');
    TaskPlayAnim(PlayerPedId(), 'amb@code_human_in_bus_passenger_idles@female@tablet@base', 'base', 3, 3, -1, 49, 0, false, false, false);
    TriggerEvent('attachItemPhone', 'tablet01');
}

const isEmployed = (business: any, pPerm = undefined) => {
    const isEmployed = globalThis.exports['vrp-business'].IsEmployedAt(business)
    if (!isEmployed) {
        return false
    }
    
    if (pPerm && !globalThis.exports['vrp-business'].HasPermission(business, pPerm)) {
        return false
    }

    return true
}

const OpenLaptopUI = (apps: any, features: any, settings: any) => {
    LaptopAnimation();

    const data = {
        enabledApps: apps,
        enabledFeatures: features,
        overwriteSettings: settings
    }

    console.log(JSON.stringify(apps))

    global.exports['vrp-ui'].openApplication('laptop', data);
    global.exports['vrp-ui'].SetUIFocus(true, true);
}

globalThis.exports('OpenLaptop', OpenLaptopUI)

export class Functions {
    static OpenLaptopUI = OpenLaptopUI
    static LaptopAnimation = LaptopAnimation
    static isEmployed = isEmployed
}
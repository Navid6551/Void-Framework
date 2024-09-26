import { RegisterUICallback } from '../utils/ui';
import { Functions } from './functions' 

export async function InitEvents(): Promise<void> {
    onNet('vrp-inventory:itemUsed', async itemId => {
        if (itemId !== 'pixellaptop') {return;}
        const LaptopApps = ['bennysApp', 'towApp', 'dodoApp', 'hoimportsApp'];
        const appEvents = [];
        const RacingData = global.exports['vrp-racing'].getHasRaceUsbAndAlias();
        const hasRacingData = RacingData.has_usb_racing && RacingData.racingAlias;

        if (hasRacingData) {
            LaptopApps.push('boostingApp');
            appEvents.push('bennysApp:showConsumables');
        }

        const hasAdvancedVpn = global.exports['vrp-inventory'].hasEnoughOfItem('vpnxja', 1, false, true);
        const hasVpn = global.exports['vrp-inventory'].hasEnoughOfItem('vpnxj', 1, false, true);

        if (hasRacingData && (hasAdvancedVpn || hasVpn)) {
            appEvents.push('hoimportsApp:secretShop');
        }

        const hasSeed = global.exports['vrp-inventory'].hasEnoughOfItem('seedanalyzer', 1, false, true);
        if (hasSeed) {
            LaptopApps.push('seedAnalyzerApp');
        }

        const isTuner = await Functions.isEmployed('tuner');
        if (isTuner) {
            appEvents.push('tunershop:showBrowserTab');
        }

        const isDodoManagment = await Functions.isEmployed('dodologistics', 'hire');
        if (isDodoManagment) {
            appEvents.push('dodoApp:showManagement');
        }

        const hasMethLab = global.exports['vrp-inventory'].hasEnoughOfItem('methlabusb', 1, false, true);
        if (hasMethLab && (hasAdvancedVpn || hasVpn)) {
            LaptopApps.push('methApp');
        }

        if (hasAdvancedVpn || hasVpn) {
            LaptopApps.push('herbsApp');
            LaptopApps.push('streetApp');
            appEvents.push('bozoweb:showBrowserTab');
        }
        
        const LaptopType = {
            personal: true
        };
        Functions.OpenLaptopUI(LaptopApps, appEvents, LaptopType);
    });

    global.exports('OpenLaptop', (apps: string[], features: string[], settings: any, moreData: any) => {
        Functions.OpenLaptopUI(apps, features, Object.assign(Object.assign({}, settings), { personal: false }), moreData);
    });

    onNet('vrp-ui:application-closed', (uiItem: any) => {
        if (uiItem !== 'laptop') {return;}
        StopAnimTask(PlayerPedId(), 'amb@code_human_in_bus_passenger_idles@female@tablet@base', 'base', 1);
        TriggerEvent('destroyPropPhone');
        SetPlayerControl(PlayerId(), true, 0);
    });

    onNet('vrp-laptop:openLaptop', Functions.OpenLaptopUI);

    RegisterUICallback('vrp-ui:laptop:getBennysCatalog', async(data: any, cb: any) => {
        const result = await Functions.getBennysCatalog()
        cb({
            data: result,
            meta: {
                ok: true,
                message: ''
            }
        })
    })
}
import { Functions } from './functions' 

export async function InitEvents(): Promise<void> {
    onNet('vrp-inventory:itemUsed', async itemId => {
        if (itemId !== 'pixellaptop') {return;}
        const LaptopApps = [
            'bennysApp',
            'towApp',
            'dodoApp',
            'hoimportsApp'
        ];
        const appEvents = [];
        const RacingData = global.exports['vrp-racing'].getHasRaceUsbAndAlias();
        const hasRacingData = RacingData.has_usb_racing && RacingData.racingAlias;
        // const isGang = await global.exports['vrp-gangsystem'].GetCurrentGang()
        const isGang = true
        if (hasRacingData) {
            LaptopApps.push('boostingApp');
            appEvents.push('bennysApp:showConsumables');
        }
        const hasAdvancedVpn = global.exports['vrp-inventory'].hasEnoughOfItem('vpnxja', 1, false, true);
        const hasVpn = global.exports['vrp-inventory'].hasEnoughOfItem('vpnxj', 1, false, true);
        if (hasRacingData && (hasAdvancedVpn || hasVpn)) {
            appEvents.push('hoimportsApp:secretShop');
        }
        const hasSeedAnalyzer = global.exports['vrp-inventory'].hasEnoughOfItem('seedanalyzer', 1, false, true);
        if (hasSeedAnalyzer) {
            LaptopApps.push('seedAnalyzerApp');
        }
        const cid = global.exports.isPed.isPed('cid');
        const hasTunerAccess = false//await Functions.isEmployed('tuner', cid);
        if (hasTunerAccess) {
            appEvents.push('tunershop:showBrowserTab');
        }
        // const dodoAccess = await Functions.isEmployed('dodologistics', 'hire', cid);
        // if (dodoAccess) {
        //     appEvents.push('dodoApp:showManagement');
        // }
        const hasMethLab = global.exports['vrp-inventory'].hasEnoughOfItem('methlabusb', 1, false, true);
        if (hasMethLab && (hasAdvancedVpn || hasVpn)) {
            LaptopApps.push('methApp');
        }

        if (hasAdvancedVpn || hasVpn) {
            if (isGang) {
                // LaptopApps.push('herbsApp');
                LaptopApps.push('streetApp');
                // appEvents.push('bozoweb:showBrowserTab');
            }
        }
        const LaptopType = {
            personal: true
        };
        Functions.OpenLaptopUI(LaptopApps, appEvents, LaptopType);
    });

    onNet('vrp-ui:application-closed', (uiItem: any) => {
        if (uiItem !== 'laptop') {return;}
        StopAnimTask(PlayerPedId(), 'amb@code_human_in_bus_passenger_idles@female@tablet@base', 'base', 1);
        TriggerEvent('destroyPropPhone');
        SetPlayerControl(PlayerId(), true, 0);
    });
    onNet('vrp-laptop:openLaptop', Functions.OpenLaptopUI);
}
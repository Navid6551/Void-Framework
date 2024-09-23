import { hasPermission } from "client/controllers/main";
import { Tools } from "client/tools";

export const DodoJob = async() => {
    globalThis.exports['vrp-polytarget'].AddBoxZone('dodo_warehouse_laptop', {
        x: -442.41,
        y: -2819.8,
        z: 6
    }, 1, 1.6, {
        minZ: 5.45,
        maxZ: 6.45,
        heading: 315
    })

    globalThis.exports['vrp-interact'].AddPeekEntryByPolyTarget('dodo_warehouse_laptop', [
        {
            event: 'vrp-dodo:client:openLaptop',
            id: 'dodo_warehouse_laptop_open',
            icon: 'laptop',
            label: 'Open laptop',
            parameters: {}
        }
    ], {
        distance: { radius: 2 },
        isEnabled: async () => {
            return true;
        }
    });

    onNet('vrp-jobs:dodo:vehicleSpawned', (pNetId: any) => {
        Tools.addPeekEntryByType(2, [
            {
                id: "vehicle_opentrunkinv",
                label: "Get Box",
                icon: "box",
                event: "vrp-dodo:client:holdRandomBox",
                parameters: {}
            }
        ], {
            distance: {
                radius: 4.0
            },
            isEnabled: (pEntity: any) => {
                return NetworkGetNetworkIdFromEntity(pEntity) === pNetId
            }
        })
    })

    on('vrp-dodo:client:openLaptop', async () => {
        const pCid = globalThis.exports.isPed.isPed('cid'), pFeaturs = [], pHasPerm = await hasPermission('dodologistics', 'hire', pCid);
        if (pHasPerm) {
            pFeaturs.push('dodoApp:showManagement');
        }
        const pSettings = { laptopBackground: 'https://i.imgur.com/mroIcmL.png' };
        exports['vrp-laptop'].OpenLaptop(['dodoApp'], pFeaturs, pSettings);
    })

    on('vrp-jobs:dodo:dropGoods', async () => {
        emitNet('vrp-dodo:server:dropGoods');
    });

    on('vrp-dodo:client:holdRandomBox', () => {
        const pPackages = [
            'dodopackagesmall',
            'dodopackagemedium',
            'dodopackagelarge'
        ], pPackage = pPackages[Math.floor(Math.random() * pPackages.length)];
        emit('animation:carry', pPackage, true);
        emit('vrp-jobs:dodo:canDropGoods', true)
    });
}
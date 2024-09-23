import { Capitalize, loadAnimDict } from "../utils/tools";
import { currentParkingSpot, GetGarageById, GetGarageVehicleCache, PreviewCar, previewCar, ResetParkingSpot, SpawnGarageVehicle } from "./state/garages";
import { RefuelJerryCan, RefuelVehicle } from "./systems/fuel";
import { GetCurrentVehicleIdentifier } from "./vehicle";
const prev: any = []
export async function InitUI(): Promise<void> { };

let garageListOpen = false;

RegisterUICallback('vrp-ui:applicationClosed', (data: any, cb: Function) => {
    if (data.name === "contextmenu" && garageListOpen) {
        garageListOpen = false;
        ResetParkingSpot();
        DeleteEntity(previewCar);
    }
});

RegisterUICallback("vrp:vehicles:vehiclePreview", (data: any, cb: Function) => {
    const key = data.key;

    if (key.state === "stored") {
        PreviewCar(key.vin, key.garage, key?.data, key?.pShouldSpawnAtPlayerCoords ?? false);
    }

    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("vrp:vehicles:spawnVehicle", async (data: any, cb: Function) => {
    const key = data.key;

    if (key.state === "stored" && currentParkingSpot) {
        SpawnGarageVehicle(key.vin, key.garage, key?.raid, key?.pShouldSpawnAtPlayerCoords ?? false);
    } else {
        emit("DoLongHudText", "Vehicle unavailable", 2);
    }

    cb({ data: {}, meta: { ok: true, message: "" } });

    global.exports["vrp-ui"].closeApplication("contextmenu");
});

RegisterUICallback("vehicle:refuel:handler", async (data: any, cb: Function) => {
    const { pEntity: pVehicle, pCost: pTotalCost, isJerryCan: pIsJerryCan, isHeli: pIsHeli } = data.key;

    if (pVehicle) {
        const currentCash = await RPC.execute("GetCurrentCash");
        if (!currentCash[0]) return emit("DoLongHudText", "You don't have any cash on you.", 2, 12000);
        const pCurCash = currentCash[0].param;
        if (Math.floor(pTotalCost) === 0) {
            cb({ data: {}, meta: { ok: true, message: "" } });
            return emit("DoLongHudText", "You're already topped up.");
        }

        if (pCurCash < pTotalCost) {
            emit("DoLongHudText", "You can't afford it, you're missing $" + (pTotalCost - pCurCash), 1, 12000);
        } else {
            if (pIsJerryCan) {
                RefuelJerryCan(pVehicle);
            } else {
                RefuelVehicle(pVehicle, pTotalCost, pIsHeli, false);
            }
        }
    }

    cb({ data: {}, meta: { ok: true, message: "" } });
})

RegisterUICallback("vrp:vehicles:sale:accepted", async (data: any, cb: Function) => {
    const _data = data._data;
    const vin = GetCurrentVehicleIdentifier();
    if (vin === undefined || vin !== (_data === null || vin !== (_data?.vin ?? undefined))) {
        return cb({ data: {}, meta: { ok: false, message: "Couldn't find vehicle identifier" } });
    }
    const result = await RPC.execute('vrp:vehicles:transferOwnershipVehicle', _data.vin, _data.sellerCID, data.character.id, data.price);
    if (result) {
        cb({ data: {}, meta: { ok: true, message: '' } });
    } else {
        cb({ data: {}, meta: { ok: false, message: "Couldn't transfer ownership" } });
    }
})

RegisterUICallback("vrp:vehicles:phoneSale:accepted", async (data: any, cb: Function) => {
    const _data = data._data;
    const vin = _data?.vin ?? undefined;

    if (vin === undefined) {
        return cb({ data: {}, meta: { ok: false, message: "Couldn't find vehicle identifier" } });
    }

    const result = await RPC.execute('vrp:vehicles:transferOwnershipVehicle', _data.vin, _data.sellerCID, data.character.id, data.price);

    if (result) {
        cb({ data: {}, meta: { ok: true, message: '' } });
    } else {
        cb({ data: {}, meta: { ok: false, message: "Couldn't transfer ownership" } });
    }
})

RegisterUICallback('vrp-vehicles:fetchParkingLogs', async (data: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });

    const pKey = data.key;

    if (DoesEntityExist(previewCar)) {
        ResetParkingSpot();
        DeleteEntity(previewCar);
    }

    const pLogs = await RPC.execute("vrp:vehicles:fetchParkingLogs", pKey.vin, pKey.garage);
    const mappedLogs = pLogs.map((item: any) => {
        return {
            title: ` State ID: ${item.cid} | Action: ${item.action} | Date: ${new Date(item.timestamp).toLocaleString("en-US")}`,
            description: `Engine: ${item.data.engine} | Body: ${item.data.body} | Fuel: ${item.data.fuel}`
        };
    });

    global.exports["vrp-ui"].showContextMenu(mappedLogs);
})

function GetVehicleStatus(pDamage: VehicleDamage) {
    const parsed = JSON.parse(pDamage as any ?? "{}");
    return `Engine: ${Math.floor((parsed?.engine / 1000) * 100)}% | Body: ${Math.floor((parsed?.body / 1000) * 100)}%`;
}

function BuildVehicleList(pVehicles: OwnedVehicle[], pCategory: string, pShared = false, pRaid = false, pDisplay = false, pShouldSpawnAtPlayerCoords?: boolean): MenuEntry[] {
    const policeVehicles: any = [];

    return pVehicles.reduce((list: MenuEntry[], vehicle: OwnedVehicle) => {
        if (!Array.isArray(pCategory) && vehicle.type !== pCategory || Array.isArray(pCategory) && !pCategory.includes(vehicle.type)) {
            return list;
        }

        const entry: MenuEntry = {
            title: vehicle.name ? vehicle.name : GetLabelText(GetDisplayNameFromVehicleModel(vehicle.model)),
            description: `Plate: ${vehicle.plate} | ${Capitalize(vehicle.state)}`,
            key: {
                state: vehicle.state,
                garage: vehicle.garage,
                vin: vehicle.vin,
                pShouldSpawnAtPlayerCoords: pShouldSpawnAtPlayerCoords ?? false
            },
            extraAction: "vrp:vehicles:vehiclePreview",
            children: [
                {
                    title: "Take Out Vehicle",
                    description: "",
                    action: "vrp:vehicles:spawnVehicle",
                    disabled: pRaid ? vehicle.state !== "stored" && vehicle.state !== "locked" : vehicle.state !== "stored",
                    key: {
                        state: vehicle.state,
                        garage: vehicle.garage,
                        vin: vehicle.vin,
                        raid: pRaid,
                        pShouldSpawnAtPlayerCoords: pShouldSpawnAtPlayerCoords ?? false
                    }
                },
                {
                    title: "Vehicle Status",
                    description: `${Capitalize(vehicle.state)} | ${GetVehicleStatus(vehicle?.damage)}`
                }
            ]
        }

        if (pDisplay) {
            entry.children.push({
                title: "Set as Display Vehicle",
                description: "",
                action: "vrp-vehicles:setDisplayVehicle",
                disabled: vehicle.state !== "stored",
                key: {
                    vin: vehicle.vin,
                    garage: vehicle.garage,
                    state: vehicle.state
                }
            });

            entry.children.push({
                title: "Remove Display Vehicle",
                description: "",
                action: "vrp-vehicles:setDisplayVehicle",
                disabled: vehicle.state !== "showcase",
                key: {
                    vin: vehicle.vin,
                    garage: vehicle.garage,
                    state: vehicle.state,
                    remove: true
                }
            });
        }

        if (pRaid) {
            entry.children.push({
                title: "Toggle Vehicle Lockdown",
                description: "",
                action: "vrp-vehicles:toggleVehicleLockdown",
                disabled: vehicle.state !== "stored" && vehicle.state !== "locked",
                key: {
                    vin: vehicle.vin,
                    garage: vehicle.garage,
                    state: vehicle.state
                }
            });
        }

        if (policeVehicles && policeVehicles[vehicle.model] && ['pd_shared', 'pd_shared_bike'].includes(vehicle.garage)) {
            entry.children.push({
                title: "Retrieve Vehicle",
                description: "",
                action: "vrp-vehicles:retrieveVehicle",
                disabled: vehicle.state === "stored",
                key: {
                    vin: vehicle.vin,
                    garage: vehicle.garage
                }
            });
        }

        if (pShared || pRaid) {
            entry.children.push({
                title: "Vehicle Parking Log",
                description: "",
                action: "vrp-vehicles:fetchParkingLogs",
                key: {
                    vin: vehicle.vin,
                    garage: vehicle.garage,
                    state: vehicle.state
                }
            });
        }

        list.push(entry);

        return list;
    }, []);
}

function DisplayVehicleCategories(pReduced: any, pCategory: any, pShared: boolean, pRaid: boolean, isDisplayCar: boolean, pShouldSpawnAtPlayerCoords?: boolean) {
    const policeVehicles = {
        npolvic: "Crown Vics",
        npolexp: "Explorers",
        npolchar: "Chargers",
        npolstang: "Mustangs",
        npolvette: "Corvettes",
        npolchal: "Challengers",
        npolmm: "Motorcycles",
        emsnspeedo: "Speedos",
        emshoe: "Tahoes"
    }
    return Object.values(pReduced).reduce((prvrp: any, curr: any) => {
        const children = BuildVehicleList(curr.sort((a: any, b: any) => a.name.localeCompare(b.name ? b.name : b.model)), pCategory, pShared, pRaid, isDisplayCar, pShouldSpawnAtPlayerCoords);
        const departments = ["LSPD", "BCSO", "SASPR", "SASP", "UM"];

        if (children.length === 0) {
            return prev;
        }

        prev.push({
            title: `${policeVehicles[curr[0].model] || curr[0].name ? curr[0].name : curr[0].model}`,
            description: `${curr.length} ${curr.length === 1 ? "Vehicle" : "Vehicles"}`,
            children: children
        })

        return prev;
    }, []);
}

function DisplayMultipleVehicles(pVehicleType: any[], pVehicleCache: OwnedVehicle[], pShared: boolean, pBool: boolean, isDisplayCar: boolean, pShouldSpawnAtPlayerCoords?: boolean) {
    return pVehicleType.reduce((prvrp: any, curr: any) => {
        const result = BuildVehicleList(pVehicleCache, curr, pShared, pBool, isDisplayCar, pShouldSpawnAtPlayerCoords);

        if (result) {
            prev.push({
                title: `Vehicle List (${Capitalize(curr)})`,
                description: `Stored Vehicles: ${result.length}`,
                key: '',
                action: '',
                children: result
            });
        }

        return prev;
    }, []);
}

export function GetGarageVehicleList(pVehicleCache: OwnedVehicle[], pVehicleType: any[], pShared: boolean, pRaid: boolean, isDisplayCar: boolean, pShouldSpawnAtPlayerCoords?: boolean) {
    let returnValue: any = undefined;

    const getVehicles = (vehicleCache: OwnedVehicle[], vehicleType: any[], shared = false) => {
        let result: any = undefined;

        const reduced = vehicleCache.reduce((prvrp: any, curr: any) => {
            (prev[curr.model] = prev[curr.model] || []).push(curr);
            return prev;
        }, {});

        if (vehicleType.length > 1) {
            result = DisplayMultipleVehicles(vehicleType, vehicleCache, shared, pRaid, isDisplayCar, pShouldSpawnAtPlayerCoords);
        } else {
            if (Object.values(reduced).some((pItem: any) => pItem.length > 3)) {
                const [vehicleTypes] = vehicleType;
                result = DisplayVehicleCategories(reduced, vehicleTypes, shared, pRaid, isDisplayCar, pShouldSpawnAtPlayerCoords);
            } else {
                const [vehicleTypes] = vehicleType;
                result = BuildVehicleList(vehicleCache, vehicleTypes, shared, pRaid, isDisplayCar, pShouldSpawnAtPlayerCoords);
            }
        }

        return result;
    };

    if (pShared) {
        const cid = global.exports["isPed"].isPed("cid");
        const ownedVehicles = pVehicleCache.filter((pItem: OwnedVehicle) => pItem.cid === cid);
        const sharedVehicles = pVehicleCache.filter((pItem: OwnedVehicle) => pItem.cid !== cid);

        returnValue = [
            {
                title: "Personal Vehicles",
                description: "List of owned vehicles.",
                key: {},
                children: getVehicles(ownedVehicles, pVehicleType, true)
            },
            {
                title: "Shared Vehicles",
                description: "List of shared vehicles.",
                key: {},
                children: getVehicles(sharedVehicles, pVehicleType, true)
            }
        ];
    } else {
        const cid = global.exports["isPed"].isPed("cid");
        const filteredCache = pVehicleCache.filter((pItem: OwnedVehicle) => pItem.cid === cid);

        returnValue = getVehicles(filteredCache, pVehicleType);
    }

    return returnValue;
}

export async function OpenGarageList(pGarageId: string, pShouldSpawnAtPlayerCoords?: boolean) {
    const garage = GetGarageById(pGarageId);
    if (!garage) return;

    const vehicleCache = await GetGarageVehicleCache(pGarageId);
    if (!vehicleCache) return;

    const vehicleType = currentParkingSpot?.type ? [currentParkingSpot.type] : garage.vehicle_types;

    const isDisplayCar = false; //currentParkingSpot?.display === true;

    const pParked = GetGarageVehicleList(vehicleCache, vehicleType, garage.shared, false, isDisplayCar, pShouldSpawnAtPlayerCoords);

    if (pParked.length === 0) return emit("DoLongHudText", "You don't have any vehicles parked here.", 2);

    garageListOpen = true;

    global.exports["vrp-ui"].showContextMenu([...pParked], "right");
}
import { Cache } from '../../../shared/classes/cache';
import { OpenInputMenu } from '../../utils/tools';
import { IsVinScratched } from '../state/keys';
import { ApplyCarPolish } from '../systems/carpolish';
import { RegisterItemCallback } from './itemEvents';
import { UseBodyRepairKit, FixVehicleTire, UseHelicopterRepairKit, UseVehicleRepairKit, FixVehicleDegredation, InstallPart } from './itemFunctions';

const cache = new Cache();

const businesses = ["hayes_autos", "harmony_repairs", "ottos_auto", "iron_hog", "tuner"];

const classes = {
    "iron_hog": ["M", "D", "C", "B"],
    "hayes_autos": ["M", "X", "S", "A", "B", "C", "D"],
    "harmony_repairs": ["M", "X", "S", "A", "B", "C", "D"],
    "ottos_auto": ["M", "X", "S", "A", "B", "C", "D"],
    "tuner": ["M", "X", "S", "A", "B", "C", "D"],
};

const CarPolishItems = [
    {
        tier: "high",
        days: 8
    },
    {
        tier: "medium",
        days: 4
    },
    {
        tier: "low",
        days: 1
    }
];

const CarPartItems = [
    {
        name: "turbokit",
        type: "turbo",
        health: 1000,
        temp: false
    },
    {
        name: "turbotempkit",
        type: "turbo",
        health: 1000,
        temp: true
    },
    {
        name: "enginekit",
        type: "engine",
        health: 1000,
        temp: false
    },
    {
        name: "enginetempkit",
        type: "engine",
        health: 1000,
        temp: true
    },
    {
        name: "transmissionkit",
        type: "transmission",
        health: 1000,
        temp: false
    },
    {
        name: "transmissiontempkit",
        type: "transmission",
        health: 1000,
        temp: true
    }
];

const RepairRatingClasses = ["M", "X", "S", "A", "B", "C", "D"];

const DegradationRepairItems = [
    {
        name: "fixbrake",
        part: "brakes",
        amount: 10
    },
    {
        name: "fixaxle",
        part: "axle",
        amount: 10
    },
    {
        name: "fixradiator",
        part: "radiator",
        amount: 10
    },
    {
        name: "fixclutch",
        part: "clutch",
        amount: 10
    },
    {
        name: "fixtransmission",
        part: "transmission",
        amount: 10
    },
    {
        name: "fixelectronics",
        part: "electronics",
        amount: 10
    },
    {
        name: "fixinjector",
        part: "injector",
        amount: 10
    },
    {
        name: "fixtyres",
        part: "tyres",
        amount: 10
    },
    {
        name: "fixbody",
        part: "body",
        amount: 10
    },
    {
        name: "fixengine",
        part: "engine",
        amount: 10
    }
];

const VehicleBoneIndexes = [
    {
        bone: "wheel_lf",
        index: 0
    },
    {
        bone: "wheel_rf",
        index: 1
    },
    {
        bone: "wheel_lm",
        index: 2
    },
    {
        bone: "wheel_rm",
        index: 3
    },
    {
        bone: "wheel_lr",
        index: 4
    },
    {
        bone: "wheel_rr",
        index: 5
    },
    {
        bone: "wheel_lm1",
        index: 2
    },
    {
        bone: "wheel_rm1",
        index: 3
    },
    {
        bone: "door_dside_f",
        index: 0
    },
    {
        bone: "door_pside_f",
        index: 1
    },
    {
        bone: "door_dside_r",
        index: 2
    },
    {
        bone: "door_pside_r",
        index: 3
    },
    {
        bone: "bonnet",
        index: 4
    },
    {
        name: "boot",
        index: 5
    }
];

export function CanUseDegradationRepair(pCategory: string) {
    let hasCatPerm = false
    if (cache.has("degradationRepair") && !cache.isExpired("degradationRepair")) {
        return cache.get("degradationRepair");
    }

    const isAllowed = global.exports["vrp-business"].IsEmployedAt("hayes_autos")
    || global.exports["vrp-business"].IsEmployedAt("harmony_autos")
    || global.exports["vrp-business"].IsEmployedAt("tuner");
    for (const business of businesses) {
        const hasClass = classes[business];
        hasCatPerm = hasClass && pCategory && hasClass.includes(pCategory)
    }
    


    // const [x, y, z] = GetEntityCoords(PlayerPedId(), false);


    // const pProm = new Promise(async (resolve) => {
    //     for (const business of businesses) {
    //         const employment = {
    //             character: { id: global.exports["isPed"].isPed("cid") },
    //             business: { id: business },
    //             distCheck: true,
    //             coords: { x: x, y: y, z: z }
    //         };
    //         const isEmployed = await RPC.execute("IsEmployedAtBusiness", employment);
    //         console.log(isEmployed)
    //         if (isEmployed) {
    //             const hasClass = classes[employment.business.id];
    //             if (hasClass && pCategory && !hasClass.includes(pCategory)) {
    //                 resolve(false);
    //             } else {
    //                 resolve(true);
    //             }
    //         }
    //     }

    //     resolve(false);
    // });

    cache.set("degradationRepair", isAllowed && hasCatPerm, 15000);

    // return pProm;
    return isAllowed && hasCatPerm
}

export async function InitDegradationItems(): Promise<void> {
    const cb = async (pItemId: string, pPart: string, pCategory: string, pAmount: number) => {
        const isAllowed = await CanUseDegradationRepair(pCategory);
        if (!isAllowed) return emit("DoLongHudText", "You're not prepared to do repairs here.", 2);
        if (!global.exports["vrp-inventory"].hasEnoughOfItem("repairtoolkit", 1)) return emit("DoLongHudText", "You need the proper tools to repair this.", 2);

        const currentEntity = global.exports["vrp-target"].GetCurrentEntity();
        if (!currentEntity) return;

        let totalParts = 1;

        if (global.exports["vrp-inventory"].hasEnoughOfItem(pItemId, 2, false)) {
            const prompt: any = await OpenInputMenu([{ name: "parts", label: "Amount of parts to use", icon: "cogs" }], (pValues: any) => {
                return pValues.parts;
            });
            if (prompt === null) return;

            if (!global.exports["vrp-inventory"].hasEnoughOfItem(pItemId, prompt.parts, false)) {
                return emit("DoLongHudText", "You don't have enough parts.", 2);
            }

            totalParts = prompt.parts;
        }

        const result = await FixVehicleDegredation(currentEntity, pPart, pCategory, pAmount * totalParts);
        if (!result) return;

        if (pPart === "engine") {
            SetVehicleEngineHealth(currentEntity, 1000);
            RPC.execute("vrp-vehicles:damage:saveDamage", NetworkGetNetworkIdFromEntity(currentEntity));
        } else if (pPart === "body") {
            SetVehicleBodyHealth(currentEntity, 1000);
            SetVehicleFixed(currentEntity);
            RPC.execute("vrp-vehicles:damage:saveDamage", NetworkGetNetworkIdFromEntity(currentEntity));
        }

        emit("vrp-mechanics:client:vehiclePartApplied", totalParts, NetworkGetNetworkIdFromEntity(currentEntity), pPart);
        emit("inventory:removeItem", pItemId, totalParts);
    };

    DegradationRepairItems.forEach((item: any) => {
        for (const rating of RepairRatingClasses) {
            const itemId = `${rating.toLowerCase()}${item.name}`;
            RegisterItemCallback(itemId, () => cb(itemId, item.part, rating, item.amount));
        }
    });

    RegisterItemCallback("advrepairkit", () => {
        const vehicle = global.exports["vrp-target"].GetCurrentEntity();
        UseVehicleRepairKit(vehicle, true);
    });

    RegisterItemCallback("repairkit", () => {
        const vehicle = global.exports["vrp-target"].GetCurrentEntity();
        UseVehicleRepairKit(vehicle, false);
    });

    RegisterItemCallback("tirerepairkit", () => {
        const vehicle = global.exports["vrp-target"].GetCurrentEntity();
        FixVehicleTire(vehicle);
    });

    RegisterItemCallback("helicopterrepairkit", async () => {
        const vehicle = global.exports["vrp-target"].GetCurrentEntity();
        const vehicleClass = GetVehicleClass(vehicle);
        if (vehicleClass !== 15) return emit("DoLongHudText", "Repair kit ineffective for this vehicle.", 2), false;
        const success = await UseHelicopterRepairKit(vehicle);
        if (success !== true) return;
        emit("inventory:removeItem", "helicopterrepairkit", 1);
    });

    RegisterItemCallback("bodyrepairkit", async () => {
        const vehicle = global.exports["vrp-target"].GetCurrentEntity();
        const success = await UseBodyRepairKit(vehicle);
        if (success !== true) return;
        emit("inventory:removeItem", "bodyrepairkit", 1);
    });

    CarPolishItems.forEach((item: any) => {
        const pItem = `carpolish_${item.tier}`;
        RegisterItemCallback(pItem, async (pItemId: string) => {
            const vehicle = global.exports["vrp-target"].GetCurrentEntity();
            if (!vehicle) return;
            const netId = NetworkGetNetworkIdFromEntity(vehicle);
            if (!netId) return;
            await ApplyCarPolish(netId, pItemId, item.days);
        });
    });

    CarPartItems.forEach((item: any) => {
        RegisterItemCallback(item.name, async (pItemId: string, pSlot: number, pInvName: string, pQuality: number) => {
            if (pQuality < 50) return emit("DoLongHudText", "Part too beaten-up to be installed.", 2);
            const vehicle = global.exports["vrp-target"].GetCurrentEntity();
            if (!vehicle) return;
            if (!global.exports["vrp-inventory"].hasEnoughOfItem("Toolbox", 1)) return emit("DoLongHudText", "You don't have the required tools to perform this action.", 2);
            const IsVinScratch = IsVinScratched(vehicle);
            if (IsVinScratch && IsVinScratch.boostingInfo && IsVinScratch.boostingInfo.vinScratch) return emit("DoLongHudText", "Doesn't seem like I can apply that to this vehicle.", 2);
            const success = await InstallPart(vehicle, item.type, item.health, item.temp);
            if (success !== true) return;
            emit("inventory:removeItem", item.name, 1);
        });
    });
}

export function GetVehicleBoneIndex(pBone: string) {
    return VehicleBoneIndexes.find((entry: any) => entry.bone === pBone)?.index;
}
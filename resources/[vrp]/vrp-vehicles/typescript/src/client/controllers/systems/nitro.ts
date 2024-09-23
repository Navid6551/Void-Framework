import { taskBar } from "../../utils/tools";
import { NitroThread } from "../threads/nitro";
import { GetVehicleMetadata } from "../vehicle";

const EmploymentCache = CacheableMap(async (p1: any, pBusiness: string) => {
    const isEmployed = global.exports["vrp-business"].IsEmployedAt(pBusiness);
    return [true, isEmployed];
}, { timeToLive: 60 * 1000 });

const PermissionCache = CacheableMap(async (p1: any, p2: any, pBusiness: string, pPerm: string) => {
    const hasPermission = global.exports["vrp-business"].HasPermission(pBusiness, pPerm);
    return [true, hasPermission];
}, { timeToLive: 60 * 1000 });

export async function InitNosRefil() {
    global.exports["vrp-polytarget"].AddBoxZone("nitro_refill", { x: 137.51, y: -3051.41, z: 7.04 }, 0.8, 0.6, { heading: 30, minZ: 5.84, maxZ: 7.44, data: { id: 'tuner_refill', business: 'tuner' } });
    global.exports["vrp-polytarget"].AddBoxZone("nitro_refill", { x: 1185.08, y: 2636.82, z: 37.76 }, 0.6, 0.6, { heading: 4, minZ: 36.76, maxZ: 38.16, data: { id: 'harmony_refill', business: 'harmony_repairs' } });
    global.exports["vrp-interact"].AddPeekEntryByPolyTarget("nitro_refill", [{ id: 'bozo2309847239784234', event: 'vrp-vehicles:client:refillNoS', icon: 'fill', label: 'Refill Nitro (2 GNE)' }], {
        distance: { radius: 3.5 },
        isEnabled: (pEntity: number, pContext: PeekContext) => {
            var p1, p2;
            const pBusiness = (p2 = (p1 = pContext === null || pContext === void 0 ? void 0 : pContext["zones"]) === null || p1 === void 0 ? void 0 : p1["nitro_refill"]) === null || p2 === void 0 ? void 0 : p2["business"];
            return pBusiness && EmploymentCache(pBusiness);
        }
    });
}

export function VehicleHasNitro(pVehicle: number) {
    const nitro = GetVehicleMetadata(pVehicle, "nitro");
    return nitro ? nitro > 0 : false;
}

export function GetNitroLevel(pVehicle: number) {
    const nitro = GetVehicleMetadata(pVehicle, "nitro");
    return typeof nitro === "number" ? nitro : 0;
}

export function IsUsingNitro() {
    return NitroThread.isActive;
}

export async function RefillNOSCan(p1: any) {
    let pStatus: any = "";
    if (!p1) return false;

    const hasEnough = global.exports["vrp-inventory"].hasEnoughOfItem("nitrous", 1);
    if (!hasEnough) return false;

    const itemInfo = global.exports["vrp-inventory"].GetInfoForFirstItemOfName("nitrous");
    if (!itemInfo) return false;

    const status = (pStatus = JSON.parse(itemInfo.information).Status) !== null && pStatus !== void 0 ? pStatus : "Filled";
    if (status === "Filled") return emit("DoLongHudText", "Nitrous can is already full.");

    const quantity = itemInfo.quantity;
    const cost = quantity * 2;

    const confirmationResult = await global.exports["vrp-phone"].DoPhoneConfirmation(30, `Nitrous Refill (${quantity})`, `Will cost ${cost} GNE`, "file-invoice-dollar");
    if (!confirmationResult) return false;

    emit("animation:PlayAnimation", "type");

    const progress = await taskBar(5000, "Refill NOS Can");

    ClearPedTasks(PlayerPedId());

    if (progress !== 100) return false;

    // const result = await RPC.execute("vrp-vehicles:chargeForNOSRefill", cost);
    // if (!result.success) {
    //     emit("DoLongHudText", result.message);
    //     return false;
    // }

    emit("inventory:updateItem", "nitrous", itemInfo.slot, JSON.stringify({ Status: 'Filled' }));

    emit("DoLongHudText", "Successfully refilled nitrous can.");

    return true;
}

global.exports("GetNitroLevel", GetNitroLevel);
global.exports("IsUsingNitro", IsUsingNitro);
global.exports("VehicleHasNitro", VehicleHasNitro);
global.exports("RefillNOSCan", RefillNOSCan);
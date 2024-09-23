import { GetHandlingField } from "../systems/handling";

const VEHICLE_CLASS_OVERRIDES = { [GetHashKey("npolmm")]: "M" };

export async function InitVehicleStats(): Promise<void> { };

export function GetVehicleStats(pVehicle: number): VehicleStats {
    const stats = GetHandlingField(pVehicle);
    const brakeForce = stats.fBrakeForce;
    const initialDragCoeff = stats.fInitialDragCoeff;
    const initialDriveForce = stats.fInitialDriveForce;
    const initialDriveMaxFlatVel = stats.fInitialDriveMaxFlatVel;
    const suspensionReboundDamp = stats.fSuspensionReboundDamp;
    const tractionCurveMax = stats.fTractionCurveMax;
    const tractionCurveMin = stats.fTractionCurveMin;
    const vehicleClass = GetVehicleClass(pVehicle);

    let fInitialDriveForce = initialDriveForce;

    if (initialDriveForce > 0 && initialDriveForce < 1) {
        fInitialDriveForce *= 1.1;
    }

    const acceleration = initialDriveMaxFlatVel * fInitialDriveForce / 10;
    const speed = initialDriveMaxFlatVel / initialDragCoeff * (tractionCurveMax + tractionCurveMin) / 40;
    let handling = (tractionCurveMax + suspensionReboundDamp) * tractionCurveMin;
    if (vehicleClass === 8) handling /= 2;
    const braking = tractionCurveMin / initialDragCoeff * brakeForce * 7;

    return {
        force: fInitialDriveForce,
        acceleration: acceleration,
        speed: speed,
        handling: handling,
        braking: braking,
        category: vehicleClass
    };
}

global.exports("GetVehicleStats", GetVehicleStats);

export function GetRatingClass(pStats: number, pIsBike = false) {
    if (pIsBike) return "M";
    if (pStats > 900) {
        return "X";
    } else if (pStats > 700) {
        return "S";
    } else if (pStats > 550) {
        return "A";
    } else if (pStats > 400) {
        return "B";
    } else return pStats > 325 ? "C" : "D";
}

global.exports("GetRatingClass", GetRatingClass);

export function GetVehicleRatingNumber(pVehicle: number) {
    const vehicleStats = typeof pVehicle === "number" ? GetVehicleStats(pVehicle) : pVehicle;
    if (!vehicleStats) return 0;
    return Math.round((vehicleStats.acceleration * 5 + vehicleStats.speed + vehicleStats.handling + vehicleStats.braking) * 15);
}

global.exports("GetVehicleRatingNumber", GetVehicleRatingNumber);

export function GetVehicleRatingClass(pVehicle: number) {
    const vehicleStats = typeof pVehicle === "number" ? GetVehicleStats(pVehicle) : pVehicle;
    const vehicleModel = typeof pVehicle === "number" ? GetEntityModel(pVehicle) : null;
    if (!vehicleStats) return "D";

    if (vehicleModel && VEHICLE_CLASS_OVERRIDES[vehicleModel]) return VEHICLE_CLASS_OVERRIDES[vehicleModel];

    const stats = Math.round((vehicleStats.acceleration * 5 + vehicleStats.speed + vehicleStats.handling + vehicleStats.braking) * 15);

    return GetRatingClass(stats, vehicleStats.category === 8);
}

global.exports("GetVehicleRatingClass", GetVehicleRatingClass);

export function GetVehicleRating(pVehicle: number) {
    const vehicleStats = typeof pVehicle === "number" ? GetVehicleStats(pVehicle) : pVehicle;
    const vehicleModel = typeof pVehicle === "number" ? GetEntityModel(pVehicle) : null;
    if (!vehicleStats) return { power: 0, class: "D" };

    const stats = Math.round((vehicleStats.acceleration * 5 + vehicleStats.speed + vehicleStats.handling + vehicleStats.braking) * 15);

    if (vehicleModel && VEHICLE_CLASS_OVERRIDES[vehicleModel]) {
        return { power: stats, class: VEHICLE_CLASS_OVERRIDES[vehicleModel] };
    }

    return { power: stats, class: GetRatingClass(stats, vehicleStats.category === 8) };
}

global.exports("GetVehicleRating", GetVehicleRating);

const Locales = new Map([
    ["tyres", "Tyres"],
    ["body", "Body"],
    ["clutch", "Clutch"],
    ["tank", "Fuel Tank"],
    ["axle", "Axle Tree"],
    ["brakes", "Brake Discs"],
    ["engine", "Engine Block"],
    ["injector", "Fuel Injectors"],
    ["electronics", "Electronics"],
    ["radiator", "Engine Radiator"],
    ["transmission", "Transmission"]
]);

export function GetLocale(pKey: string) {
    return Locales.get(pKey);
}
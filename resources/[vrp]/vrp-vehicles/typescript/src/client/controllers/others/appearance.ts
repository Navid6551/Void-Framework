export function GetVehicleExtras(pVehicle: number) {
    const pExtras = [];
    for (let i = 0; i < 12; i += 1) {
        IsVehicleExtraTurnedOn(pVehicle, i) && pExtras.push(i);
    }
    return pExtras;
}

export function SetVehicleExtras(pVehicle: number, pData: any) {
    for (let i = 0; i < 12; i += 1) {
        const pSorted = pData.some((item: any) => item === i);
        SetVehicleExtra(pVehicle, i, !pSorted);
    }
}

export function GetVehicleNeons(pVehicle: number) {
    return {
        left: IsVehicleNeonLightEnabled(pVehicle, 0),
        right: IsVehicleNeonLightEnabled(pVehicle, 1),
        front: IsVehicleNeonLightEnabled(pVehicle, 2),
        back: IsVehicleNeonLightEnabled(pVehicle, 3)
    }
}

export function SetVehicleNeons(pVehicle: number, pData: any) {
    if (pData.left) {
        SetVehicleNeonLightEnabled(pVehicle, 0, pData.left);
    }
    if (pData.right) {
        SetVehicleNeonLightEnabled(pVehicle, 1, pData.right);
    }
    if (pData.front) {
        SetVehicleNeonLightEnabled(pVehicle, 2, pData.front);
    }
    if (pData.back) {
        SetVehicleNeonLightEnabled(pVehicle, 3, pData.back);
    }
}

export function GetVehicleColor(pVehicle: number, pType: string) {
    switch (pType) {
        case "primary": {
            return GetVehicleColours(pVehicle)[0];
        }
        case "secondary": {
            return GetVehicleColours(pVehicle)[1];
        }
        case "pearlescent": {
            return GetVehicleExtraColours(pVehicle)[0];
        }
        case "wheels": {
            return GetVehicleExtraColours(pVehicle)[1];
        }
        case "tyre": {
            const [r, g, b] = GetVehicleTyreSmokeColor(pVehicle);
            return { r: r, g: g, b: b };
        }
        case "neon": {
            const [r, g, b] = GetVehicleNeonLightsColour(pVehicle);
            return { r: r, g: g, b: b };
        }
        case "xenon": {
            return GetVehicleXenonLightsColour(pVehicle);
        }
        case "dashboard": {
            return GetVehicleDashboardColour(pVehicle);
        }
        case "interior": {
            return GetVehicleInteriorColour(pVehicle);
        }
    }
}

export function SetVehicleColor(pVehicle: number, pType: string, pData: any) {
    switch (pType) {
        case "primary": {
            const [primary, secondary] = GetVehicleColours(pVehicle);
            return SetVehicleColours(pVehicle, pData, secondary);
        }
        case "secondary": {
            const [primary] = GetVehicleColours(pVehicle);
            return SetVehicleColours(pVehicle, primary, pData);
        }
        case "pearlescent": {
            const [pearlescent, wheels] = GetVehicleExtraColours(pVehicle);
            return SetVehicleExtraColours(pVehicle, pData, wheels);
        }
        case "wheels": {
            const [pearlescent] = GetVehicleExtraColours(pVehicle);
            return SetVehicleExtraColours(pVehicle, pearlescent, pData);
        }
        case "tyre": {
            return SetVehicleTyreSmokeColor(pVehicle, pData.r, pData.g, pData.b);
        }
        case "neon": {
            return SetVehicleNeonLightsColour(pVehicle, pData.r, pData.g, pData.b);
        }
        case "xenon": {
            return SetVehicleXenonLightsColour(pVehicle, pData);
        }
        case "dashboard": {
            return SetVehicleDashboardColour(pVehicle, pData);
        }
        case "interior": {
            return SetVehicleInteriorColour(pVehicle, pData);
        }
    }
}

export function GetVehicleAdditional(pVehicle: number, pType: string) {
    switch (pType) {
        case "tint": {
            return GetVehicleWindowTint(pVehicle);
        }
        case "neon": {
            return GetVehicleNeons(pVehicle);
        }
        case "extras": {
            return GetVehicleExtras(pVehicle);
        }
        case "wheelType": {
            return GetVehicleWheelType(pVehicle);
        }
        case "oldLivery": {
            return GetVehicleLivery(pVehicle);
        }
        case "plateIndex": {
            return GetVehicleNumberPlateTextIndex(pVehicle);
        }
    }
}

export function SetVehicleAdditional(pVehicle: number, pType: string, pData: any) {
    switch (pType) {
        case "tint": {
            return SetVehicleWindowTint(pVehicle, pData);
        }
        case "neon": {
            return SetVehicleNeons(pVehicle, pData);
        }
        case "extras": {
            return SetVehicleExtras(pVehicle, pData);
        }
        case "wheelType": {
            return SetVehicleWheelType(pVehicle, pData);
        }
        case "oldLivery": {
            return SetVehicleLivery(pVehicle, pData);
        }
        case "plateIndex": {
            return SetVehicleNumberPlateTextIndex(pVehicle, pData);
        }
    }
}

export function GetVehicleDamage(pVehicle: number, pType: string) {
    switch (pType) {
        case "body": {
            return +GetVehicleBodyHealth(pVehicle).toFixed(2);
        }
        case "engine": {
            return +GetVehicleEngineHealth(pVehicle).toFixed(2);
        }
        case "dirt": {
            return +GetVehicleDirtLevel(pVehicle).toFixed(2);
        }
        case "windows": {
            const windows = [];
            for (let i = 0; i < 8; i += 1) {
                windows.push({ index: i, broken: !IsVehicleWindowIntact(pVehicle, i) });
            }

            return windows;
        }
        case "doors": {
            const doors = [];
            for (let i = 0; i < 7; i += 1) {
                if (DoesVehicleHaveDoor(pVehicle, i)) {
                    doors.push({ index: i, broken: IsVehicleDoorDamaged(pVehicle, i) });
                }
            }

            return doors;
        }
        case "wheels": {
            const totalWheels = GetVehicleNumberOfWheels(pVehicle);
            const wheels = [];
            for (let i = 0; i < totalWheels; i += 1) {
                let wheelHealth = +GetVehicleWheelHealth(pVehicle, i).toFixed(2);
                if (IsVehicleTyreBurst(pVehicle, i, false)) wheelHealth = 0.1;
                wheels.push({ index: i, health: wheelHealth });
            }

            return wheels;
        }
    }
}

export function SetVehicleDamage(pVehicle: number, pType: string, pData: any) {
    switch (pType) {
        case "body": {
            return SetVehicleBodyHealth(pVehicle, pData);
        }
        case "engine": {
            return SetVehicleEngineHealth(pVehicle, pData);
        }
        case "dirt": {
            return SetVehicleDirtLevel(pVehicle, pData);
        }
        case "windows": {
            return pData.forEach((window: any) => {
                if (window.broken) {
                    SmashVehicleWindow(pVehicle, window.index);
                }
            });
        }
        case "doors": {
            return pData.forEach((door: any) => {
                if (door.broken) {
                    SetVehicleDoorBroken(pVehicle, door.index, true);
                }
            });
        }
        case "wheels": {
            return pData.forEach((wheel: any) => {
                if (wheel.health < 50) {
                    SetVehicleTyreBurst(pVehicle, wheel.index, true, 1000);
                } else {
                    if (wheel.health < 100) {
                        SetVehicleTyreBurst(pVehicle, wheel.index, false, 1);
                    } else {
                        SetVehicleWheelHealth(pVehicle, wheel.index, wheel.health);
                    }
                }
            });
        }
    }
}

export function GetVehicleColors(pVehicle: number) {
    return {
        primary: GetVehicleColor(pVehicle, "primary"),
        secondary: GetVehicleColor(pVehicle, "secondary"),
        pearlescent: GetVehicleColor(pVehicle, "pearlescent"),
        wheels: GetVehicleColor(pVehicle, "wheels"),
        tyre: GetVehicleColor(pVehicle, "tyre"),
        neon: GetVehicleColor(pVehicle, "neon"),
        xenon: GetVehicleColor(pVehicle, "xenon"),
        dashboard: GetVehicleColor(pVehicle, "dashboard"),
        interior: GetVehicleColor(pVehicle, "interior")
    }
}

export function SetVehicleColors(pVehicle: number, pData: any) {
    for (const [key, value] of Object.entries(pData)) {
        SetVehicleColor(pVehicle, key, value);
    }

    if (pData.dashboard && pData.interior === undefined) {
        SetVehicleColor(pVehicle, "interior", pData.dashboard);
    }

    if (pData.interior && pData.dashboard === undefined) {
        SetVehicleColor(pVehicle, "dashboard", pData.interior);
    }
}

export function GetVehicleAppearance(pVehicle: number) {
    return {
        colors: GetVehicleColors(pVehicle),
        tint: GetVehicleAdditional(pVehicle, "tint"),
        neon: GetVehicleAdditional(pVehicle, "neon"),
        extras: GetVehicleAdditional(pVehicle, "extras"),
        wheelType: GetVehicleAdditional(pVehicle, "wheelType"),
        oldLivery: GetVehicleAdditional(pVehicle, "oldLivery"),
        plateIndex: GetVehicleAdditional(pVehicle, "plateIndex")
    }
}

export function SetVehicleAppearance(pVehicle: number, pData: VehicleAppearance) {
    for (const [key, value] of Object.entries(pData)) {
        if (key !== "colors") {
            SetVehicleAdditional(pVehicle, key, value);
        } else {
            SetVehicleColors(pVehicle, value);
        }
    }
}

export function FetchVehicleDamage(pVehicle: number) {
    return {
        body: GetVehicleDamage(pVehicle, "body"),
        engine: GetVehicleDamage(pVehicle, "engine"),
        dirt: GetVehicleDamage(pVehicle, "dirt"),
        windows: GetVehicleDamage(pVehicle, "windows"),
        doors: GetVehicleDamage(pVehicle, "doors"),
        wheels: GetVehicleDamage(pVehicle, "wheels")
    }
}

export function RestoreVehicleDamage(pVehicle: number, pData: VehicleDamage) {
    for (const [key, value] of Object.entries(pData)) {
        SetVehicleDamage(pVehicle, key, value);
    }
}

global.exports("GetVehicleAppearance", GetVehicleAppearance);
global.exports("SetVehicleAppearance", SetVehicleAppearance);
const electricVehicles = [GetHashKey('polfegway'), GetHashKey('npdrone'), GetHashKey('f10m5rc'), GetHashKey('savanna'), GetHashKey('voltic'), GetHashKey('raiden'), GetHashKey('neon'), GetHashKey('dilettante'), GetHashKey('khamelion'), GetHashKey('teslapd')];

export function InitElectric(): void { };

function IsVehicleElectric(pEntity: number) {
    return electricVehicles.includes(GetEntityModel(pEntity));
}
global.exports('IsVehicleElectric', IsVehicleElectric);
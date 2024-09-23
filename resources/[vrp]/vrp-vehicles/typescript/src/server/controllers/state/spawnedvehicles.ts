const spawnedVehicles: Map<string, { netId: number, coords: Vector3 }> = new Map();

export function AddSpawnedVehicle(pVin: string, pNetId: number, pCoords: Vector3): void {
    spawnedVehicles.set(pVin, {
        netId: pNetId,
        coords: pCoords,
    });
}

export function RemoveSpawnedVehicle(pVin: string): void {
    spawnedVehicles.delete(pVin);
}

export function GetSpawnedVehicle(pVin: string) {
    return spawnedVehicles.get(pVin);
}
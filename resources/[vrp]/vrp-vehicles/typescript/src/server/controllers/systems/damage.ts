import { GetStateBag } from '../../../shared/controllers/statebags';
import { GetDefaultDegradation, GetSpawnInfo } from '../spawn';

export function GetVehicleDegradation(pVehicle: number) {
    const bag = Entity(Number(pVehicle));
    return bag.state?.degradation ? bag.state?.degradation : GetDefaultDegradation();
}

export async function SetVehicleDegradation(pVehicle: number, pDegradation: VehicleDegradation) {
    const bag = Entity(Number(pVehicle));

    if (bag) {
        bag.state.degradation = pDegradation;

        if (bag.state.vin) {
            await SQL.execute("UPDATE _vehicle SET degradation = @degradation WHERE vin = @vin", {
                degradation: JSON.stringify(pDegradation),
                vin: bag.state.vin,
            });
        }

        return true;
    }

    return false;
}

export function ReduceVehicleDegradation(pVehicle: number, pDegradation: VehicleDegradation) {

    const bag = GetStateBag(pVehicle);

    if (bag) {
        const degradation = GetVehicleDegradation(pVehicle);

        if (degradation) {
            for (const [key] of Object.entries(degradation)) {
                if (degradation[key] + pDegradation[key] <= 100) {
                    degradation[key] += pDegradation[key];
                }
            }

            bag.state.degradation = degradation;

            return true;
        }
    }
}

export function AddVehicleDegredation(pVehicle: number, pDegradation: VehicleDegradation) {    
    const bag = Entity(Number(pVehicle));

    if (bag) {
        const degradation = GetVehicleDegradation(pVehicle);

        if (degradation) {
            for (const [key] of Object.entries(degradation)) {
                if (degradation[key] - pDegradation[key] >= 0) {
                    degradation[key] -= pDegradation[key];
                }
            }

            bag.state.degradation = degradation;

            return true;
        }
    }
}

export async function FixVehicleDegredation(pVehicle: number, pPart: string, pAmount: number) {        
    const bag = Entity(Number(pVehicle));

    if (bag) {
        const degradation = bag.state.degradation;
        const newDegradation = degradation[pPart] + pAmount;

        if (newDegradation >= 100) {
            degradation[pPart] = 100;
        } else {
            degradation[pPart] += pAmount;
        }

        bag.state.degradation = degradation;

        if (bag.state.vin) {
            await SQL.execute("UPDATE _vehicle SET degradation = @degradation WHERE vin = @vin", {
                degradation: JSON.stringify(degradation),
                vin: bag.state.vin,
            });
        }
    }
}

export async function CanRepairDegradation(pVehicle: number, pPart: string, pAmount: number) {
    const bag = Entity(Number(pVehicle));

    if (bag) {
        const degradation = bag.state.degradation;
        //const newDegradation = degradation[pPart] += pAmount;

        // if (newDegradation >= 100) {
        //     return false;
        // }

        return true;
    }

    return false;
}

export async function SaveVehicleDamage(pVehicle: number) {
    const spawnInfo = await GetSpawnInfo(pVehicle);
    
    if (spawnInfo) {
        if (spawnInfo.vin) {
            if (spawnInfo.damage) {
                await SQL.execute("UPDATE _vehicle SET damage = @damage WHERE vin = @vin", {
                    damage: JSON.stringify(spawnInfo.damage),
                    vin: spawnInfo.vin,
                });
            }
        }
    }
}
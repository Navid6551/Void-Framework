import { Thread } from '../../classes/thread';
import { GetRandom } from '../../utils/tools';
import { GetLocale, GetVehicleRating } from '../others/stats';
import { DriverThread } from '../threads/driver';
import { TurnOffEngine } from '../vehicle';
import { ApplyHandlingMultipliers, SetHandlingContextMultiplier } from './handling';
import { GetVehicleMileage } from './mileage';

const Degradations = new Map<number, VehicleDegradation>();

export async function InitDamage(): Promise<void> { };

export function GetVehicleDegradation(pVehicle: number): VehicleDegradation {
    if (!DoesEntityExist(pVehicle)) return false as any;
    const ent = Entity(pVehicle);
    if (ent) {
        const result = ent.state?.degradation ? ent.state?.degradation : GetDefaultDegradation();
        return result;
    } else {
        return GetDefaultDegradation();
    }
}

global.exports('GetVehicleDegradation', GetVehicleDegradation);

export function GetDefaultDegradation(): VehicleDegradation {
    return {
        axle: 100,
        brakes: 100,
        clutch: 100,
        electronics: 100,
        injector: 100,
        radiator: 100,
        tyres: 100,
        engine: 100,
        body: 100,
        transmission: 100
    };
}

export function ShowVehicleDegradation(pVehicle: number, isMechanic: boolean) {
    const degradation = GetVehicleDegradation(pVehicle);
    const mileage = GetVehicleMileage(pVehicle);
    if (!degradation) return;

    const rating = GetVehicleRating(pVehicle);
    if (!rating) return;

    let menuData: any = [];

    for (const [key, value] of Object.entries(degradation)) {
        let curState = "";
        if (isMechanic) {
            curState = `Current State: ${value.toFixed(2)}% | Parts Required: ${Math.floor((100 - value) / 10)}`;
        } else {
            const state = value > 85 ? "Excellent Condition" : value > 75 ? "Good Condition" : value > 50 ? "Bad Condition" : value > 25 ? "Terrible Condition" : "Absolutely Fucked";
            curState = state;
        }

        menuData.push({
            title: GetLocale(key),
            description: curState
        })
    }

    menuData = menuData.sort((a: any, b: any) => {
        return a.title.localeCompare(b.title)
    });

    global.exports["vrp-ui"].showContextMenu([
        {
            title: "Vehicle Information",
            description: `Class: ${rating.class} | Rating: ${isMechanic ? rating.power : "Unknown"} | Mileage: ${Number(mileage).toFixed(1)}`
        },
        {
            title: "Vehicle Diagnostics",
            description: "",
            children: menuData
        }
    ])
}

global.exports("ShowVehicleDegradation", ShowVehicleDegradation);

export function DoRandomDegradation(pVehicle: number, pLimit = 2, pBool = false): void {
    if (!pBool && GetRandom(100) > 20) return;
    if (!Degradations.has(pVehicle)) Degradations.set(pVehicle, GetVehicleDegradation(pVehicle)); //GetDefaultDegradation();

    const degradation: any = Degradations.get(pVehicle);

    for (const [key] of Object.entries(degradation)) {
        //Check if it's less than 0 if it is don't do anything
        degradation[key] = +(degradation[key] - GetRandom(pLimit)).toFixed(2);
    }

    // Applying degen changes to current vehicle.
    ApplyDegen(pVehicle);
}

export async function SaveDegradation(pVehicle: number) {
    const degradation = Degradations.get(pVehicle);
    if (!degradation) return;

    const netId = NetworkGetNetworkIdFromEntity(pVehicle);
    const saved = await RPC.execute("vrp:vehicles:addDegradation", netId, degradation);

    if (saved) {
        Degradations.delete(pVehicle);
    }
}

export function DoRandomTyreDamage(pVehicle: number, pTyre: number, pMin: number, pMax?: number) {
    const currentWheelHealth = GetVehicleWheelHealth(pVehicle, pTyre);

    const damage = pMax ? GetRandom(pMin, pMax) : GetRandom(pMin);
    const newWheelHealth = currentWheelHealth - damage;

    SetVehicleWheelHealth(pVehicle, pTyre, newWheelHealth);

    if (newWheelHealth < 300 && !IsVehicleTyreBurst(pVehicle, pTyre, false)) {
        SetVehicleTyreBurst(pVehicle, pTyre, true, 100);
    }

    return newWheelHealth;
}

export function HasVehicleClass(pClass: number) {
    return pClass === 13 || pClass === 14 || pClass === 15 || pClass === 16;
}

let degenVehicle = 0;
let newSetting = false;

const DegenList = {
    axle: [["fTractionBiasFront", false]],
    brakes: [["fBrakeForce", true], ["fHandBrakeForce", true]],
    clutch: [["fClutchChangeRateScaleUpShift", true]],
    electronics: [] as any,
    injector: [["fInitialDriveMaxFlatVel", true]],
    radiator: [["fEngineDamageMult", false]],
    tyres: [["fLowSpeedTractionLossMult", false]],
    engine: [["fInitialDriveForce", true]],
    body: [["fDeformationDamageMult", false], ["fCollisionDamageMult", false]],
    transmission: [["fClutchChangeRateScaleDownShift", true], ["fInitialDragCoeff", false]]
};

const ApplyDegen = (pVehicle: number) => {
    const CurrentDegen = GetVehicleDegradation(pVehicle);
    if (!CurrentDegen) return;
    newSetting = false;

    for (const [key, entries] of Object.entries(DegenList)) {
        entries.forEach((entry: any) => {
            const curDegen = CurrentDegen[key];
            let value = 1;

            if (curDegen <= 75) {
                newSetting = true;
                if (entry[1]) {
                    value -= (1 - curDegen / 100) / 2;
                } else {
                    value += (1 - curDegen / 100) / 2;
                }
            }

            SetHandlingContextMultiplier(pVehicle, entry[0], "degradation", "multiplier", value, 0);
        });
    }

    ApplyHandlingMultipliers(pVehicle);
}

const ApplyDegenEffect = (pVehicle: number) => {
    const degradation = GetVehicleDegradation(pVehicle);
    if (!degradation) return;

    if (degradation.brakes < 60 && GetRandom(1, 4) > 3) {
        SetVehicleBrakeLights(pVehicle, true);
    }

    if (degradation.clutch < 60 && GetRandom(1, 4) > 3) {
        SetVehicleHandbrake(pVehicle, true);
        setTimeout(() => {
            SetVehicleHandbrake(pVehicle, false);
        }, 1000);
        SetVehicleEngineHealth(pVehicle, GetVehicleEngineHealth(pVehicle) - 50);
    }

    if (degradation.electronics < 60) {
        SetVehicleLightMultiplier(pVehicle, GetRandom(0, 10) / 10);
        SetVehicleIndicatorLights(pVehicle, GetRandom(0, 1), true);
    }

    if (degradation.electronics < 30 && GetRandom(1, 4) > 3) {
        TurnOffEngine(pVehicle, true);
    }

    if (degradation.injector < 60 && GetRandom(1, 4) > 3) {
        TurnOffEngine(pVehicle, true);
        SetVehicleEngineHealth(pVehicle, GetVehicleEngineHealth(pVehicle) - 50);
    }

    if (degradation.injector < 30 && GetRandom(1, 20) > 19) {
        SetVehiclePetrolTankHealth(pVehicle, 500);
    }

    if (degradation.radiator < 60 && GetRandom(1, 4) > 3) {
        SetVehicleEngineHealth(pVehicle, GetVehicleEngineHealth(pVehicle) - 50);
        if (degradation.body < 50 && GetRandom(1, 20) > 19) {
            SetVehicleDoorBroken(pVehicle, GetRandom(0, 5), false);
        }

        if (degradation.transmission < 40 && GetRandom(1, 4) > 3) {
            SetVehicleBurnout(pVehicle, true);
            setTimeout(() => {
                SetVehicleBurnout(pVehicle, false);
            }, 2000);
            SetVehicleEngineHealth(pVehicle, GetVehicleEngineHealth(pVehicle) - 50);
        }
    }
}

DriverThread.addHook("preStart", function (this: Thread) {
    this.data.damage = {};
    this.data.damageTick = 0;
});

DriverThread.addHook("afterStart", function (this: Thread) {
    this.data.degenTick = 0;
    newSetting = false;
    degenVehicle = this.data.vehicle;

    SetDisableVehiclePetrolTankDamage(this.data.vehicle, true);
    SetVehicleEngineCanDegrade(this.data.vehicle, false);
    ApplyDegen(degenVehicle);
});

DriverThread.addHook("active", function (this: Thread) {
    if (++this.data.damageTick > 30) {
        this.data.damageTick = 0;

        const avgSpeed = this.data.averageSpeed * 0.00833;
        const speed = avgSpeed * 25 / 100 + this.data.averageSpeed * 5 / 100;
        const wheels = GetVehicleNumberOfWheels(this.data.vehicle);

        for (let i = 0; i < wheels; i += 1) {
            DoRandomTyreDamage(this.data.vehicle, i, avgSpeed + speed);
        }
    } else if (++this.data.degenTick > 10 && newSetting) {
        ApplyDegenEffect(this.data.vehicle);
        this.data.degenTick = 0;
    }
});

DriverThread.addHook("preStop", function (this: Thread) {
    if (HasVehicleClass(this.data.vehicleClass)) return;
    SaveDegradation(this.data.vehicle);
});

DriverThread.addHook("afterStop", function (this: Thread) {
    newSetting = false;
    this.data.damageTick = 0;
    this.data.degenTick = 0;
});
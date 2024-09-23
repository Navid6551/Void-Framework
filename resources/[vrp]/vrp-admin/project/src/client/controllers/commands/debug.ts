import { Delay } from "@shared/utils/tools";
import { drawTxt } from "client/util/util";

let debugMode = false;
let debugTick: any = null;

export async function toggleDebugMode(pEnabled: boolean) {
    debugMode = pEnabled;
    if (pEnabled) {
        debugTick = setTick(() => {
            runDebugMode();
        });
    }
    else {
        clearTick(debugTick);
    }
}

async function runDebugMode() {
    let accel = 0;
    let braking = 0;
    let sixty = 0;
    let hundred = 0;
    let thirty = 0;
    let hundredtwenty = 0;
    let timestart = 0;
    let timestartbraking = 0;
    let airtime = 0;
    let lastairtime = 0;
    let airTimeStart = 0;
    let vehicleAir = false;
    let vehicleSuspensionStress = false;
    let vehicleSuspensionStressRear = false;
    let suspensionTimeStart = 0;
    let suspensionTimeStartRear = 0;
    let susTime = 0;
    let susRearTime = 0;

    while (debugMode) {
        await Delay(1);

        let ped = PlayerPedId();
        let veh = GetVehiclePedIsIn(ped, false);
        let pos = GetEntityCoords(ped);

        const forPos = GetOffsetFromEntityInWorldCoords(ped, 0, 1.0, 0.0);
        const backPos = GetOffsetFromEntityInWorldCoords(ped, 0, -1.0, 0.0);
        const LPos = GetOffsetFromEntityInWorldCoords(ped, 1.0, 0.0, 0.0);
        const RPos = GetOffsetFromEntityInWorldCoords(ped, -1.0, 0.0, 0.0);

        const forPos2 = GetOffsetFromEntityInWorldCoords(ped, 0, 2.0, 0.0);
        const backPos2 = GetOffsetFromEntityInWorldCoords(ped, 0, -2.0, 0.0);
        const LPos2 = GetOffsetFromEntityInWorldCoords(ped, 2.0, 0.0, 0.0);
        const RPos2 = GetOffsetFromEntityInWorldCoords(ped, -2.0, 0.0, 0.0);

        const [x, y, z] = GetEntityCoords(ped, true);
        let currentStreetHash, intersectStreetHash = GetStreetNameAtCoord(x, y, z);
        const currentStreetName = GetStreetNameFromHashKey(currentStreetHash);

        let zone = String(GetNameOfZone(x, y, z));
        if (!zone) {
            zone = "UNKNOWN";
        } else {
            zone = GetLabelText(zone);
        }

        drawTxt(0.8, 0.50, 0.4, 0.4, 0.30, `Heading:  ${GetEntityHeading(ped)}`, [55, 155, 55, 255]);
        drawTxt(0.8, 0.52, 0.4, 0.4, 0.30, `Coords: ${pos}`, [55, 155, 55, 255]);
        drawTxt(0.8, 0.54, 0.4, 0.4, 0.30, `Attached Ent: ${GetEntityAttachedTo(ped)}`, [55, 155, 55, 255]);
        drawTxt(0.8, 0.56, 0.4, 0.4, 0.30, `Health: ${GetEntityHealth(ped)}`, [55, 155, 55, 255]);
        drawTxt(0.8, 0.58, 0.4, 0.4, 0.30, `H a G: ${GetEntityHeightAboveGround(ped)}`, [55, 155, 55, 255]);
        drawTxt(0.8, 0.60, 0.4, 0.4, 0.30, `Model: ${GetEntityModel(ped)}`, [55, 155, 55, 255]);
        drawTxt(0.8, 0.62, 0.4, 0.4, 0.30, `Speed: ${GetEntitySpeed(ped)}`, [55, 155, 55, 255]);
        drawTxt(0.8, 0.64, 0.4, 0.4, 0.30, `Frame Time: ${GetFrameTime()}`, [55, 155, 55, 255]);
        drawTxt(0.8, 0.66, 0.4, 0.4, 0.30, `Street: ${currentStreetName}`, [55, 155, 55, 255]);
        drawTxt(0.8, 0.68, 0.4, 0.4, 0.30, `Hood: ${zone}`, [55, 155, 55, 255]);

        if (IsDisabledControlPressed(0, 37)) {
            accel = 0;
            braking = 0;
            sixty = 0;
            hundred = 0;
            thirty = 0;
            hundredtwenty = 0;
            timestart = 0;
            timestartbraking = 0;
            airtime = 0;
            lastairtime = 0;
            airTimeStart = 0;
            vehicleAir = false;
            vehicleSuspensionStress = false;
            vehicleSuspensionStressRear = false;
            suspensionTimeStart = 0;
            suspensionTimeStartRear = 0;
            susTime = 0;
            susRearTime = 0;
            timestart = GetGameTimer();
        }

        if (veh !== 0 && veh !== null) {
            const mph = Math.ceil(GetEntitySpeed(ped) * 2.236936);

            if (IsControlJustPressed(0, 32) && !IsControlPressed(0, 18) || IsControlJustReleased(0, 18)) {
                thirty = 0;
                sixty = 0;
                hundred = 0;
                hundredtwenty = 0;
                accel = 0;
                vehicleAir = false;
                timestart = GetGameTimer();
            }

            if (IsControlPressed(0, 32)) {
                accel = GetGameTimer() - timestart;
            }

            if (IsControlJustPressed(0, 8) && GetEntitySpeed(ped) > 0.0) {
                braking = 0;
                timestartbraking = GetGameTimer();
            }

            if (IsControlPressed(0, 8) && GetEntitySpeed(ped) > 5) {
                braking = GetGameTimer() - timestartbraking;
            }

            if (mph === 30 && IsControlPressed(0, 32) && thirty === 0) {
                thirty = accel / 1000;
            }

            if (mph === 60 && IsControlPressed(0, 32) && sixty === 0) {
                sixty = accel / 1000;
            }

            if (mph === 90 && IsControlPressed(0, 32) && hundred === 0) {
                hundred = accel / 1000;
            }

            if (mph === 100 && IsControlPressed(0, 32) && hundredtwenty === 0) {
                hundredtwenty = accel / 1000;
            }

            if (IsEntityInAir(veh) && mph > 0 && !vehicleAir) {
                vehicleAir = true;
                airTimeStart = GetGameTimer();
            } else if (vehicleAir && !IsEntityInAir(veh) && mph > 0) {
                airtime = airtime + (GetGameTimer() - airTimeStart);
                vehicleAir = false;
            }

            const frontSusLost = (GetVehicleWheelSuspensionCompression(veh, 0) < 0.1 || GetVehicleWheelSuspensionCompression(veh, 1) < 0.1);
            const rearSusLost = (GetVehicleWheelSuspensionCompression(veh, 2) < 0.1 || GetVehicleWheelSuspensionCompression(veh, 3) < 0.1);

            if (mph > 0 && !vehicleSuspensionStress && frontSusLost) {
                vehicleSuspensionStress = true;
                suspensionTimeStart = GetGameTimer();
            } else if (vehicleSuspensionStress && mph > 0 && !frontSusLost) {
                susTime = susTime + (GetGameTimer() - suspensionTimeStart);
                vehicleSuspensionStress = false;
            }

            if (mph > 0 && !vehicleSuspensionStressRear && rearSusLost) {
                vehicleSuspensionStressRear = true;
                suspensionTimeStartRear = GetGameTimer();
            } else if (vehicleSuspensionStressRear && mph > 0 && !rearSusLost) {
                susRearTime = susRearTime + (GetGameTimer() - suspensionTimeStartRear);
                vehicleSuspensionStressRear = false;
            }
        }

        drawTxt(1.0, 0.80, 0.4, 0.4, 0.80, `Time Accelerating: ${accel / 1000}`, [55, 155, 55, 255]);
        drawTxt(1.0, 0.82, 0.4, 0.4, 0.80, `Time Braking: ${braking / 1000}`, [155, 55, 55, 255]);

        drawTxt(1.0, 0.84, 0.4, 0.4, 0.80, `30mph: ${thirty}`, [155, 155, 155, 255]);
        drawTxt(1.0, 0.86, 0.4, 0.4, 0.80, `60mph: ${sixty}`, [155, 155, 155, 255]);
        drawTxt(1.0, 0.88, 0.4, 0.4, 0.80, `90mph: ${hundred}`, [155, 155, 155, 255]);
        drawTxt(1.0, 0.90, 0.4, 0.4, 0.80, `120mph: ${hundredtwenty}`, [155, 155, 155, 255]);

        drawTxt(1.0, 0.92, 0.4, 0.4, 0.80, `Air Time: ${airtime / 1000}`, [155, 155, 155, 255]);
        drawTxt(1.0, 0.96, 0.4, 0.4, 0.80, `Suspension F Stress ${susTime / 1000}`, [155, 155, 155, 255]);
        drawTxt(1.0, 0.98, 0.4, 0.4, 0.80, `Suspension R Stress ${susRearTime / 1000}`, [155, 155, 155, 255]);

        DrawLine(pos[0], pos[1], pos[2], forPos[0], forPos[1], forPos[2], 255, 0, 0, 115);
        DrawLine(pos[0], pos[1], pos[2], backPos[0], backPos[1], backPos[2], 255, 0, 0, 115);

        DrawLine(pos[0], pos[1], pos[2], LPos[0], LPos[1], LPos[2], 255, 255, 0, 115);
        DrawLine(pos[0], pos[1], pos[2], RPos[0], RPos[1], RPos[2], 255, 255, 0, 115);

        DrawLine(forPos[0], forPos[1], forPos[2], forPos2[0], forPos2[1], forPos2[2], 255, 0, 255, 115);
        DrawLine(backPos[0], backPos[1], backPos[2], backPos2[0], backPos2[1], backPos2[2], 255, 0, 255, 115);

        DrawLine(LPos[0], LPos[1], LPos[2], LPos2[0], LPos2[1], LPos2[2], 255, 255, 255, 115);
        DrawLine(RPos[0], RPos[1], RPos[2], RPos2[0], RPos2[1], RPos2[2], 255, 255, 255, 115);
    }
}
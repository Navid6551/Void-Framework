import { getValue } from "../state";
import { Vector } from "@shared/classes/vector";

let noClipEnabled = false;
let noClipCam = null;

let speed = 1;
const maxSpeed = 32;

let noClipInputTick = null;
let noClipInputRotationTick = null;
let noClipVehicle = null;

const minY = -89;
const maxY = 89;

export async function toggleNoclip() {
    const playerPed = PlayerPedId();
    const vehicle = GetVehiclePedIsIn(playerPed, false);
    let noClipEntity = null;
    let inVehicle = false;
    const value = await getValue('noclip');
    if (noClipEnabled != value) {
        if (value) {
            if (vehicle !== 0) {
                inVehicle = true;
                noClipVehicle = vehicle;
                noClipEntity = vehicle;
            } else {
                noClipEntity = playerPed;
            }
            noClipCam = await startNoclipCam(noClipEntity, playerPed, inVehicle);
        } else {
            await stopNoclipCam(noClipCam, playerPed);
            noClipCam = null;
            clearTick(noClipInputTick);
            clearTick(noClipInputRotationTick);
            noClipEnabled = value;
            return;
        }
        noClipInputTick = setTick(() => {
            startNoclipInput(noClipEntity, playerPed, inVehicle);
        });
        noClipInputRotationTick = setTick(() => {
            checkInputRotation();
        });
        noClipEnabled = value;
    }
}

async function stopNoclipCam(pCam, pPlayerPed) {
    DestroyCam(pCam, false);
    RenderScriptCams(false, false, 3000, true, false);
    let vehicle = null;
    let inVehicle = null;
    if (noClipVehicle != null) {
        vehicle = noClipVehicle;
        inVehicle = true;
    } else {
        vehicle = pPlayerPed;
    }
    FreezeEntityPosition(vehicle, false);
    ApplyForceToEntityCenterOfMass(vehicle, 0, 0, 0, 0, false, false, false, false);
    SetEntityCollision(vehicle, true, true);
    ResetEntityAlpha(vehicle);
    SetPedCanRagdoll(pPlayerPed, true);
    SetEntityVisible(vehicle, true, false);
    ClearPedTasksImmediately(pPlayerPed);
    if (inVehicle) {
        FreezeEntityPosition(pPlayerPed, false);
        SetEntityCollision(pPlayerPed, true, true);
        ResetEntityAlpha(pPlayerPed);
        SetEntityVisible(pPlayerPed, true, false);
        SetPedIntoVehicle(pPlayerPed, vehicle, -1);
    }
    noClipVehicle = null;
}

async function startNoclipCam(pEntity, pPlayerPed, pInVehicle) {
    const entityCoords = GetEntityCoords(pEntity, false);
    const entityRotation = GetEntityRotation(pEntity, 0);
    const cam = CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', entityCoords[0], entityCoords[1], entityCoords[2], 0, 0, entityRotation[2], 75, true, 2);
    AttachCamToEntity(cam, pEntity, 0, 0, 0, true);
    RenderScriptCams(true, false, 3000, true, false);
    FreezeEntityPosition(pEntity, true);
    SetEntityCollision(pEntity, false, false);
    SetEntityAlpha(pEntity, 0, null);
    SetPedCanRagdoll(pPlayerPed, false);
    SetEntityVisible(pEntity, false, false);
    ClearPedTasksImmediately(pPlayerPed);
    if (pInVehicle) {
        FreezeEntityPosition(pPlayerPed, true);
        SetEntityCollision(pPlayerPed, false, false);
        SetEntityAlpha(pPlayerPed, 0, null);
        SetEntityVisible(pPlayerPed, false, false);
    }
    return cam;
}

function getEntityCoords(pAdd, pPlayerPed, pCamPos, pSpeed, pMultiplier) {
    let entityCoords = new Vector(0, 0, 0);
    const playerCoords = GetEntityCoords(pPlayerPed, false);
    const coords = new Vector(playerCoords[0], playerCoords[1], playerCoords[2]);
    if (pAdd)
        entityCoords = coords.addPlusScaler(pCamPos, pSpeed * pMultiplier);
    else {
        entityCoords = coords.subPlusScaler(pCamPos, pSpeed * pMultiplier);
    }
    return entityCoords;
}

function startNoclipInput(pEntity, pPlayerPed, pInVehicle) {
    const camMatrix = GetCamMatrix(noClipCam);
    const camPos = new Vector(camMatrix[1][0], camMatrix[1][1], camMatrix[1][2]);
    if (IsDisabledControlPressed(2, 17)) speed = Math.min(speed + 0.1, maxSpeed);
    else if (IsDisabledControlPressed(2, 16)) {
        speed = Math.max(0.1, speed - 0.1);
    }
    let multiplier = 1;
    if (IsDisabledControlPressed(2, 209)) {
        multiplier = 2;
    } else {
        if (IsDisabledControlPressed(2, 19))
            multiplier = 4;
        else if (IsDisabledControlPressed(2, 36)) {
            multiplier = 0.25;
        }
    }
    if (IsDisabledControlPressed(2, 32)) {
        const setPos = getEntityCoords(true, pPlayerPed, camPos, speed, multiplier);
        SetEntityCoordsNoOffset(pPlayerPed, setPos.x, setPos.y, setPos.z, false, false, false);
        if (pInVehicle) {
            SetEntityCoordsNoOffset(pEntity, setPos.x, setPos.y, setPos.z, false, false, false);
        }
    } else {
        if (IsDisabledControlPressed(2, 33)) {
            const setPos = getEntityCoords(false, pPlayerPed, camPos, speed, multiplier);
            SetEntityCoordsNoOffset(pPlayerPed, setPos.x, setPos.y, setPos.z, false, false, false);
            if (pInVehicle) {
                SetEntityCoordsNoOffset(pEntity, setPos.x, setPos.y, setPos.z, false, false, false);
            }
        }
    }
    if (IsDisabledControlPressed(2, 34)) {
        const setPos = GetOffsetFromEntityInWorldCoords(pEntity, -speed * multiplier, 0, 0);
        SetEntityCoordsNoOffset(pPlayerPed, setPos[0], setPos[1], GetEntityCoords(pEntity, false)[2], false, false, false);
        if (pInVehicle) {
            SetEntityCoordsNoOffset(pEntity, setPos[0], setPos[1], GetEntityCoords(pEntity, false)[2], false, false, false);
        }
    } else {
        if (IsDisabledControlPressed(2, 35)) {
            const setPos = GetOffsetFromEntityInWorldCoords(pEntity, speed * multiplier, 0, 0);
            SetEntityCoordsNoOffset(pPlayerPed, setPos[0], setPos[1], GetEntityCoords(pEntity, false)[2], false, false, false);
            if (pInVehicle) {
                SetEntityCoordsNoOffset(pEntity, setPos[0], setPos[1], GetEntityCoords(pEntity, false)[2], false, false, false);
            }
        }
    }
    if (IsDisabledControlPressed(2, 51)) {
        const setPos = GetOffsetFromEntityInWorldCoords(pEntity, 0, 0, multiplier * speed / 2);
        SetEntityCoordsNoOffset(pPlayerPed, setPos[0], setPos[1], setPos[2], false, false, false);
        if (pInVehicle) {
            SetEntityCoordsNoOffset(pEntity, setPos[0], setPos[1], setPos[2], false, false, false);
        }
    } else {
        if (IsDisabledControlPressed(2, 52)) {
            const setPos = GetOffsetFromEntityInWorldCoords(pEntity, 0, 0, multiplier * -speed / 2);
            SetEntityCoordsNoOffset(pPlayerPed, setPos[0], setPos[1], setPos[2], false, false, false);
            if (pInVehicle) {
                SetEntityCoordsNoOffset(pEntity, setPos[0], setPos[1], setPos[2], false, false, false);
            }
        }
    }
    if (IsDisabledControlJustPressed(2, 29)) {
        const camFov = GetCamFov(noClipCam);
        SetCamFov(noClipCam, camFov === 75 ? 50 : 75);
    }
    const camRot = GetCamRot(noClipCam, 2);
    SetEntityHeading(pEntity, (360 + camRot[2]) % 360);
    SetEntityVisible(pEntity, false, null);
    if (pInVehicle) {
        SetEntityVisible(pPlayerPed, false, null);
    }
    DisableControlAction(2, 32, true);
    DisableControlAction(2, 33, true);
    DisableControlAction(2, 34, true);
    DisableControlAction(2, 35, true);
    DisableControlAction(2, 36, true);
    DisableControlAction(2, 12, true);
    DisableControlAction(2, 13, true);
    DisableControlAction(2, 14, true);
    DisableControlAction(2, 15, true);
    DisableControlAction(2, 16, true);
    DisableControlAction(2, 17, true);
    DisableControlAction(2, 0, true);
    DisableControlAction(2, 29, true);
    DisablePlayerFiring(PlayerId(), true);
}

function checkInputRotation() {
    const rightAxisX = GetDisabledControlNormal(0, 220);
    const rightAxisY = GetDisabledControlNormal(0, 221);
    if (Math.abs(rightAxisX) > 0 && Math.abs(rightAxisY) > 0) {
        const rotation = GetCamRot(noClipCam, 2);
        const rotZ = rotation[2] + rightAxisX * -10;
        const yValue = rightAxisY * -5;
        let rotX = rotation[0];
        if (rotX + yValue > minY && rotX + yValue < maxY) rotX = rotation[0] + yValue;
        SetCamRot(noClipCam, rotX, rotation[1], rotZ, 2);
    }
}
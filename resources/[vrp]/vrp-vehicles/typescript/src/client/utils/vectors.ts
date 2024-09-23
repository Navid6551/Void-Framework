import { Delay } from "./tools";

export function GetClosestBone(pEntity: number, pArray: any[]) {
    let pBoneIndex = 0;
    let pBoneName = "";
    let pDistance = 0;
    let pWorldPos: any;
    const entCoords = GetEntityCoords(PlayerPedId(), false);
    return pArray.forEach(pItem => {
        let boneIndex = GetEntityBoneIndexByName(pEntity, pItem);
        if (boneIndex === -1) return;
        const worldPos = GetWorldPositionOfEntityBone(pEntity, boneIndex);
        const distance = GetDistance(entCoords, worldPos, false);
        if (!pBoneIndex || distance < pDistance) {
            pBoneIndex = boneIndex, pBoneName = pItem, pWorldPos = worldPos, pDistance = distance;
        }
    }), [pBoneIndex, pBoneName, pDistance, pWorldPos];
}

export async function TurnPedCoords(pPlayerPed: number, [pCoordX, pCoordY, pCoordZ]: number[]) {
    TaskTurnPedToFaceCoord(pPlayerPed, pCoordX, pCoordY, pCoordZ, 0);
    await Delay(100);
    while (GetScriptTaskStatus(pPlayerPed, 0x574bb8f5) === 1) {
        await Delay(0);
    }
}

export async function TurnPedEntity(pPlayerPed: number, pEntity: number) {
    TaskTurnPedToFaceEntity(pPlayerPed, pEntity, 0);
    await Delay(100);
    while (GetScriptTaskStatus(pPlayerPed, 0xcbce4595) === 1) {
        await Delay(0);
    }
}

export function GetDistance([pCoord1X, pCoord1Y, pCoord1Z]: number[], [pCoord2X, pCoord2Y, pCoord2Z]: number[], pUseZ = false) {
    return GetDistanceBetweenCoords(pCoord1X, pCoord1Y, pCoord1Z, pCoord2X, pCoord2Y, pCoord2Z, pUseZ);
}

function unkFunc40(pEntity: number, pType: number, pBoneId: string) {
    let pBoneIndex;
    if (pType === 1 && typeof pBoneId === "number") pBoneIndex = GetPedBoneIndex(pEntity, pBoneId);
    else {
        if (pType === 2 && typeof pBoneId === "string") {
            pBoneIndex = GetEntityBoneIndexByName(pEntity, pBoneId);
        }
    }
    return GetWorldPositionOfEntityBone(pEntity, pBoneIndex as number);
}

export function unkFunc41(pEntity: number, pType: number, pBoneId: string, pCoords: any) {
    const targetCoords = pCoords ? pCoords : GetEntityCoords(PlayerPedId(), false);
    return GetDistance(unkFunc40(pEntity, pType, pBoneId), targetCoords);
}

function unkFunc42(pEntity: number) {
    const [pVector1, pVector2] = GetModelDimensions(GetEntityModel(pEntity));
    return GetOffsetFromEntityInWorldCoords(pEntity, 0, pVector2[1] + 0.5, 0);
}

function unkFunc43(pEntity: number) {
    const [pVector1] = GetModelDimensions(GetEntityModel(pEntity));
    return GetOffsetFromEntityInWorldCoords(pEntity, 0, pVector1[1] - 0.5, 0);
}

export function GetDistanceFromEngine(pEntity: number) {
    const pOffset = unkFunc43(pEntity);
    const pDistance = unkFunc41(pEntity, 2, "engine", pOffset);
    if (pDistance <= 2) return pOffset;
    return unkFunc42(pEntity);
}
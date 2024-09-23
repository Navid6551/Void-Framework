import { Utils } from "../../shared/utils"

export var IsThisCoordsCloseToMe = function (pCoords: any, pCoords2: any) {
  var pAllCords = [pCoords[0] - pCoords2[0], pCoords[1] - pCoords2[1], pCoords[2] - pCoords2[2]];
  var pX = pAllCords[0];
  var pY = pAllCords[1];
  var pZ = pAllCords[2];
  return Math.sqrt(pX * pX + pY * pY + pZ * pZ);
};

export function GetClosestPlayer() {
  var pPlayers = GetActivePlayers(), ped = PlayerId(), pCoords = GetEntityCoords(PlayerPedId(), false), pTargetClose = null, pTarget = null, pPlayerPed = null;
  return pPlayers.forEach(function (pPlayer: any) {
    if (pPlayer !== ped) {
      var pTargetPed = GetPlayerPed(pPlayer), pTargetCoords = GetEntityCoords(pTargetPed, false), isClose = IsThisCoordsCloseToMe(pCoords, pTargetCoords);
      (!pTarget || isClose < pTargetClose) && (pTarget = pPlayer, pPlayerPed = pTargetPed, pTargetClose = isClose);
    }
  }), [
    pTarget,
    pTargetClose,
    pPlayerPed
  ];
}

const LoadEntityModel = async (pModel) => {
  const modelHash = typeof pModel === "number" ? pModel : GetHashKey(pModel)
  if (HasModelLoaded(modelHash))
    return true
  RequestModel(modelHash)
  const hasTimedOut = await Utils.waitForCondition(() => HasModelLoaded(modelHash), 3e3)
  return !hasTimedOut
}

const LoadAnimationDictionary = async (pDict) => {
  if (HasAnimDictLoaded(pDict))
    return true
  RequestAnimDict(pDict)
  const hasTimedOut = await Utils.waitForCondition(() => HasAnimDictLoaded(pDict), 3e3)
  return !hasTimedOut
}

const LoadAnimationClipSet = async (pAnim) => {
  if (HasClipSetLoaded(pAnim))
    return true
  RequestClipSet(pAnim)
  const hasTimedOut = await Utils.waitForCondition(() => HasClipSetLoaded(pAnim), 3e3)
  return !hasTimedOut
}

const LoadTextureDictionary = async (pDict) => {
  if (HasStreamedTextureDictLoaded(pDict))
    return true
  RequestStreamedTextureDict(pDict, true)
  const hasTimedOut = await Utils.waitForCondition(() => HasStreamedTextureDictLoaded(pDict), 3e3)
  return !hasTimedOut
}

const LoadWeaponAsset = async (pWeaponAsset, p1, p2) => {
  const weaponHash = typeof pWeaponAsset === "number" ? pWeaponAsset : GetHashKey(pWeaponAsset)
  if (HasWeaponAssetLoaded(weaponHash))
    return true
  RequestWeaponAsset(weaponHash, p1, p2)
  const hasTimedOut = await Utils.waitForCondition(() => HasWeaponAssetLoaded(weaponHash), 3e3)
  return !hasTimedOut
}

const LoadNamedPtfxAsset = async (pFxName) => {
  if (HasNamedPtfxAssetLoaded(pFxName))
    return true
  RequestNamedPtfxAsset(pFxName)
  const hasTimedOut = await Utils.waitForCondition(() => HasNamedPtfxAssetLoaded(pFxName), 3e3)
  return !hasTimedOut
}

export const Streaming = {
  loadModel: LoadEntityModel,
  loadTexture: LoadTextureDictionary,
  loadAnim: LoadAnimationDictionary,
  loadClipSet: LoadAnimationClipSet,
  loadWeaponAsset: LoadWeaponAsset,
  loadNamedPtfxAsset: LoadNamedPtfxAsset
}
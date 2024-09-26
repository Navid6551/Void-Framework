import { Vector3 } from "@shared/classes/vector";
import { getEntityByObjectId, getObject } from "./events";
import { Delay, getEntityMatrixAsFloat32Array, loadModel, removeEntity, updateEntityTransformation } from "@shared/utils/tools";

export async function InitPlacement() { }

export const checkLineOfSight = (
  layerMask: number,
  ignoreEntity: number,
  distance = 5
) => {
  const cameraPosition = GetGameplayCamCoord();
  const [cameraPitch, , cameraYaw] = GetGameplayCamRot(0).map(angle => Math.PI / 180 * angle);

  const cosPitch = Math.abs(Math.cos(cameraPitch));
  const directionVector = [
    -Math.sin(cameraYaw) * cosPitch,
    Math.cos(cameraYaw) * cosPitch,
    Math.sin(cameraPitch)
  ];

  const endPoint = directionVector.map((component, index) => cameraPosition[index] + component);

  const playerPosition = Vector3.fromArray(GetEntityCoords(PlayerPedId(), false));
  const distanceToPlayer = playerPosition.getDistanceFromArray(cameraPosition);

  const finalPoint = directionVector.map((component, index) => cameraPosition[index] + component * (distance + distanceToPlayer));

  const testResult = StartShapeTestSweptSphere(
    endPoint[0], endPoint[1], endPoint[2],
    finalPoint[0], finalPoint[1], finalPoint[2],
    0.2, layerMask, ignoreEntity, 7
  );

  return GetShapeTestResultIncludingMaterial(testResult);
};


let isPlacingObject = false;

const placeObject = async (model: any, options: any, validationCallback: any = () => true) => {
  let groundSnap: boolean;
  let startPinned: boolean;
  let startWithGizmo: boolean;
  let zOffset: number;
  let alignToSurface: boolean;
  let surfaceOffset: number;
  let maxDistance: number;

  if (isPlacingObject) {
    return [false, null];
  }

  const modelName = typeof model === 'string' ? model.trim() : model;
  if (!IsModelValid(modelName)) {
    return [false, null];
  }

  isPlacingObject = true;
  await loadModel(modelName);

  const [modelMinDims, modelMaxDims] = GetModelDimensions(modelName);
  const modelMinVector = Vector3.fromArray(modelMinDims);
  const modelMaxVector = Vector3.fromArray(modelMaxDims);
  const modelSize = modelMaxVector.sub(modelMinVector);

  const playerPed = PlayerPedId();
  let snapToGround = (options.groundSnap !== null && options.groundSnap !== undefined) ? options.groundSnap : options.forceGroundSnap;
  let heading = GetEntityHeading(playerPed);
  let useModelOffset = options.useModelOffset;
  let isPlacing = true;
  let allowPlacement = true;
  let canPlaceObject = true;
  let pinObject = (options.startPinned !== null && options.startPinned !== undefined) ? options.startPinned : false;
  let showGizmo = options.startPinned && options.startWithGizmo ? (options.startWithGizmo !== null && options.startWithGizmo !== undefined) : false;

  if (pinObject && showGizmo) {
    EnterCursorMode();
  }

  let zOffsetValue = (options.zOffset !== null && options.zOffset !== undefined) ? options.zOffset : 0;
  let adjustZ = false;
  const alignToSurfaceValue = (options.alignToSurface !== null && options.alignToSurface !== undefined) ? options.alignToSurface : false;
  const surfaceOffsetValue = (options.surfaceOffset !== null && options.surfaceOffset !== undefined) ? options.surfaceOffset : 0;
  const maxPlacementDistance = (options.maxDistance !== null && options.maxDistance !== undefined) ? options.maxDistance : 10;

  const object = CreateObjectNoOffset(modelName, 0, 0, 0, false, false, false);
  global.exports['vrp-cleanup'].AddBypassObject(object);
  SetEntityAlpha(object, 200, false);
  SetEntityCollision(object, false, false);
  SetCanClimbOnEntity(object, false);

  if (options.startingCoords) {
    const { x, y, z } = options.startingCoords;
    SetEntityCoords(object, x, y, z, false, false, false, false);
  }

  if (options.startingRotation) {
    const { x, y, z } = options.startingRotation;
    SetEntityRotation(object, x, y, z, 2, true);
  }

  SetEntityDrawOutlineColor(255, 0, 0, 128);

  let gizmoX = 0;
  let gizmoY = 0;

  const updateTick = setTick(() => {
    const [, distance, coords, rotation, forwardVector, surfaceNormal] = checkLineOfSight(19, object, (options.distance !== null && options.distance !== undefined) ? options.distance : 10);
    const objectCoords = Vector3.fromArray(GetEntityCoords(object, true));
    const surfaceCoords = Vector3.fromArray(coords);

    if (distance && !pinObject) {
      gizmoX = forwardVector;
      gizmoY = surfaceNormal;

      if (!snapToGround && useModelOffset) {
        surfaceCoords.z += modelSize.z / 2;
      }

      let modelOffset = [0, 0, 0];
      alignToSurfaceValue ? (heading = -Math.atan2(rotation[0], rotation[1]) * 57.2958 + 180, SetEntityHeading(object, heading), modelOffset = GetEntityForwardVector(object).map(v => v * surfaceOffsetValue)) : SetEntityHeading(object, heading);

      SetEntityCoords(object, surfaceCoords.x - modelOffset[0], surfaceCoords.y - modelOffset[1], surfaceCoords.z - modelOffset[2], false, false, false, false);

      if (snapToGround) {
        PlaceObjectOnGroundProperly_2(object);
      }

      if (zOffsetValue !== 0) {
        const currentCoords = Vector3.fromArray(GetEntityCoords(object, false));
        surfaceCoords.z += zOffsetValue;
        SetEntityCoords(object, currentCoords.x, currentCoords.y, currentCoords.z + zOffsetValue, false, false, false, false);
      }
    } else if (!distance && !pinObject) {
      canPlaceObject = false;
    }

    const placementCoords = snapToGround || pinObject ? objectCoords : surfaceCoords;
    const collisionCheck = options.collision ? !checkCollision(object, playerPed, modelSize, placementCoords, options.colZOffset) : true;
    const currentLocation = global.exports['vrp-housing'].getCurrentLocation();
    const hasPropertyAccess = currentLocation && global.exports['vrp-housing'].hasPropertyAccess(currentLocation);
    const canPlaceInCurrentLocation = currentLocation ? (options.allowHousePlacement || options.allowEditorPlacement) && (!options.checkPropertyAccess || hasPropertyAccess) : options.forceHousePlacement ? false : true;
    const withinMaxDistance = objectCoords.getDistanceFromArray(GetEntityCoords(PlayerPedId(), false)) < maxPlacementDistance;
    const isInApartment = !global.exports['vrp-apartments'].getModule('func').getApartment();

    canPlaceObject = collisionCheck && canPlaceInCurrentLocation && isInApartment && withinMaxDistance && validationCallback(placementCoords, gizmoX, object, gizmoY);
    SetEntityDrawOutline(object, !canPlaceObject);

    if (showGizmo && pinObject) {
      const matrix: any = getEntityMatrixAsFloat32Array(object);
      if (DrawGizmo(matrix, object.toString())) {
        updateEntityTransformation(object, matrix);
      }
    }

    if (options.afterRender) {
      options.afterRender(object, !!distance, canPlaceObject);
    }
  });

  const controlTick = setTick(() => {
    DisableControlAction(0, 44, true);
    DisableControlAction(0, 46, true);
    DisableControlAction(0, 140, true);
    DisableControlAction(0, 20, true);
    DisableControlAction(0, 26, true);
    DisableControlAction(0, 23, true);
    DisableControlAction(0, 16, true);
    DisableControlAction(0, 17, true);
    DisableControlAction(0, 36, true);
    DisableControlAction(0, 24, true);

    const controlPressed = IsDisabledControlPressed(0, 36);

    if (!showGizmo) {
      if (IsDisabledControlPressed(2, 17)) {
        if (adjustZ) {
          zOffsetValue += controlPressed ? 0.1 : 0.5;
        } else {
          heading += controlPressed ? 1 : 5;
          if (!controlPressed) {
            heading = Math.round(heading);
          }
        }
      } else {
        if (IsDisabledControlPressed(2, 16)) {
          if (adjustZ) {
            zOffsetValue -= controlPressed ? 0.1 : 0.5;
          } else {
            heading -= controlPressed ? 1 : 5;
            if (!controlPressed) {
              heading = Math.round(heading);
            }
          }
        }
      }

      if (heading > 360) heading -= 360;
      else if (heading < 0) heading += 360;

      if (options.groundSnap && !options.forceGroundSnap && IsDisabledControlJustPressed(0, 44)) {
        snapToGround = !snapToGround;
      }

      if (options.useModelOffset && IsDisabledControlJustPressed(0, 140)) {
        useModelOffset = !useModelOffset;
      }

      if (options.adjustZ && IsDisabledControlJustPressed(0, 20)) {
        adjustZ = !adjustZ;
        SetEntityAlpha(object, adjustZ ? 255 : 200, false);
      }

      if (canPlaceObject && IsDisabledControlJustPressed(0, 46)) {
        allowPlacement = false;
        isPlacing = false;
      }

      if (!options.disablePinning && IsDisabledControlJustPressed(0, 23)) {
        pinObject = !pinObject;
      }
    }

    if (pinObject && options.allowGizmo && IsDisabledControlJustPressed(0, 26)) {
      showGizmo = !showGizmo;
      if (showGizmo) {
        EnterCursorMode();
      } else {
        LeaveCursorMode();
      }
    }

    if (IsDisabledControlJustPressed(0, 200) || IsDisabledControlJustPressed(0, 177)) {
      isPlacing = false;
    }
  });

  while (isPlacing) {
    await Delay(1);
  }

  if (showGizmo) {
    LeaveCursorMode();
  }

  clearTick(updateTick);
  clearTick(controlTick);

  const finalCoords = Vector3.fromArray(GetEntityCoords(object, true));
  const finalRotation = Vector3.fromArray(GetEntityRotation(object, 2));
  const finalQuaternion = GetEntityQuaternion(object);

  global.exports['vrp-cleanup'].RemoveBypassObject(object);
  removeEntity(object);

  isPlacingObject = false;

  if (allowPlacement) {
    return [false, null];
  }

  const result = {
    coords: finalCoords,
    rotation: finalRotation,
    quaternion: finalQuaternion,
  };

  return [true, result];
};


export function checkCollision(entityId: number, playerPedId: number, objectSize: Vector3, testPosition: Vector3, zOffset: number | null | undefined) {
  const entityRotation = Vector3.fromArray(GetEntityRotation(entityId, 2));
  const scaledObjectSize = Vector3.fromObject(objectSize).multiplyScalar(0.75);

  const testHandle = StartShapeTestBox(
    testPosition.x,
    testPosition.y,
    testPosition.z + (zOffset !== null && zOffset !== undefined ? zOffset : 0),
    scaledObjectSize.x,
    scaledObjectSize.y,
    scaledObjectSize.z,
    entityRotation.x,
    entityRotation.y,
    entityRotation.z,
    2,
    83,
    playerPedId,
    4
  );

  const [, result] = GetShapeTestResultIncludingMaterial(testHandle);
  return result;
}

const placeAndSaveObject = async (
  modelName: string,
  options = {},
  editorOptions: { allowEditorPlacement: any },
  validationFn = () => true,
  category: string = 'objects',
  additionalData: any
) => {
  const [success, placementData]: any = await placeObject(modelName, editorOptions, validationFn);
  if (!success) return null;

  console.log(editorOptions.allowEditorPlacement)
  if (editorOptions.allowEditorPlacement) {
    const currentLocation = global.exports['vrp-housing'].getCurrentLocation();

    if (currentLocation) {
      const [modelDimensions] = GetModelDimensions(modelName);

      const objectData = {
        name: currentLocation,
        modelHash: typeof modelName === 'number' ? modelName : GetHashKey(modelName),
        coords: {
          x: placementData.coords.x,
          y: placementData.coords.y,
          z: placementData.coords.z + modelDimensions[2],
        },
        quat: {
          x: placementData.quaternion[0],
          y: placementData.quaternion[1],
          z: placementData.quaternion[2],
          w: placementData.quaternion[3],
        },
        realName: String(modelName),
      };

      try {
        await global.exports['vrp-editor'].addItemToCurrent(objectData, true);
        await global.exports['vrp-editor'].loadObjects(currentLocation);
      } catch (error) {
        console.log(error);
      } finally {
        global.exports['vrp-editor'].rebuildCurrent(currentLocation);
      }

      return 'HOUSE_OBJECT';
    }
  }

  return await RPC.execute('vrp-objects:SaveObject', category, modelName, placementData.coords, placementData.rotation, options, additionalData);
};

const moveObject = async (
  objectId: any,
  placementOptions: any,
  validationFn = () => true,
  model: any
) => {
  const object = getObject(objectId);
  if (!object) return false;

  const entity = getEntityByObjectId(objectId);
  if (!entity) return false;

  const currentLocation = global.exports['vrp-housing'].getCurrentLocation();
  if (currentLocation) return false;

  const modelHash = typeof model === 'string' ? GetHashKey(model) : model;
  if (model && !IsModelValid(modelHash)) return false;

  SetEntityVisible(entity, false, false);
  SetEntityCollision(entity, false, false);

  const startingCoords = {
    x: object.x,
    y: object.y,
    z: object.z,
  };
  placementOptions.startingCoords = startingCoords;
  placementOptions.startingRotation = object.data.rotation;

  let [success, placementData]: any = await placeObject(modelHash ?? object.data.model, placementOptions, validationFn);
  if (!success) {
    SetEntityCollision(entity, true, true);
    SetEntityVisible(entity, true, false);
    return false;
  }

  success = false;
  try {
    success = await RPC.execute('vrp-objects:UpdateObject', objectId, null, model ? modelHash : null, placementData.coords, placementData.rotation);
  } catch (error) {
    console.error('Failed to move object [' + objectId + ']', error);
  }

  SetEntityCollision(entity, true, true);
  SetEntityVisible(entity, true, false);

  return success;
};


global.exports('PlaceObject', placeObject);
global.exports('PlaceAndSaveObject', placeAndSaveObject);
global.exports('MoveObject', moveObject);
global.exports('IsPlacingObject', () => isPlacingObject);
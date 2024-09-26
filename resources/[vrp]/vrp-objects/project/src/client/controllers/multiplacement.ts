import { Vector3 } from "@shared/classes/vector";
import { Delay, loadModel } from "@shared/utils/tools";
import { checkCollision, checkLineOfSight } from "./placement";

let isPlacing = false;
let currentPosition: Vector3 | null = null;
let pointsCount = 0;
let placedObjects: any[] = [];

export async function InitMultiplacement() { }

const multiPlaceObject = async (
  model: any, 
  options: any, 
  validatePlacement: any = () => true
) => {
  if (isPlacing) return [false, null];
  
  const modelName = typeof model === 'string' ? model.trim() : model;
  if (!IsModelValid(modelName)) return [false, null];
  
  currentPosition = null;
  pointsCount = 0;

  // Clean up existing placed objects
  if (placedObjects.length > 0) {
    placedObjects.forEach(obj => {
      if (DoesEntityExist(obj)) {
        DeleteEntity(obj);
      }
    });
  }
  placedObjects = [];
  isPlacing = true;
  
  await loadModel(modelName);
  
  const [minDimensions, maxDimensions] = GetModelDimensions(modelName);
  const minVec = Vector3.fromArray(minDimensions);
  const maxVec = Vector3.fromArray(maxDimensions);
  const dimensions = maxVec.sub(minVec);
  
  const playerPed = PlayerPedId();
  let playerHeading = GetEntityHeading(playerPed);
  let isValidPlacement = true;

  const maxPoints = options.maxPoints ?? 10;
  const minDistBetweenPoints = options.minDistBetweenPoints ?? 0.5;
  const maxLineDistance = options.maxLineDistance ?? 10;
  
  const previewEntity = CreateObjectNoOffset(modelName, 0, 0, 0, false, false, false);
  SetEntityAlpha(previewEntity, 200, false);
  SetEntityCollision(previewEntity, false, false);
  SetCanClimbOnEntity(previewEntity, false);
  
  const secondPreviewEntity = CreateObjectNoOffset(modelName, 0, 0, 0, false, false, false);
  SetEntityAlpha(secondPreviewEntity, 0, false);
  SetEntityCollision(secondPreviewEntity, false, false);
  SetCanClimbOnEntity(secondPreviewEntity, false);
  SetEntityDrawOutlineColor(255, 0, 0, 128);
  
  const updatePreview = setTick(() => {
    const [found, coords, distance, rotation] = checkLineOfSight(previewEntity, options.distance ?? 10);
    if (found) {
      const position = Vector3.fromArray(coords);
      SetEntityHeading(previewEntity, playerHeading);
      SetEntityCoords(previewEntity, currentPosition?.x ?? position.x, currentPosition?.y ?? position.y, currentPosition?.z ?? position.z, false, false, false, false);
      SetEntityHeading(secondPreviewEntity, playerHeading);
      SetEntityCoords(secondPreviewEntity, position.x, position.y, position.z, false, false, false, false);
      
      const allowHousePlacement = options.allowHousePlacement || !global.exports['vrp-housing'].getCurrentLocation();
      isValidPlacement = (options.collision ? !checkCollision(previewEntity, playerPed, dimensions, position, options.colZOffset) : true) 
                         && allowHousePlacement 
                         && validatePlacement(position, distance, previewEntity, rotation);
      
      if (!currentPosition) {
        DrawMarker(28, position.x, position.y, position.z, 0, 0, 0, 0, 0, 0, 0.2, 0.2, 0.2, isValidPlacement ? 0 : 255, isValidPlacement ? 255 : 0, 0, 100, false, false, 2, false, null, null, false);
        return;
      }
      
      DrawLine(currentPosition.x, currentPosition.y, currentPosition.z + 0.1, position.x, position.y, position.z + 0.1, 0, 200, 0, 200);
      
      if (placedObjects.length > pointsCount) {
        for (let i = placedObjects.length; i >= pointsCount; i--) {
          const obj = placedObjects[i];
          if (obj) {
            DeleteEntity(obj);
            placedObjects[i] = null;
          }
        }
      }
      
      const distanceVector = position.sub(currentPosition);
      const step: any = distanceVector.multiplyScalar(1 / pointsCount);
      for (let i = 0; i < pointsCount; i++) {
        let object = placedObjects[i];
        if (!object) {
          object = CreateObjectNoOffset(modelName, 0, 0, 0, false, false, false);
          SetEntityAlpha(object, 100, false);
          SetEntityCollision(object, false, false);
          SetCanClimbOnEntity(object, false);
          placedObjects[i] = object;
        }
        const pos = step.multiplyScalar(i + 1).add(currentPosition).sub(step);
        SetEntityCoordsNoOffset(object, pos.x, pos.y, pos.z, false, false, false);
        SetEntityHeading(object, playerHeading);
        isValidPlacement = isValidPlacement 
                           && (options.collision ? !checkCollision(object, playerPed, dimensions, position, options.colZOffset) : true)
                           && allowHousePlacement 
                           && validatePlacement(pos, distance, object, rotation);
      }
      
      if (minDistBetweenPoints > 0) {
        isValidPlacement = isValidPlacement && step.magnitude() >= minDistBetweenPoints;
      }
      
      if (maxLineDistance > 0) {
        const currentDistance = position.getDistance(currentPosition);
        isValidPlacement = isValidPlacement && currentDistance <= maxLineDistance && (minDistBetweenPoints > 0 ? currentDistance > minDistBetweenPoints : true);
      }
      
      SetEntityDrawOutline(previewEntity, !isValidPlacement);
      SetEntityDrawOutline(secondPreviewEntity, !isValidPlacement);
    } else {
      isValidPlacement = false;
    }
    
    if (options.afterRender) {
      options.afterRender(previewEntity, !!found, isValidPlacement);
    }
  });
  
  const controlTick = setTick(() => {
    // Disable certain controls
    DisableControlAction(0, 44, true);
    DisableControlAction(0, 46, true);
    DisableControlAction(0, 140, true);
    DisableControlAction(0, 20, true);
    DisableControlAction(0, 16, true);
    DisableControlAction(0, 17, true);
    DisableControlAction(0, 36, true);
    DisableControlAction(0, 21, true);
    
    const isPlaceButtonPressed = IsDisabledControlPressed(0, 21);
    const isRotateButtonPressed = IsDisabledControlPressed(0, 36);
    if (IsDisabledControlPressed(2, 17)) {
      if (!currentPosition || isPlaceButtonPressed) {
        playerHeading += isRotateButtonPressed ? 1 : 5;
        if (!isRotateButtonPressed) playerHeading = Math.round(playerHeading);
      }
    } else {
      if (IsDisabledControlPressed(2, 16)) {
        if (!currentPosition || isPlaceButtonPressed) {
          playerHeading -= isRotateButtonPressed ? 1 : 5;
          if (!isRotateButtonPressed) playerHeading = Math.round(playerHeading);
        }
      }
    }
    playerHeading = (playerHeading + 360) % 360;
    
    if (currentPosition && !isPlaceButtonPressed && IsDisabledControlJustPressed(0, 17)) {
      if (pointsCount < maxPoints) {
        pointsCount++;
      }
    }
    
    if (currentPosition && !isPlaceButtonPressed && IsDisabledControlJustPressed(0, 16)) {
      if (pointsCount > 0) {
        pointsCount--;
      }
    }
    
    if (IsDisabledControlJustPressed(0, 200) || IsDisabledControlJustPressed(0, 177)) {
      isValidPlacement = false;
    }
    
    if (isValidPlacement && IsDisabledControlJustPressed(0, 46)) {
      if (!currentPosition) {
        currentPosition = Vector3.fromArray(GetEntityCoords(previewEntity, false));
        SetEntityAlpha(secondPreviewEntity, 200, false);
        return;
      }
      isPlacing = false;
      isValidPlacement = false;
    }
  });
  
  while (isValidPlacement) {
    await Delay(1);
  }
  
  clearTick(updatePreview);
  clearTick(controlTick);
  
  const finalCoords = [Vector3.fromArray(GetEntityCoords(previewEntity, true))];
  const finalRotations = [Vector3.fromArray(GetEntityRotation(previewEntity, 2))];
  
  DeleteEntity(previewEntity);
  
  for (let i = 0; i < placedObjects.length; i++) {
    const obj = placedObjects[i];
    if (obj) {
      finalCoords.push(Vector3.fromArray(GetEntityCoords(obj, true)));
      finalRotations.push(Vector3.fromArray(GetEntityRotation(obj, 2)));
      DeleteEntity(obj);
    }
  }
  
  finalCoords.push(Vector3.fromArray(GetEntityCoords(secondPreviewEntity, true)));
  finalRotations.push(Vector3.fromArray(GetEntityRotation(secondPreviewEntity, 2)));
  DeleteEntity(secondPreviewEntity);
  
  isPlacing = false;
  
  if (!isValidPlacement) return [false, null];
  
  return [true, { coords: finalCoords, rotations: finalRotations }];
};

global.exports('MultiPlaceObject', multiPlaceObject);
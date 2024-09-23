import * as Mods from '../others/mods';
import * as Appearance from '../others/appearance';
import * as UI from '../ui';
import { GetModuleConfig, IsConfigReady } from '../../utils/config';
import { AddBlip } from '../../utils/blips';
import { PolyZone } from '../../utils/polyZone';
import { Cache } from '../../../shared/classes/cache';
import { Delay, loadAndRequestModel } from '../../utils/tools';

export const garages = new Map<string, GarageInfo>();
export const garageVehicleCache = new Cache();

export let currentGarage: string = null;
export let currentParkingSpot: ParkingSpot = null;
export let previewCar = 0;

export async function InitGarages(): Promise<void> {
  await Delay(3000);
  const pGarages = await RPC.execute('vrp:vehicles:getGarages');

  pGarages && pGarages.forEach((pGarage: GarageInfo) => {
    AddGarage(pGarage.garage_id, pGarage);
  });

  console.log('[INIT] Garages Loaded: ', pGarages.length);
}

export function AddGarage(garageId: string, garageData: GarageInfo) {
  if (!garages.has(garageData.garage_id)) {
    const location = garageData.location;

    if (location.length) {
      PolyZone.addBoxZone(garageData.garage_id, location.vectors, location.length, location.width, location.options);
    } else {
      PolyZone.addCircleZone(garageData.garage_id, location.vectors, location.width, location.options);
    }

    if (garageData.type === "public" && !location.hidden) {
      AddBlip(garageData.garage_id, location.vectors, garageData.name, {
        sprite: 357,
        color: 3,
        scale: 0.8,
        category: 10,
        short: true
      })
    }
  } else {
    console.log("[DEBUG] Garage with ID: ", garageData.garage_id, " already exists");
  }

  garages.set(garageData.garage_id, garageData);
}

export function RemoveGarage(pGarageId: string) {
  return garages.delete(pGarageId);
}

export function GetGarageById(pGarageId: string) {
  return garages.get(pGarageId);
}

export function GetAllGarages() {
  return garages;
}

export function ClearGarageVehicleCache(pGarageId: string, pShouldClear = false) {
  if (pShouldClear) garageVehicleCache.clear();
  else {
    garageVehicleCache.delete(pGarageId);
  }
}

export function GetGarageList() {
  const garageList: any = [];

  garages.forEach((garage: GarageInfo) => {
    garageList.push({
      garage_id: garage.garage_id,
      name: garage.name
    });
  });

  return garageList;
}

global.exports('GetGarageList', GetGarageList)

export async function HasGarageSpace(pGarageId: string, pVehicle: number) {
  const garage = pGarageId ? GetGarageById(pGarageId) : GetGarageById(currentGarage);
  const plate = GetVehicleNumberPlateText(pVehicle);

  if (garage && plate) {
    const vehicleCache = await GetGarageVehicleCache(pGarageId);
    const found = pVehicle ? vehicleCache.find((vehicle: VehicleInfo) => vehicle.plate === plate) : false;

    return found || vehicleCache.length + 1 < garage.parking_limit;
  }
}

export async function HasAccessToGarage(pGarageId: string) {
  const garage = pGarageId ? GetGarageById(pGarageId) : GetGarageById(currentGarage);
  if (!garage) return false;

  let pPromise: any = undefined;

  switch (garage.type) {
    case "housing": {
      pPromise = await new Promise(resolve => {
        setTimeout(() => resolve(false), 5000), emit("vrp:vehicles:hasHouseGarageAccess", garage.garage_id, resolve);
      });
      break;
    }
    case "business": {
      if (garage["publicOverride"]) {
        pPromise = true;
        break;
      }
      pPromise = await new Promise(resolve => {
        setTimeout(() => resolve(false), 5000), emit("vrp:vehicles:hasBusinessGarageAccess", garage.business_id, resolve);
      });
      break;
    }
    case "job": {
      pPromise = await new Promise(resolve => {
        setTimeout(() => resolve(false), 5000), emit("vrp:vehicles:hasJobGarageAccess", garage.garage_id, resolve);
      });
      break;
    }
    case "state": {
      pPromise = await new Promise(resolve => {
        setTimeout(() => resolve(false), 5000), emit("vrp:vehicles:hasStateGarageAccess", garage.garage_id, resolve);
      });
      break;
    }
    case "public": {
      pPromise = true;
    }
  }

  return pPromise;
}

export function GetCurrentParkingSpot(pGarageId: string, pSize: number) {
  const garage = GetGarageById(pGarageId);

  if (garage) {
    for (const parkingSpot of garage.parking_spots) {
      const coords = parkingSpot.coords;
      if (parkingSpot.size >= pSize && !IsAnyVehicleNearPoint(coords.x, coords.y, coords.z, parkingSpot.distance)) {
        return parkingSpot;
      }
    }
  }

  return false as any;
}

global.exports('GetCurrentParkingSpot', GetCurrentParkingSpot)

export function FindParkingSpot(pEntity: number, useRadius = false, pRadius?: number) {
  let foundParkingSpot: any = undefined;
  let foundDistance: any = undefined;

  if (!currentGarage) return [false, foundParkingSpot];

  const garage = GetGarageById(currentGarage);

  if (garage) {
    const [x, y, z] = GetEntityCoords(pEntity, false);

    for (const parkingSpot of garage.parking_spots) {
      const dist = GetDistanceBetweenCoords(parkingSpot.coords.x, parkingSpot.coords.y, parkingSpot.coords.z, x, y, z, true);
      const isNear = !IsAnyVehicleNearPoint(parkingSpot.coords.x, parkingSpot.coords.y, parkingSpot.coords.z, parkingSpot.distance);
      const distance = pRadius ? pRadius : parkingSpot.distance;

      if ((!useRadius || isNear) && dist <= distance && (!foundParkingSpot || foundDistance > dist)) {
        foundParkingSpot = parkingSpot;
        foundDistance = dist;
      }
    }
  }

  if (typeof foundParkingSpot !== "undefined") currentParkingSpot = foundParkingSpot;

  return [foundParkingSpot !== undefined, foundParkingSpot];
}

global.exports('FindParkingSpot', FindParkingSpot)

export function IsOnParkingSpot(pEntity: number, useRadius = false, pRadius?: number) {
  return FindParkingSpot(pEntity, useRadius, pRadius)[0];
}

global.exports('IsOnParkingSpot', IsOnParkingSpot)

export function ResetParkingSpot() {
  currentParkingSpot = null;
}

export async function OpenGarageVehicleList(pNearby: boolean, pRadius: number, useRadius = false, pGarageId?: string) {
  const hasAccess = await HasAccessToGarage(pGarageId ? pGarageId : currentGarage);
  if (!hasAccess) return emit("DoLongHudText", "You don't have access to this parking spot.", 2);

  if (pNearby) {
    const [success, parkingSpot] = FindParkingSpot(PlayerPedId(), useRadius, pRadius);

    if (success) {
      currentParkingSpot = parkingSpot;
    }
  }

  UI.OpenGarageList(pGarageId ? pGarageId : currentGarage, pGarageId ? true : false);
}

export async function StoreVehicleInGarage(pVehicle: number) {
  const hasAccess = await HasAccessToGarage(currentGarage);
  //const hasSpace = await HasGarageSpace(currentGarage, pVehicle);
  if (!hasAccess) return emit("DoLongHudText", "You don't have access to this parking spot.", 2);
  //if (!hasSpace) return emit("DoLongHudText", "You ran out of parking space.", 2);

  const isOnSpot = IsOnParkingSpot(pVehicle);
  if (GetVehicleNumberOfPassengers(pVehicle) > 0 || !IsVehicleSeatFree(pVehicle, -1)) return emit("DoLongHudText", "The vehicle is not empty!", 2);
  if (!isOnSpot) return emit("DoLongHudText", "We cannot park here!", 2);

  const result = await RPC.execute("vrp:vehicles:storeVehicle", NetworkGetNetworkIdFromEntity(pVehicle), currentGarage);

  if (!result) return emit("DoLongHudText", "Cannot park the vehicle here.", 2);

  if (result) {
    ClearGarageVehicleCache(currentGarage);
  }
}

export async function FindCarInGarageByVIN(pVin: string, pGarageId: string) {
  const vehicleCache = await GetGarageVehicleCache(pGarageId);
  return vehicleCache.find((vehicle: VehicleInfo) => vehicle.vin === pVin);
}

export async function GetGarageVehicleCache(pGarageId: string) {
  if (garageVehicleCache.has(pGarageId) && !garageVehicleCache.isExpired(pGarageId)) return garageVehicleCache.get(pGarageId);

  const result = await RPC.execute("vrp:vehicles:getVehicles", pGarageId);

  if (result) {
    garageVehicleCache.set(pGarageId, result, 1000 * 120);
    return garageVehicleCache.get(pGarageId);
  }

  return false;
}

export async function PreviewCar(pVin: string, pGarageId: string, pData?: VehicleInfo, pShouldSpawnAtPlayerCoords?: boolean) {
  const vehicle: VehicleInfo = pData ? pData : await FindCarInGarageByVIN(pVin, pGarageId);

  if (!currentParkingSpot) {
    currentParkingSpot = GetCurrentParkingSpot(pGarageId, 1); //vehicle.size
  }

  if (vehicle) {
    const model = GetHashKey(vehicle.model);
    let { coords, heading } = currentParkingSpot;
    if (pShouldSpawnAtPlayerCoords) {
      const plyCoords = GetEntityCoords(PlayerPedId(), false);
      coords = { x: plyCoords[0], y: plyCoords[1], z: plyCoords[2] };
      heading = GetEntityHeading(PlayerPedId());
    }

    await loadAndRequestModel(model); 

    const whatAmI = vehicle.model;
    if (whatAmI === "polas350") {
      const pVehicle = CreateVehicle(model, coords.x, coords.y, coords.z , heading, false, false);
      if (pVehicle) {
        FreezeEntityPosition(pVehicle, true);
        SetEntityCollision(pVehicle, false, false);
        SetVehicleDoorsLocked(pVehicle, 3);
        SetVehicleNumberPlateText(pVehicle, vehicle.plate);
  
        if (vehicle.mods !== undefined) {
          Mods.SetMods(pVehicle, JSON.parse(vehicle.mods));
        }
  
        if (vehicle.appearance !== undefined) {
          Appearance.SetVehicleAppearance(pVehicle, JSON.parse(vehicle.appearance));
        }
  
        if (vehicle.damage !== undefined) {
          Appearance.RestoreVehicleDamage(pVehicle, JSON.parse(vehicle.damage));
        }
  
        await Delay(100); 
  
        if (DoesEntityExist(previewCar)) DeleteEntity(previewCar);
  
        SetEntityCoords(pVehicle, coords.x, coords.y, coords.z, false, false, false, false);
  
        previewCar = pVehicle;
  
        SetModelAsNoLongerNeeded(model);
      }
    } else {
      const pVehicle = CreateVehicle(model, coords.x, coords.y, coords.z - 50, heading, false, false);
      if (pVehicle) {
        FreezeEntityPosition(pVehicle, true);
        SetEntityCollision(pVehicle, false, false);
        SetVehicleDoorsLocked(pVehicle, 3);
        SetVehicleNumberPlateText(pVehicle, vehicle.plate);
  
        if (vehicle.mods !== undefined) {
          Mods.SetMods(pVehicle, JSON.parse(vehicle.mods));
        }
  
        if (vehicle.appearance !== undefined) {
          Appearance.SetVehicleAppearance(pVehicle, JSON.parse(vehicle.appearance));
        }
  
        if (vehicle.damage !== undefined) {
          Appearance.RestoreVehicleDamage(pVehicle, JSON.parse(vehicle.damage));
        }
  
        await Delay(100); 
  
        if (DoesEntityExist(previewCar)) DeleteEntity(previewCar);
  
        SetEntityCoords(pVehicle, coords.x, coords.y, coords.z, false, false, false, false);
  
        previewCar = pVehicle;
  
        SetModelAsNoLongerNeeded(model);
      }
    }

    
  }
}

export async function SpawnGarageVehicle(pVin: string, pGarageId: string, pRaid: boolean, pShouldSpawnAtPlayerCoords?: boolean) {
  let { coords, heading } = currentParkingSpot;

  if (pShouldSpawnAtPlayerCoords) {
    const plyCoords = GetEntityCoords(PlayerPedId(), false);
    coords = { x: plyCoords[0], y: plyCoords[1], z: plyCoords[2] };
    heading = GetEntityHeading(PlayerPedId());
  }

  const result = await RPC.execute("vrp:vehicles:spawnGarageVehicle", pVin, pGarageId, { ...coords, h: heading });

  if (result) {
    ClearGarageVehicleCache(pGarageId);
  } else {
    emit("DoLongHudText", "Vehicle unavailable, Try again later.", 2);
  }

  currentParkingSpot = null;

  DeleteEntity(previewCar);

  return result;
}

export async function getPlayerVehiclesByCharacterId(pCharacterId: number) {
  const result = await RPC.execute("vrp:vehicles:getPlayerVehiclesByCharacterId", pCharacterId);
  return result;
}

global.exports('getPlayerVehiclesByCharacterId', getPlayerVehiclesByCharacterId)

on("vrp-polyzone:enter", async (pZone: string) => {
  if (!garages.has(pZone)) return;

  global.exports['vrp-ui'].showInteraction("Parking");

  currentGarage = pZone;
});

on("vrp-polyzone:exit", (pZone: string) => {
  if (currentGarage !== pZone) return;

  global.exports['vrp-ui'].hideInteraction();

  currentGarage = null;
});
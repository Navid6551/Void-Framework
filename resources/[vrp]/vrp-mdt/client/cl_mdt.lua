local jobs = {
  ["police"] = true,
  ["doctor"] = true,
  ["doc"] = true,
  ["district attorney"] = true,
  ["judge"] = true,
  ["defender"] = true,
  ["mayor"] = true,
  ["county_clerk"] = true
}
function hasMdwAccess()
  local cj = 'doctor'--exports["police"]:getCurrentJob()
  return jobs[cj] == true
end

local apartmentData = CacheableMap(function (ctx, cid)
  local result = RPC.execute("apartment:search", cid)
  return true, result
end, { timeToLive = 5 * 60 * 1000 })

local housingData = CacheableMap(function (ctx, cid)
  local result = RPC.execute("housing:search", cid)
  return true, result
end, { timeToLive = 5 * 60 * 1000 })

function LoadAnimationDic(dict)
  if not HasAnimDictLoaded(dict) then
      RequestAnimDict(dict)

      while not HasAnimDictLoaded(dict) do
          Citizen.Wait(0)
      end
  end
end

local function playAnimation()
  LoadAnimationDic("amb@code_human_in_bus_passenger_idles@female@tablet@base")
  TaskPlayAnim(PlayerPedId(), "amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 3.0, 3.0, -1, 49, 0, 0, 0, 0)
  TriggerEvent("attachItemPhone", "tablet01")
end

RegisterUICallback("vrp-ui:mdtAction", function(data, cb)
  print('vrp-ui:mdtAction', json.encode(data))
  local result = RPC.execute("vrp-ui:mdtApiRequest", data)
  cb({ data = result.message, meta = { ok = result.success, message = result.message } })
end)

RegisterUICallback("vrp-mdt:getVehiclesByCharacterId", function(data, cb)
  local data = RPC.execute("vrp:vehicles:getPlayerVehicles", data.character.id, true)
  cb({ data = data, meta = { ok = true, message = 'done' } })
end)

AddEventHandler("vrp-ui:openMDW", function(data)
  if not hasMdwAccess() and not data.fromCmd and not data.publicApp then return end
  local _, isAnimalModel = pcall(function () return exports["vrp-misc-code"]:isAnimalModel(GetEntityModel(PlayerPedId())) end)
  if not isAnimalModel then
    playAnimation()
  end
  exports["vrp-ui"]:openApplication("mdt", { publicApp = data.publicApp or false })
end)

AddEventHandler("vrp-ui:application-closed", function(name)
  if name ~= "mdt" then return end
  local _, isAnimalModel = pcall(function () return exports["vrp-misc-code"]:isAnimalModel(GetEntityModel(PlayerPedId())) end)
  if not isAnimalModel then
    StopAnimTask(PlayerPedId(), "amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 1.0)
    TriggerEvent("destroyPropPhone")
  end
  SetPlayerControl(PlayerId(), 1, 0)
end)

RegisterUICallback("vrp-ui:getHousingInformation", function(data, cb)
  local result = housingData.get(data.profile.id)
  cb({ data = result or {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:getApartmentInformation", function (data, cb)
  local result = apartmentData.get(data.profile.id)
  cb({ data = result or {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-mdt:getUnitInformation", function (data, cb)
  local result = RPC.execute("vrp-dispatch:getDispatchUnits")
  cb({ data = result, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:getHousingData", function (data, cb)
  local houses = exports["vrp-housing"]:retrieveHousingTableMapped()
  cb({ data = houses, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:getPropertyOwner", function (data, cb)
  local owner = RPC.execute("property:getOwnerRaw", data.property_id)
  cb({ data = owner, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-mdt:setPropertyGps", function (data, cb)
  SetNewWaypoint(data.x, data.y)
  TriggerEvent("DoLongHudText", "GPS updated.")
  cb({ data = "ok", meta = { ok = true, message = 'done' } })
end)

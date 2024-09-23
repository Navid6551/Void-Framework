-- PDM: -44.18402, -1097.083, -40
-- Tuner: 935.63, -968.52, -40.42
-- Fastlane: -795.02, -226.4, -40
-- PDM at Ottos: 810.34, -814.29, -59.16, 227.65

local inPolyZone = nil
local showroomOpen = false
local sr
local staticCam
local staticLargeCam
local showLargeCam = false
local isLargeCamActive = false
local camTimer = 0
local vehicle

function CreateShowroomVehicle(showroom, vehicleName)
  if vehicle then
    DeleteEntity(vehicle)
  end
  RequestModel(vehicleName)

  while not HasModelLoaded(vehicleName) do
    Citizen.Wait(0)
  end
  SetModelAsNoLongerNeeded(vehicleName)

  local vehicle = 0
  if showroom == 'pdm' then
    CalculateCamPos(vehicleName, 15.5)
    vehicle = CreateVehicle(vehicleName, 810.45, -815.62, -59.16, 136.71, false, false)
    -- return CreateVehicle(vehicleName, -43.9, -1097.14, -42.45, 141.23, false, false)
  elseif showroom == 'tuner' then
    CalculateCamPos(vehicleName, 18)
    vehicle = CreateVehicle(vehicleName, 935.63, -968.52, -43.99, 181.74, false, false)
  elseif showroom == 'fastlane' then
    CalculateCamPos(vehicleName, 15.5)
    vehicle = CreateVehicle(vehicleName, -794.1, -226.18, -43.38, 78.68, false, false)
  end

  local preset = CarPresets[vehicleName]
  if preset then
    exports["vrp-vehicles"]:SetVehicleMods(vehicle, preset.mods and preset.mods or {})
    exports["vrp-vehicles"]:SetVehicleAppearance(vehicle, preset.appearance and preset.appearance or {})

    if preset.fitment and preset.fitment.w_width then
      DecorSetBool(vehicle, "vrp-wheelfitment_applied", true)
      DecorSetFloat(vehicle, "vrp-wheelfitment_w_width", preset.fitment.w_width)
      DecorSetFloat(vehicle, "vrp-wheelfitment_w_fl", preset.fitment.w_fl)
      DecorSetFloat(vehicle, "vrp-wheelfitment_w_fr", preset.fitment.w_fr)
      DecorSetFloat(vehicle, "vrp-wheelfitment_w_rl", preset.fitment.w_rl)
      DecorSetFloat(vehicle, "vrp-wheelfitment_w_rr", preset.fitment.w_rr)
    end
  end
  return vehicle
end

function RenderStaticCam(showroom)
  if not showroomOpen then
    return
  end
  staticCam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
  if (showroom == 'pdm') then -- if (showroom == 'fastlane') then
    SetCamCoord(staticCam, 810.21, -822.71, -59.0)
    SetCamRot(staticCam, 0, 0.0, 3.3)
    SetFocusPosAndVel(810.21, -822.71, -58.22, 0.0, 0.0, 0.0)
  elseif showroom == 'pdm' then
    SetCamCoord(staticCam, -43.66, -1103.23, -41.08)
    SetCamRot(staticCam, -15.0, 0.0, 19.67)
    SetFocusPosAndVel(-43.66, -1103.23, -41.08, 0.0, 0.0, 0.0)
  elseif showroom == 'tuner' then
    SetCamCoord(staticCam, 938.49, -972.12, -43.0)
    SetCamRot(staticCam, -15.0, 0.0, 47.45)
    SetFocusPosAndVel(938.49, -972.12, -41.3, 0.0, 0.0, 0.0)
  end
  SetCamFov(staticCam, 50.0)
  RenderScriptCams(true, false, 0, 1, 0)
end

function CalculateCamPos(model, largeCamSize)
  local minDim, maxDim = GetModelDimensions(model)
  local modelSize = maxDim - minDim
  local modelVolume = modelSize.x * modelSize.y * modelSize.z
  showLargeCam = modelVolume > largeCamSize
  camTimer = 1000
end

function openShowroom(showroom)
  if (showroom == nil) then
    return TriggerEvent("DoLongHudText", "Out of Service", 2)
  end

  showroomOpen = true
  sr = showroom
  exports["vrp-ui"]:openApplication("showroom", { shop = sr })
  Wait(250)
  exports["vrp-ui"]:hideInteraction()
  Citizen.CreateThread(function()
    Wait(1000)
    exports["vrp-ui"]:sendAppEvent("hud", { display = false })
    if sr == "pdm" then
      TriggerEvent("inhotel", true)
    end
    RenderStaticCam(sr)
  end)

  --Large Cam Timer
  Citizen.CreateThread(function()
    while showroomOpen do
      if camTimer > 0 then
        camTimer = camTimer - 500
      elseif showLargeCam then
        if not isLargeCamActive then
          staticLargeCam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
          SetCamCoord(staticLargeCam, GetCamCoord(staticCam))
          SetCamRot(staticLargeCam, GetCamRot(staticCam, 2))
          SetCamFov(staticLargeCam, 70.0)
          SetCamActiveWithInterp(staticLargeCam, staticCam, 1000, 100, 0)
          isLargeCamActive = true
        end
      elseif isLargeCamActive then
        SetCamActiveWithInterp(staticCam, staticLargeCam, 1000, 100, 0)
        isLargeCamActive = false
      end
      Wait(500)
    end
  end)
end

AddEventHandler("vrp-ui:application-closed", function (name)
  if name ~= "showroom" then return end

  Citizen.CreateThread(function()
    showroomOpen = false
    if sr == "pdm" then
      TriggerEvent("inhotel", false)
    end
    
    DoScreenFadeOut(0)
    Wait(400)
    exports["vrp-ui"]:sendAppEvent("hud", { display = true })
    DoScreenFadeIn(1000)
  
    ClearFocus()
    RenderScriptCams(false, false, 0, 1, 0)
    DeleteEntity(vehicle)
  end)
end)

local function getField(field)
  return GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)
end

StatsCache = {}
local function calculateStats()
  local info = {}

  local model = GetEntityModel(vehicle)
  if StatsCache[model] then return StatsCache[model].info, StatsCache[model].vehClass end

  local isMotorCycle = IsThisModelABike(model)

  local fInitialDriveMaxFlatVel = getField("fInitialDriveMaxFlatVel")
  local fInitialDriveForce = getField("fInitialDriveForce")
  local fDriveBiasFront = getField("fDriveBiasFront")
  local fInitialDragCoeff = getField("fInitialDragCoeff")
  local fTractionCurveMax = getField("fTractionCurveMax")
  local fTractionCurveMin = getField("fTractionCurveMin")
  local fSuspensionReboundDamp = getField("fSuspensionReboundDamp")
  local fBrakeForce = getField("fBrakeForce")
  
  -- Acceleration: (fInitialDriveMaxFlatVel x fInitialDriveForce)/10
  -- If the fDriveBiasFront is greater than 0 but less than 1, multiply fInitialDriveForce by 1.1.
  local force = fInitialDriveForce
  if fInitialDriveForce > 0 and fInitialDriveForce < 1 then
    force = force * 1.1
  end
  local accel = (fInitialDriveMaxFlatVel * force) / 10
  info[#info + 1] = { name = "Acceleration", value = accel }

  -- Speed:
  -- ((fInitialDriveMaxFlatVel / fInitialDragCoeff) x (fTractionCurveMax + fTractionCurveMin))/40
  local speed = ((fInitialDriveMaxFlatVel / fInitialDragCoeff) * (fTractionCurveMax + fTractionCurveMin)) / 40
  if isMotorCycle then
    speed = speed * 2
  end
  info[#info + 1] = { name = "Speed", value = speed }

  -- Handling:
  -- (fTractionCurveMax + fSuspensionReboundDamp) x fTractionCurveMin
  local handling = (fTractionCurveMax + fSuspensionReboundDamp) * fTractionCurveMin
  if isMotorCycle then
    handling = handling / 2
  end
  info[#info + 1] = { name = "Handling", value = handling }

  -- Braking:
  -- ((fTractionCurveMin / fInitialDragCoeff) x fBrakeForce) x 7
  local braking = ((fTractionCurveMin / fInitialDragCoeff) * fBrakeForce) * 7
  info[#info + 1] = { name = "Braking", value = braking }

  local vehClass = exports["vrp-vehicles"]:GetVehicleRatingClass(vehicle) or "F"
  StatsCache[model] = { info = info, vehClass = vehClass }
  return info, vehClass
end

RegisterUICallback("vrp-ui:showroomChangeCar", function(data, cb)
  vehicle = CreateShowroomVehicle(sr, data.model)
  SetVehicleDirtLevel(vehicle, 0.0)
  local info, vehClass = calculateStats()
  cb({ data = { info = info, vehClass = vehClass }, meta = { ok = true, message = 'done' } })
end)

AddEventHandler("vrp-showrooms:enterExperience", function()
  openShowroom(inPolyZone)
end)
Citizen.CreateThread(function()
  exports["vrp-interact"]:AddPeekEntryByModel({ 1723506536 }, {{
    id = "showroom_enter_experience",
    event = "vrp-showrooms:enterExperience",
    icon = "car",
    label = "View Catalog",
    parameters = {},
  }}, { distance = { radius = 1.5 }, isEnabled = function ()
    return inPolyZone ~= nil
  end })
  exports["vrp-interact"]:AddPeekEntryByPolyTarget('showroom_tablet', {{
    id = "showroom_target_experience",
    event = "vrp-showrooms:enterExperience",
    icon = "car",
    label = "View Catalog",
    paramers = {},
  }}, { distance = { radius = 3.5 }  })
end)

experience = {
  onEnter = function(location)
    inPolyZone = location
  end,
  onLeave = function()
    inPolyZone = nil
  end,
}


-- local isInsideZone = false
-- function listenForKeypress()
--   isInsideZone = true
--   Citizen.CreateThread(function()
--     while isInsideZone and not showroomOpen do
--       Wait(0)
--       if IsControlJustReleased(0, 46) and not showroomOpen then
--         openShowroom(inPolyZone)
--       end
--     end
--   end)
-- end
-- AddEventHandler("vrp-polyzone:enter", function(name)
--   if name ~= "showroom_tablet" then return end
--   exports["vrp-ui"]:showInteraction("[E] View Catalog")
--   listenForKeypress(inPolyZone)
-- end)
-- AddEventHandler("vrp-polyzone:exit", function(name)
--   if name ~= "showroom_tablet" then return end
--   isInsideZone = false
--   exports["vrp-ui"]:hideInteraction()
-- end)

-- local targetActive = false
-- AddEventHandler("np:target:changed", function(pEntity, pEntityType)
--   if not pEntity or pEntityType ~= 3 then
--     if targetActive then
--       targetActive = false
--       isInsideZone = false
--       exports["vrp-ui"]:hideInteraction()
--     end
--     return
--   end
--   if GetEntityModel(pEntity) == 1723506536 and not targetActive then
--     targetActive = true
--     exports["vrp-ui"]:showInteraction("[E] View Catalog")
--     listenForKeypress(inPolyZone)
--   elseif GetEntityModel(pEntity) ~= 1723506536 and targetActive then
--     targetActive = false
--     isInsideZone = false
--     exports["vrp-ui"]:hideInteraction()
--   end
-- end)

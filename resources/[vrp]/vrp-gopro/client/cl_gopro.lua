local activeDashcams = {}
local currentVehicleNetId = 0
local clonedPedNetId = 0
local currentCoords = nil
local currentDashcam = nil
local goProActivated = false
local staticCam = nil
local goProCameraItems = {
  ["dashcamracing"] = { name = "dashcamracing", type = "racing" },
  ["dashcampd"] = { name = "dashcampd", type = "pd" },
}

RegisterUICallback("vrp-ui:goProRegisterCar", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  exports['vrp-ui']:closeApplication('textbox')
  local name = data.values.name or ""
  if string.len(name) < 3 then
    TriggerEvent("DoLongHudText", "Name too short.", 2)
    return
  end
  RPC.execute("vrp-gopro:registerCarForFootage", currentVehicleNetId, name, currentDashcam)
  TriggerEvent("inventory:removeItem", currentDashcam.name, 1)
  TriggerEvent("vrp-menu:dashCamAttached", currentVehicleNetId, true)
  currentVehicleNetId = 0
  currentDashcam = nil
end)

AddEventHandler("vrp-gopro:removeDashCam", function()
  local veh = GetVehiclePedIsIn(PlayerPedId())
  local netId = NetworkGetNetworkIdFromEntity(veh)
  local foundDashCam
  for _, v in pairs(activeDashcams) do
    if v.netId == netId then
      foundDashCam = v
    end
  end
  if not foundDashCam then
    TriggerEvent("DoLongHudText", "Dashcam not found.", 2)
    return
  end
  RPC.execute("vrp-gopro:removeCarForFootage", netId)
  TriggerEvent("vrp-menu:dashCamAttached", netId, false)
  TriggerEvent("player:receiveItem", "dashcam" .. foundDashCam.type, 1)
end)

AddEventHandler("vrp-inventory:itemUsed", function(item)
  if not goProCameraItems[item] then return end
  local veh = GetVehiclePedIsIn(PlayerPedId())
  if not veh or veh == 0 then return end
  currentVehicleNetId = NetworkGetNetworkIdFromEntity(veh)
  currentDashcam = goProCameraItems[item]
  exports['vrp-ui']:openApplication('textbox', {
    callbackUrl = 'vrp-ui:goProRegisterCar',
    key = 1,
    items = {
      {
        icon = "pencil-alt",
        label = "Dashcam Stream Name",
        name = "name",
      },
    },
    show = true,
  })
end)

local myPreChairCoords = nil
local myDuringChairCoords = nil
AddEventHandler("vrp-gopro:activateVRChair", function(pArgs, pEntity, pContext)
  -- pContext.model, pContext.flags (isGoProVRChair)
  DoScreenFadeOut(1000)
  Wait(800)
  exports["vrp-ui"]:sendAppEvent("hud", { display = false })
  local selectedType = (pArgs and pArgs.type) and pArgs.type or "racing"
  exports["vrp-ui"]:openApplication("gopros", { selectedType = selectedType, switchingViews = true })
  Wait(200)
  TriggerEvent("vrp-casino:inVRHeadset", true)
  local entCoords = GetEntityCoords(pEntity)
  local heading = GetEntityHeading(pEntity)

  local offsetCoords = GetOffsetFromEntityInWorldCoords(pEntity, 0.0, 0.0, 0.5)

  local clonedPed = ClonePed(PlayerPedId(), heading, 1, 1)
  clonedPedNetId = NetworkGetNetworkIdFromEntity(clonedPed)
  while clonedPed == 0 or clonedPedNetId == 0 do
    Wait(0)
  end
  SetEntityInvincible(clonedPed, true)
  SetEntityCollision(clonedPed, false, false)
  TaskSetBlockingOfNonTemporaryEvents(clonedPed, true)
  ClearPedTasksImmediately(clonedPed)
  TaskStartScenarioAtPosition(
    clonedPed,
    "PROP_HUMAN_SEAT_ARMCHAIR",
    offsetCoords,
    GetEntityHeading(pEntity) - 180.0,
    0,
    true,
    true
  )

  myPreChairCoords = GetEntityCoords(PlayerPedId())
  FreezeEntityPosition(PlayerPedId(), true)
  SetEntityCollision(PlayerPedId(), false, false)
  myDuringChairCoords = vector3(myPreChairCoords.x, myPreChairCoords.y, myPreChairCoords.z - 20.0)
  SetEntityCoords(PlayerPedId(), myDuringChairCoords)
  DoScreenFadeIn(0)
end)

RegisterNetEvent("vrp-gopros:updateRegisteredCams")
AddEventHandler("vrp-gopros:updateRegisteredCams", function(pDashcams)
  activeDashcams = pDashcams
  exports["vrp-ui"]:sendAppEvent("gopros", { dashcams = activeDashcams })
end)
AddEventHandler("playerSpawned", function()
  Wait(5550)
  RPC.execute("vrp-gopros:playerSpawnedSendCams")
end)

RegisterUICallback("vrp-ui:goproChangeSelectedPov", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' }})
  local activateGoPro = activateGoPro(tonumber(data.netId))
  Wait(600)
  exports["vrp-ui"]:sendAppEvent("gopros", { switchingViews = false })
end)

AddEventHandler("vrp-ui:application-closed", function(name)
  if name ~= "gopros" then return end
  DoScreenFadeOut(400)
  Wait(400)
  TriggerEvent("vrp-casino:inVRHeadset", false)
  deactivateGoPro()
  SetEntityCoords(PlayerPedId(), myDuringChairCoords)
  local clonedPed = 0
  while clonedPed == 0 do
    clonedPed = NetworkGetEntityFromNetworkId(clonedPedNetId)
    Wait(100)
  end
  Sync.DeleteEntity(clonedPed)
  FreezeEntityPosition(PlayerPedId(), false)
  SetEntityCollision(PlayerPedId(), true, true)
  SetEntityCoords(PlayerPedId(), myPreChairCoords)
  exports["vrp-ui"]:sendAppEvent("hud", { display = true })
  DoScreenFadeIn(1000)
end)

function prepareCameraSelf(activating, coords)
  local me = PlayerPedId()
  DetachEntity(me, 1, 1)
  SetEntityCollision(me, not activating, not activating)
  SetEntityInvincible(me, activating)
  -- SetEntityAlpha(me, activating and 0 or 255, 0)
  if activating then
    NetworkFadeOutEntity(me, activating, false)
  else
    NetworkFadeInEntity(me, 0, false)
  end
  SetEntityCoords(me, coords)
end

function activateGoPro(netId)
  local alreadyActive = goProActivated
  goProActivated = true
  local coords = RPC.execute("vrp-gopro:getRegisteredDashcamData", netId)
  coords = vector3(coords.x, coords.y, coords.z - 10.0)
  if not alreadyActive then
    staticCam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
    currentCoords = GetEntityCoords(PlayerPedId())
  end
  Wait(0)
  prepareCameraSelf(true, coords)
  local veh = 0
  local vehLoopCount = 0
  while veh == 0 and vehLoopCount < 10 do
    veh = NetworkGetEntityFromNetworkId(netId)
    vehLoopCount = vehLoopCount + 1
    if veh == 0 then Wait(250) end
  end
  if veh == 0 then
    prepareCameraSelf(false, currentCoords)
    TriggerEvent("DoLongHudText", "Vehicle not found", 2)
    return false
  end
  AttachEntityToEntity(PlayerPedId(), veh, 0, 0.0, 0.0, -40.0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0)
  local vehModel = GetEntityModel(veh)
  local camX, camY, camZ = 0.35, -0.5, 0.6
  if RHD_VEHICLES[vehModel] then
    camX = -0.35
  end
  SetCamFov(staticCam, 90.0)
  DetachCam(staticCam)
  Wait(0)
  AttachCamToVehicleBone(
    staticCam,
    veh,
    GetEntityBoneIndexByName(veh, "seat_dside_f"),
    1, 0.0, 0.0, 0.0, camX, camY, camZ, 1)
  if not alreadyActive then
    RenderScriptCams(true, false, 0, 1, 0)
  end
  return true
end

function deactivateGoPro()
  if not goProActivated then return end
  goProActivated = false
  prepareCameraSelf(false, currentCoords)
  RenderScriptCams(false, false, 0, 1, 0)
end

-- RegisterCommand("activategopro", function(src, args)
--   local netId = tonumber(args[1])
--   print(netId, src, json.encode(args))
--   activateGoPro(netId)
-- end, false)
-- RegisterCommand("deactivategopro", function()
--   deactivateGoPro()
-- end)

local currentSecCamCoords = nil
local currentSecCamHeading = nil
local listening = false
local destinationSelected = false
local function listenForKeypress()
  listening = true
  Citizen.CreateThread(function()
      while listening do
          if IsControlJustReleased(0, 38) then
              listening = false
              if destinationSelected then
                exports["vrp-selector"]:deselect()
                exports["vrp-ui"]:hideInteraction()
                currentSecCamHeading = GetEntityHeading(PlayerPedId()) + GetGameplayCamRelativeHeading()
                exports['vrp-ui']:openApplication('textbox', {
                  callbackUrl = 'vrp-ui:goProRegisterSecCam',
                  key = 1,
                  items = {
                    {
                      icon = "pencil-alt",
                      label = "Security Camera Stream Name",
                      name = "name",
                    },
                  },
                  show = true,
                })
              else
                local camPos = exports["vrp-selector"]:getCurrentSelection()
                currentSecCamCoords = vector3(camPos["selectedCoords"][1], camPos["selectedCoords"][2], camPos["selectedCoords"][3])
                local distance = #(GetEntityCoords(PlayerPedId()) - currentSecCamCoords)
                exports["vrp-selector"]:deselect()
                if distance > 4 then
                  TriggerEvent("DoLongHudText", "Not close enough", 2)
                  exports["vrp-ui"]:hideInteraction()
                  return
                end
                Wait(100)
                exports["vrp-ui"]:showInteraction(("[E] %s"):format("View Here"))
                destinationSelected = true
                listenForKeypress()
                exports["vrp-selector"]:startSelecting(1, 1, function()
                  return false
                end)
              end
          end
          Wait(0)
      end
  end)
end

local lastItemUsed = nil
local staticCamItems = {
  ["dashcamstatic"] = true,
  ["dashcamstaticpd"] = true,
}
AddEventHandler("vrp-inventory:itemUsed", function(item)
  if not staticCamItems[item] then return end
  lastItemUsed = item
  currentSecCamCoords = nil
  destinationSelected = false
  TriggerEvent('DoLongHudText', "[E] Place, [MouseWheel] Rotate")
  local result = exports["vrp-objects"]:PlaceObject(
    `prop_spycam`,
    {
      collision = false,
      groundSnap = false,
      forceGroundSnap = false,
      useModelOffset = false,
      zOffset = -0.05,
      distance = 4.5,
    },
    function(pCoords, pMaterial, pEntity)
      local forward = GetOffsetFromEntityInWorldCoords(pEntity, 0.0, -0.5, 0.0)
      DrawLine(pCoords.x, pCoords.y, pCoords.z, forward.x, forward.y, forward.z, 0, 255, 0, 255)
      return true
    end
  )

  if not result[1] then
    return
  end

  local prompt = exports["vrp-ui"]:OpenInputMenu({
    {
      name = 'name',
      label = 'Security Camera Stream Name',
      icon = 'pencil-alt'
    }
  }, function(values)
    return values.name and values.name:len() > 2
  end)

  if not prompt then
    return
  end
  local success = RPC.execute("vrp-gopros:addSecCamera", prompt.name, result[2].coords, result[2].rotation)
  if success then
    TriggerEvent("inventory:removeItem", lastItemUsed, 1)
  end
end)

local securityCamera = nil
local secCamX = 0.0
local secCamZ = 0.0
local secCamY = 0.0
local function activateSecurityCameraById(pId)
  local cam = RPC.execute("vrp-gopros:getSecurityCameraById", pId)
  if not cam then return end
  DoScreenFadeOut(400)
  Wait(400)
  FreezeEntityPosition(PlayerPedId(), true)
  securityCamera = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
  SetCamFov(securityCamera, 60.0)
  SetCamCoord(securityCamera, cam.coords.x, cam.coords.y, cam.coords.z + 0.2)
  secCamZ = cam.heading
  secCamY = secCamZ
  SetCamRot(securityCamera, secCamX, 0.0, secCamZ, 2)
  SetFocusPosAndVel(cam.coords, 0.0, 0.0, 0.0)
  RenderScriptCams(true, false, 0, 1, 0)
  if cam.blurred then
    SetTimecycleModifier("CAMERA_secuirity_FUZZ")
    SetTimecycleModifierStrength(1.5)
  else
    SetTimecycleModifier("heliGunCam")
    SetTimecycleModifierStrength(1.0)
  end
  exports["vrp-ui"]:sendAppEvent("hud", { display = false })
  DoScreenFadeIn(1000)
end

local function deactivateSecurityCamera()
  if not securityCamera then return end
  DestroyCam(securityCamera, true)
  securityCamera = nil
  ClearFocus()
  RenderScriptCams(false, false, 0, 1, 0)
  exports["vrp-ui"]:sendAppEvent("hud", { display = true })
  ClearTimecycleModifier()
  ClearExtraTimecycleModifier()
  FreezeEntityPosition(PlayerPedId(), false)
end

RegisterUICallback("vrp-ui:gopros:getSecurityCameras", function(data, cb)
  local cid = exports["isPed"]:isPed("cid")
  local cams = RPC.execute("vrp-gopros:getSecurityCameraByCid", cid)
  cb({ data = cams, meta = { ok = true, message = "done" } })
end)

RegisterUICallback("vrp-ui:gopros:viewCameraById", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  Wait(500)
  exports["vrp-ui"]:closeApplication("phone")
  activateSecurityCameraById(data.id)
end)

local securityCamChanging = false
local function securityCameraLookEnd()
  securityCamChanging = false
end
local function securityCameraLook(dir)
  if securityCamera == nil then return end
  securityCamChanging = true
  Citizen.CreateThread(function()
    while securityCamChanging do
      if dir == "up" then
        secCamX = secCamX + 0.1
        if secCamX > 30 then
          secCamX = 30.0
        end
      end
      if dir == "down" then
        secCamX = secCamX - 0.1
        if secCamX < -30 then
          secCamX = -30.0
        end
      end
      if dir == "left" then
        if math.abs(secCamY - secCamZ) <= 30 then
          secCamY = secCamY + 0.1
          if math.abs(secCamY - secCamZ) > 30 then
            secCamY = secCamY - 0.5
            securityCameraLookEnd()
          end
        end
      end
      if dir == "right" then
        if math.abs(secCamY - secCamZ) <= 30 then
          secCamY = secCamY - 0.1
          if math.abs(secCamY - secCamZ) > 30 then
            secCamY = secCamY + 0.5
            securityCameraLookEnd()
          end
        end
      end
      SetCamRot(securityCamera, secCamX, 0.0, secCamY, 2)
      Wait(0)
    end
  end)
end

Citizen.CreateThread(function()
  exports["vrp-keybinds"]:registerKeyMapping("", "Camera", "Look Up", "+securityCamLookUp", "-securityCamLookUp", "PAGEUP")
  exports["vrp-keybinds"]:registerKeyMapping("", "Camera", "Look Down", "+securityCamLookDown", "-securityCamLookDown", "PAGEDOWN")
  exports["vrp-keybinds"]:registerKeyMapping("", "Camera", "Look Left", "+securityCamLookLeft", "-securityCamLookLeft", "HOME")
  exports["vrp-keybinds"]:registerKeyMapping("", "Camera", "Look Right", "+securityCamLookRight", "-securityCamLookRight", "END")
  exports["vrp-keybinds"]:registerKeyMapping("", "Camera", "Turn Off", "+securityCamOff", "-securityCamOff", "ESCAPE")
  RegisterCommand('+securityCamLookUp', function() securityCameraLook("up") end, false)
	RegisterCommand('-securityCamLookUp', function() securityCameraLookEnd() end, false)
  RegisterCommand('+securityCamLookDown', function() securityCameraLook("down") end, false)
	RegisterCommand('-securityCamLookDown', function() securityCameraLookEnd() end, false)
  RegisterCommand('+securityCamLookLeft', function() securityCameraLook("left") end, false)
	RegisterCommand('-securityCamLookLeft', function() securityCameraLookEnd() end, false)
  RegisterCommand('+securityCamLookRight', function() securityCameraLook("right") end, false)
	RegisterCommand('-securityCamLookRight', function() securityCameraLookEnd() end, false)
  RegisterCommand('+securityCamOff', function() deactivateSecurityCamera() end, false)
	RegisterCommand('-securityCamOff', function() end, false)

  exports["vrp-interact"]:AddPeekEntryByModel({ `prop_spycam` }, {
    {
      id = "cam_blur_action",
      event = "vrp-gopro:blurCamera",
      icon = "fingerprint",
      label = "Smudge",
    },
  }, { distance = { radius = 5.0 }, isEnabled = function(pEntity, pContext)
    return pContext.meta and pContext.meta.data and pContext.meta.data.metadata.id and not pContext.meta.data.metadata.blurred
  end })
end)

AddEventHandler('vrp-gopro:blurCamera', function(pArgs, pEntity, pContext)
  local object = exports["vrp-objects"]:GetObjectByEntity(pEntity)
  if not object then
    return
  end

  local function loopSkill(count)
    local loopCount = 0
    while loopCount < count do
        Wait(100)
        loopCount = loopCount + 1
        local finished = exports["vrp-ui"]:taskBarSkill(math.random(1400, 2000), math.random(7, 12))
        if finished ~= 100 then
            return false
        end
    end
    return true
  end

  local success = loopSkill(math.random(3, 5))
  if not success then
    return
  end

  exports["vrp-objects"]:UpdateObject(object.id, { blurred = true })
end)

AddEventHandler('vrp-objects:objectCreated', function(pObject, pEntity)
  if pObject.data.model == `prop_spycam` then
    SetEntityCollision(pEntity, false, false)
  end
end)

RegisterUICallback("vrp-ui:gopros:addUserToCamera", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  RPC.execute("vrp-gopros:addUserToCamera", data.camera, data.cid)
end)

-- RegisterCommand("activatecam", function()
--   activateSecurityCameraById(1)
-- end)
-- RegisterCommand("deactivatecam", function()
--   deactivateSecurityCamera()
-- end)

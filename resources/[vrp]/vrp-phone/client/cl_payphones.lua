local insidePrison = false

local payphoneModels = {
  `p_phonebox_02_s`,
  `prop_phonebox_03`,
  `prop_phonebox_02`,
  `prop_phonebox_04`,
  `prop_phonebox_01c`,
  `prop_phonebox_01a`,
  `prop_phonebox_01b`,
  `p_phonebox_01b_s`,
}

local RingingPayphones = {}

Citizen.CreateThread(function()
  exports["vrp-interact"]:AddPeekEntryByModel(payphoneModels, {{
    event = "vrp-phone:startPayPhoneCall",
    id = "vrp-phone:startPayPhoneCall",
    icon = "phone-volume",
    label = "Make Call",
    parameters = {},
  },
  {
    event = "vrp-phone:showTaxiList",
    id = "vrp-phone:showTaxiList",
    icon = "clipboard-list",
    label = "View Taxis",
    parameters = {},
  }}, {
    distance = { radius = 1.5 },
    isEnabled = function()
      if insidePrison then
        return false
      end
      return true
    end
   })

  exports["vrp-interact"]:AddPeekEntryByModel(payphoneModels, {{
    event = "vrp-phone:attachCallDevice",
    id = "vrp-phone:attachCallDevice",
    icon = "voicemail",
    label = "attach device",
    parameters = {},
  }}, {
    distance = { radius = 2.0 },
    isEnabled = function()
      local hasItem = exports["vrp-inventory"]:hasEnoughOfItem("payphonedevice", 1, false)
      return hasItem
    end
  })

  exports["vrp-interact"]:AddPeekEntryByModel(payphoneModels, {{
    event = "vrp-phone:answerPayphone",
    id = "vrp-phone:answerPayphone",
    icon = "phone",
    label = "answer",
    parameters = {},
  }}, {
    distance = { radius = 2.0 },
    isEnabled = function(pEntity, pContext)
      return RingingPayphones[pEntity]
    end
  })
end)

local entityPayPhoneCoords = nil
AddEventHandler("vrp-phone:startPayPhoneCall", function(pArgs, pEntity)
  entityPayPhoneCoords = GetEntityCoords(pEntity)
  exports['vrp-ui']:openApplication('textbox', {
    callbackUrl = 'vrp-phone:startPayPhoneCallAction',
    key = 1,
    items = {
      {
        icon = "phone-volume",
        label = "Phone Number",
        name = "number",
      },
    },
    show = true,
  })
end)

AddEventHandler("vrp-phone:showTaxiList", function(pArgs, pEntity)
  local success, drivers = RPC.execute("vrp-ui:abdultaxi:fetchDrivers")

  local context = {}

  for src, taxi in pairs(drivers) do
    context[#context+1] = {
      icon = "car-side",
      title = taxi.name .. ' ' .. taxi.phoneNumber,
      description = taxi.status,
      key = { phone = taxi.phoneNumber },
      action = "vrp-phone:startPayPhoneCallAction",
      disabled = taxi.status == 'Busy'
    }
  end

  if #context == 0 then
    context[#context+1] = {
      icon = "clipboard-list",
      title = "No taxis available",
    }
  end

  exports['vrp-ui']:showContextMenu(context)
end)

AddEventHandler("vrp-polyzone:enter", function(zone, data)
    if zone == "prison" then insidePrison = true end
end)

AddEventHandler("vrp-polyzone:exit", function(zone)
    if zone == "prison" then insidePrison = false end
end)

RegisterUICallback("vrp-phone:startPayPhoneCallAction", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
  exports['vrp-ui']:closeApplication('textbox')
  local number = data.values and data.values.number or data.key.phone
  RPC.execute("phone:callStart", number, 'PAYPHONE', "Unknown Number")
  Citizen.CreateThread(function()
    while entityPayPhoneCoords do
      if #(GetEntityCoords(PlayerPedId()) - entityPayPhoneCoords) > 2.0 then
        entityPayPhoneCoords = nil
        TriggerEvent("vrp:fiber:voice-event", 'callEnd')
      end
      Citizen.Wait(500)
    end
  end)
end)

AddEventHandler("vrp-phone:attachCallDevice", function(pParameters, pEntity, pContext)
  local model = GetEntityModel(pEntity)
  local coords = GetEntityCoords(pEntity)
  local id = GetPayphoneId(coords)
  local device = exports['vrp-inventory']:getItemsOfType('payphonedevice', 1, true)
  if not device or not device[1] then
    return
  end

  TriggerEvent('animation:cancel')
  Wait(1000)
  TriggerEvent('animation:PlayAnimation', 'mechanic4')
  local finished = exports['vrp-taskbar']:taskBar(12500, 'Placing Device', false, true, false, false, nil, 3.0, PlayerPedId())
  ClearPedTasks(ped)
  if finished ~= 100 then
    return
  end
  
  local meta = json.decode(device[1].information)
  if not meta or not meta.number then
    return
  end
  RPC.execute("vrp-phone:attachCallDevice", id, coords, model, meta.number)
end)

AddEventHandler("vrp-phone:answerPayphone", function(pParameters, pEntity, pContext)
  local result = RingingPayphones[pEntity]
  if result then
    RPC.execute("vrp-phone:answerPayphone", result.callId)
  end
end)

RegisterNetEvent("vrp-phone:payphoneRing", function(pCoords, pModel, pCallId)
  local entity = GetClosestObjectOfType(pCoords, 0.5, pModel, false, false, false)
  local soundId = GetSoundId()
  while RequestScriptAudioBank("SCRIPT\\ASSASSINATION_MULTI", false) == 0 do
    Citizen.Wait(0)
  end
  PlaySoundFromCoord(soundId, "ASS_PAYPHONE_RING_master", pCoords.x, pCoords.y, pCoords.z, 0, 0, 0)
  SetTimeout(25000, function()
    if not HasSoundFinished(soundId) then
      StopSound(soundId)
      ReleaseSoundId(soundId)
      ReleaseScriptAudioBank()
    end
  end)
  RingingPayphones[entity] = {
    soundId = soundId,
    callId = pCallId,
  }
end)

RegisterNetEvent("vrp-phone:payphoneStopRing", function(pCoords, pModel)
  local entity = GetClosestObjectOfType(pCoords, 0.5, pModel, false, false, false)
  local result = RingingPayphones[entity]
  if result then
    StopSound(result.soundId)
    ReleaseSoundId(result.soundId)
    RingingPayphones[entity] = nil
    ReleaseScriptAudioBank()
  end
end)

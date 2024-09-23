local isRacing = false
local usedItemId, usedItemSlot, usedItemMetadata

local function openAliasTextbox()
  exports['vrp-ui']:openApplication('textbox', {
    callbackUrl = 'vrp-ui:racing:input:alias',
    key = 1,
    items = {{icon = "pencil-alt", label = "Alias", name = "alias"}},
    show = true
  })
end

AddEventHandler("vrp-inventory:itemUsed", function(item, metadata, inventoryName, slot)
  if item ~= "racingusb2" then return end
  usedItemId = item
  usedItemSlot = slot
  usedItemMetadata = json.decode(metadata)

  local characterId = exports["isPed"]:isPed("cid")
  if characterId ~= usedItemMetadata.characterId then
    TriggerEvent("DoLongHudText", "You don't own this usb!", 2)
    return
  end

  if usedItemMetadata.Alias then
    TriggerEvent("DoLongHudText", "Alias can't be changed for this usb!", 2)
    return
  end

  openAliasTextbox()
end)

RegisterUICallback("vrp-ui:racing:input:alias", function(data, cb)
  cb({data = {}, meta = {ok = true, message = ''}})
  exports['vrp-ui']:closeApplication('textbox')
  local alias = data.values.alias

  if usedItemMetadata.Alias then return end

  if not alias then
    TriggerEvent("DoLongHudText", "No alias entered!", 2)
    return
  end

  local success, msg = RPC.execute("vrp-racing:setAlias", usedItemId, usedItemSlot, usedItemMetadata, alias)
  if success then
    exports["vrp-ui"]:sendAppEvent("phone", {
      action = "racing-alias-set",
      title = "From the PM",
      text = "Welcome to the underground, " .. alias .. ".",
    })
  else
    TriggerEvent("DoLongHudText", msg or "Alias could not be set.", 2)
    if msg == "Alias already taken!" then
      openAliasTextbox()
    end
  end
end)

AddEventHandler("mkr_racing:api:raceStarted", function(race)
  if race.shouldSendRecklessDrivingCall then
    local cid = exports["isPed"]:isPed("cid")
    if cid == race.owner then
      AlertReckless()
      if tablelength(race.players) >= 8 then
        AlertSuspiciousVehicle()
      end
    end
  end
end)

RegisterNetEvent("vrp-racing:kickedFromRace")
AddEventHandler("vrp-racing:kickedFromRace", function(errorMessage)
  TriggerEvent("DoLongHudText", errorMessage, 2)
end)

RegisterNetEvent("vrp-racing:bannedFromRace")
AddEventHandler("vrp-racing:bannedFromRace", function(errorMessage)
  TriggerEvent("DoLongHudText", errorMessage, 2)
end)

AddEventHandler("mkr_racing:api:currentRace", function(currentRace)
  isRacing = currentRace ~= nil
  if isRacing then
    exports["vrp-mkr-racing"]:resetHudPosition()
  end
end)

AddEventHandler("phone:hasNotificationChanged", function(lastHasNotification, hasNotification, topOfPhone)
  if not isRacing then return end

  if hasNotification then
    exports["vrp-mkr-racing"]:setHudPosition({
      top = nil,
      bottom = tostring(topOfPhone + 25) .. "px",
      left = nil,
      right = '25px'
    })
  else
    exports["vrp-mkr-racing"]:resetHudPosition()
  end
end)

RegisterNetEvent('vrp-inventory:itemCheck')
AddEventHandler('vrp-inventory:itemCheck', function(itemId, hasItem)
  if itemId ~= "racingusb0" and itemId ~= "racingusb2" and itemId ~= "racingusb3" then return end
  local hasRaceUsbAndAlias = exports["vrp-racing"]:getHasRaceUsbAndAlias()
  exports["vrp-ui"]:sendAppEvent("phone", {
    action = "racing-update-phone-state",
    hasUsbRacingCreate = hasRaceUsbAndAlias.has_usb_racing_create,
    hasUsbRacing = hasRaceUsbAndAlias.has_usb_racing,
    hasUsbPDRacing = hasRaceUsbAndAlias.has_usb_pd_racing,
    racingAlias = hasRaceUsbAndAlias.racingAlias,
  })
end)

RegisterNetEvent("vrp-racing:newMessage")
AddEventHandler("vrp-racing:newMessage", function(eventId, message, eventType)
  exports["vrp-ui"]:sendAppEvent("phone", {
    action = "racing-new-message",
    eventId = eventId,
    message = message,
    eventType = eventType,
    timeout = 5000,
  })
end)

RegisterNetEvent("nns_weather:client:nightTime")
AddEventHandler("nns_weather:client:nightTime", function(nightTime)
  exports["vrp-ui"]:sendAppEvent("phone", {
    action = "racing-night-time",
    isNightTime = nightTime,
  })
end)

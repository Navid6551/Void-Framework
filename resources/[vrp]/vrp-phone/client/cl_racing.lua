local function getAlias(alias, character)
  if alias ~= nil then return alias end
  return character.first_name .. " " .. character.last_name
end

RegisterUICallback("vrp-ui:racingGetAllRaces", function(data, cb)
  local res = exports["vrp-mkr-racing"]:getAllRaces()
  local completed = RPC.execute("mkr_racing:getFinishedRaces")
  res.completed = completed
  cb({ data = res, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingGetEventConversation", function(data, cb)
  local res = RPC.execute("vrp-racing:getEventConversation", data.eventId)
  cb({ data = res.data, meta = { ok = res.success, message = res.message or 'done' } })
end)

RegisterUICallback("vrp-ui:racingSendMessage", function(data, cb)
  local success, message = RPC.execute("vrp-racing:sendEventMessage", data.characterId, data.alias, data.eventId, data.message)
  cb({ data = res, meta = { ok = success, message = message or 'done' } })
end)

RegisterUICallback("vrp-ui:racingPreviewRace", function(data, cb)
  exports["vrp-mkr-racing"]:previewRace(data.id)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingLocateRace", function(data, cb)
  exports["vrp-mkr-racing"]:locateRace(data.id, data.eventId, data.race.reverse)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingNotifyRacers", function(data, cb)
  local success, message = RPC.execute("vrp-racing:notifyRacers", data.alias, data.message, data.playerIds)
  cb({ data = {}, meta = { ok = success, message = message } })
end)

RegisterUICallback("vrp-ui:racingCreateRace", function(data, cb)
  data.options.characterId = data.character.id
  data.options.alias = getAlias(data.options.alias, data.character)

  -- Hard-coded options
  data.options.lineBasedCheckpoints = true

  local err = exports["vrp-mkr-racing"]:createPendingRace(data.id, data.options)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  cb({ data = res, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingDeleteRace", function(data, cb)
  local success = false
  local message = "Failed to delete race"
  if data.id then
    success = RPC.execute('mkr_racing:deleteRace', data.id)
    if success then message = "" end
  end
  cb({ data = res, meta = { ok = success, message = message } })
end)

RegisterUICallback("vrp-ui:racingJoinRace", function(data, cb)
  local canJoinOrErr = exports["vrp-racing"]:canJoinOrStartRace(data.race.vehicleClass)
  if canJoinOrErr ~= true then
    cb({ data = {}, meta = { ok = false, message = canJoinOrErr } })
    return
  end
  local err = exports["vrp-mkr-racing"]:joinRace(data.race.eventId, getAlias(data.alias, data.character), data.character.id, data.password)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingStartRace", function(data, cb)
  local canJoinOrErr = exports["vrp-racing"]:canJoinOrStartRace(data.race.vehicleClass)
  if canJoinOrErr ~= true then
    cb({ data = {}, meta = { ok = false, message = canJoinOrErr } })
    return
  end
  local err = exports["vrp-mkr-racing"]:startRace(data.race.countdown)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingLeaveRace", function(data, cb)
  exports["vrp-mkr-racing"]:leaveRace()
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingEndRace", function(data, cb)
  exports["vrp-mkr-racing"]:endRace()
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingKickFromRace", function(data, cb)
  RPC.execute("mkr_racing:kickFromRace", data.raceId, data.playerId)
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingBanFromRace", function(data, cb)
  RPC.execute("mkr_racing:banFromRace", data.raceId, data.playerId)
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingCreateMap", function(data, cb)
  local canCreate, errorMessage = RPC.execute("vrp-racing:canCreateNewRace", data)
  if not canCreate then
    cb({ data = {}, meta = { ok = false, message = errorMessage } })
    return
  end
  local ped = PlayerPedId()
  local veh = GetVehiclePedIsIn(PlayerPedId(), false)
  if veh ~= 0 and GetPedInVehicleSeat(veh, -1) == ped then
    TriggerEvent("mkr_racing:cmd:racecreate", data)
    cb({ data = {}, meta = { ok = true, message = 'done' } })
    exports["vrp-ui"]:closeApplication("phone")
  else
    cb({ data = {}, meta = { ok = false, message = 'You are not driving a vehicle' } })
  end
end)

RegisterUICallback("vrp-ui:racingFinishMap", function(data, cb)
  TriggerEvent("mkr_racing:cmd:racecreatedone")
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingCancelMap", function(data, cb)
  TriggerEvent("mkr_racing:cmd:racecreatecancel")
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingBestLapTimes", function(data, cb)
  local bestLapTimes = RPC.execute("mkr_racing:bestLapTimes", data.id, data.vehicleClass, 10)
  local bestLapTimesForAlias = RPC.execute("mkr_racing:bestLapTimesForAlias", data.id, exports["isPed"]:isPed("cid"), data.alias, data.vehicleClass, 1)
  local bestLapTimeForAlias = bestLapTimesForAlias ~= nil and bestLapTimesForAlias[1] or nil
  cb({ data = { bestLapTimes = bestLapTimes, bestLapTimeForAlias = bestLapTimeForAlias }, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingSetNightTime", function(data, cb)
  exports["vrp-ui"]:sendAppEvent("phone", {
    action = "racing-night-time",
    isNightTime = false--exports["vrp-weathersync"]:isNightTime(),
  })
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingGetAllTournaments", function(data, cb)
  local res = exports["vrp-mkr-racing"]:getAllTournaments()
  cb({ data = res, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingCreateTournament", function(data, cb)
  local err = RPC.execute("mkr_racing:createTournament", data.options.name, data.options.totalRaces, getAlias(data.options.alias, data.character), data.options.password)
  if err then
    cb({ data = nil, meta = { ok = false, message = err } })
    return
  end
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingJoinTournament", function(data, cb)
  local err = RPC.execute("mkr_racing:joinTournament", data.tournament.name, getAlias(data.alias, data.character), data.character.id, data.password)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingLeaveTournament", function(data, cb)
  RPC.execute("mkr_racing:leaveTournament", data.character.id)
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingEndTournament", function(data, cb)
  RPC.execute("mkr_racing:endTournament", data.tournament.name)
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("vrp-ui:racingGiveDongle", function(data, cb)
  local err = RPC.execute("vrp-racing:giveRaceDongle", data.options.characterId)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)


AddEventHandler("mkr_racing:api:startingRace", function(startTime)
  TriggerEvent('DoLongHudText', "Starting in " .. tostring(startTime / 1000) .. " seconds", 1, 12000, { i18n = { "Starting in", "seconds" } })
end)

AddEventHandler("mkr_racing:api:updatedState", function(state)
  local data = {action = "racing-update"}
  if state.finishedRaces then data.completed = state.finishedRaces end
  if state.races then data.maps = state.races end
  if state.pendingRaces then data.pending = state.pendingRaces end
  if state.activeRaces then data.active = state.activeRaces end
  if state.tournaments then data.tournaments = state.tournaments end
  exports["vrp-ui"]:sendAppEvent("phone", data)
end)

function TriggerPhoneNotification(title, body)
  SendUIMessage({
    source = "vrp-nui",
    app = "phone",
    data = {
      action = "notification",
      target_app = "racing",
      title = title,
      body = body,
      show_even_if_app_active = true
    }
  })
end

AddEventHandler("mkr_racing:api:addedPendingRace", function(race)
  if not race.sendNotification then return end
  local hasRaceUsbAndAlias = exports["vrp-racing"]:getHasRaceUsbAndAlias()
  if not hasRaceUsbAndAlias.has_usb_racing or not hasRaceUsbAndAlias.racingAlias then return end
  exports["vrp-ui"]:sendAppEvent("phone", {
    action = "racing-new-event",
    title = "From the PM",
    text = "Pending race available...",
  })
end)

AddEventHandler("mkr_racing:api:playerJoinedYourRace", function(characterId, name)
  TriggerPhoneNotification("Race Join", name .. " joined your race")
end)

AddEventHandler("mkr_racing:api:playerLeftYourRace", function(characterId, name)
  TriggerPhoneNotification("Race Leave", name .. " left your race")
end)

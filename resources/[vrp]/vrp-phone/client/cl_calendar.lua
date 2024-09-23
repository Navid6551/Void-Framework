local UpcomingEvents = {}

RegisterUICallback("vrp-ui:calendar:createEvent", function(data, cb)
  local result, message = RPC.execute("vrp-phone:calendar:createEvent", data)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterUICallback("vrp-ui:calendar:joinEvent", function(data, cb)
  -- text: Event Code
  local result, message = RPC.execute("vrp-phone:calendar:joinEvent", data.text)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterUICallback("vrp-ui:calendar:sendInvite", function(data, cb)
  -- text: State ID to invite
  local result, message = RPC.execute("vrp-phone:calendar:sendInvite", data.id, data.text)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterUICallback("vrp-ui:calendar:leaveEvent", function(data, cb)
  -- id: Event ID to leave
  local result = RPC.execute("vrp-phone:calendar:leaveEvent", data.id)
  cb({ data = "ok", meta = { ok = result, message = "done" } })
end)

RegisterUICallback("vrp-ui:calendar:getEvents", function(data, cb)
  local data = RPC.execute("vrp-phone:calendar:getEvents", data.character.id) or {}
  UpcomingEvents = data
  cb({ data = data, meta = { ok = true, message = "done" } })
end)

RegisterUICallback("vrp-ui:calendar:editEvent", function(data, cb)
  local result, message = RPC.execute("vrp-phone:calendar:editEvent", data)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterUICallback("vrp-ui:calendar:forceAddEvent", function(data, cb)
  local result, message = RPC.execute("vrp-phone:calendar:forceAddEvent", data.id, data.text)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterNetEvent("vrp-phone:calendar:eventInvite", function(pEventId, pName)
  local result = DoPhoneConfirmation("Event Invite", pName)
  if result then
    RPC.execute("vrp-phone:calendar:joinEventById", pEventId)
  end
end)

RegisterNetEvent("vrp-phone:calendar:checkEvent", function(pEventId)
  for _, event in ipairs(UpcomingEvents) do
    if event.id == pEventId then
      SendUIMessage({
        source = "vrp-nui",
        app = "phone",
        data = {
          action = "notification",
          target_app = "calendar",
          title = "Calendar",
          body = event.name .. " is starting!",
          icon = { background = "#171717", color = "white", name = "calendar-alt" },
          show_even_if_app_active = true,
        },
      })
      return
    end
  end
end)

function getUpcomingEvents(pCharacterId)
  UpcomingEvents = RPC.execute("vrp-phone:calendar:getUpcomingEvents", pCharacterId) or {}
  if #UpcomingEvents > 0 then
    SendUIMessage({
      source = "vrp-nui",
      app = "phone",
      data = {
        action = "notification",
        target_app = "calendar",
        title = "Calendar",
        body = "You have " .. #UpcomingEvents .. " event" .. (#UpcomingEvents > 1 and "s" or "") .. " happening soon",
        icon = { background = "#171717", color = "white", name = "calendar-alt" },
        show_even_if_app_active = true,
      },
    })
  end
end

AddEventHandler("vrp-spawn:characterSpawned", getUpcomingEvents)

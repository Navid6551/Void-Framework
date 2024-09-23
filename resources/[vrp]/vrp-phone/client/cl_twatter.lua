local phoneItems = {"mobilephone", "stoleniphone", "stolennokia", "stolenpixel3", "stolens8", "boomerphone"}
local currentJob = nil

RegisterNetEvent("vrp-jobmanager:playerBecameJob")
AddEventHandler("vrp-jobmanager:playerBecameJob", function(job, name, notify)
    currentJob = job
end)

RegisterNetEvent("phone:twatter:receive")
AddEventHandler("phone:twatter:receive", function(pTwat)
  local hasPhone = false

  for _,itemId in ipairs(phoneItems) do
    hasPhone = exports['vrp-inventory']:hasEnoughOfItem(itemId, 1, false, true) or hasPhone
  end

  if pTwat.limitedToJob then
    if currentJob ~= pTwat.limitedToJob then
        return
    end
  end

  SendUIMessage({
    source = "vrp-nui",
    app = "phone",
    data = {
      action = "twatter-receive",
      character = pTwat.character,
      timestamp = pTwat.timestamp,
      text = pTwat.text,
      hasPhone = hasPhone,
      isBlue = pTwat.isBlue,
    }
  })
end)

RegisterUICallback("vrp-ui:getBlockedTwatterUsers", function (data, cb)
  local users = RPC.execute("vrp-phone:getBlockedUsers")
  cb({ data = users, meta = { ok = true, message = "done" } })
end)

RegisterUICallback("vrp-ui:unblockTwatterUser", function (data, cb)
  local success = RPC.execute("vrp-phone:unblockTwatterUser", data.user)
  cb({ data = success, meta = { ok = success, message = "done" } })
end)


RegisterUICallback("vrp-ui:twatSend", function(data, cb)
  local character_id, first_name, last_name, text = data.character.id, data.character.first_name, data.character.last_name, data.text
  local success, message = RPC.execute("phone:addTwatterEntry", character_id, first_name, last_name, text)
  cb({ data = message, meta = { ok = success, message = (not success and message or 'done') } })
end)

RegisterUICallback("vrp-ui:getTwats", function(data, cb)
  local success, message = RPC.execute("phone:getTwatterEntries")
  cb({ data = message, meta = { ok = success, message = (not success and message or 'done') } })
end)

-- TODO: Iterate over online admins.
-- report a twat
RegisterUICallback("vrp-ui:twatReport", function(data, cb)
  -- INCOMING
  -- data.character = character data from vrp-ui:init
  -- data.twat = tweet content

  -- RETURN
  -- cb data = {},
  --    meta = { ok: true | false, message: string }
  cb({ data = {}, meta = { ok = true, message = '' } });

  RPC.execute("vrp-phone:twatReport", data.twat)
end)

RegisterUICallback('vrp-ui:blockTwatterUser', function (data, cb)
  local success, message = RPC.execute("vrp-phone:blockTwatterUser", data.cid)
  cb({ data = {}, meta = { ok = success, message = message } });
end)

RegisterUICallback("vrp-ui:phone:purchaseBlue", function(data, cb)
  local success, message = RPC.execute("vrp-phone:purchaseBlue")
  cb({ data = success, meta = { ok = success, message = (not success and message or 'done') } })
end)

RegisterUICallback("vrp-ui:phone:cancelBlue", function(data, cb)
  local finished = exports["vrp-taskbar"]:taskBar(30000, "Canceling...", true)
  if finished ~= 100 then
    cb({ data = false, meta = { ok = false, message = "Failed to cancel subscription" } })
    return
  end

  local success, message = RPC.execute("vrp-phone:cancelBlue")
  cb({ data = success, meta = { ok = success, message = (not success and message or 'done') } })
end)

RegisterUICallback("vrp-ui:phone:getTwatterBlue", function(data, cb)
  local success = RPC.execute("vrp-phone:getTwatterBlue")
  cb({ data = success, meta = { ok = success, message = 'done' } })
end)

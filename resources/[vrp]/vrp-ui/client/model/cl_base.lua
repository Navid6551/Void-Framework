-- CLOSE APP
function SetUIFocus(hasKeyboard, hasMouse)
--  HasNuiFocus = hasKeyboard or hasMouse
  HasNuiFocus = hasKeyboard or hasMouse
  SetNuiFocus(hasKeyboard, hasMouse)

  -- TriggerEvent("vrp-voice:focus:set", HasNuiFocus, hasKeyboard, hasMouse)
  -- TriggerEvent("vrp-binds:should-execute", not HasNuiFocus)
end

exports('SetUIFocus', SetUIFocus)

RegisterNUICallback("vrp-ui:closeApp", function(data, cb)
    SetUIFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
    Wait(800)
    TriggerEvent("attachedItems:block",false)
end)

RegisterNUICallback("vrp-ui:applicationClosed", function(data, cb)
    TriggerEvent("vrp-ui:application-closed", data.name, data)
    cb({data = {}, meta = {ok = true, message = 'done'}})
end)

-- FORCE CLOSE
RegisterCommand("vrp-ui:force-close", function()
    SendUIMessage({source = "vrp-nui", app = "", show = false});
    SetUIFocus(false, false)
end, false)

-- SMALL MAP
RegisterCommand("vrp-ui:small-map", function()
  SetRadarBigmapEnabled(false, false)
end, false)

local function restartUI(withMsg)
  SendUIMessage({ source = "vrp-nui", app = "main", action = "restart" });
  if withMsg then
    TriggerEvent("DoLongHudText", "You can also use 'ui-r' as a shorter version to restart!")
  end
  Wait(5000)
  TriggerEvent("vrp-ui:restarted")
  SendUIMessage({ app = "hud", data = { display = true }, source = "vrp-nui" })
  local cj = exports["police"]:getCurrentJob()
  if cj ~= "unemployed" then
    TriggerEvent("vrp-jobmanager:playerBecameJob", cj)
    TriggerServerEvent("vrp-jobmanager:fixPaychecks", cj)
  end
  loadPublicData()
  loadTaxData()
end
RegisterCommand("vrp-ui:restart", function() restartUI(true) end, false)
RegisterCommand("ui-r", function() restartUI() end, false)
RegisterNetEvent("vrp-ui:server-restart")
AddEventHandler("vrp-ui:server-restart", restartUI)

RegisterCommand("vrp-ui:debug:show", function()
    SendUIMessage({ source = "vrp-nui", app = "debuglogs", data = { display = true } });
end, false)

RegisterCommand("vrp-ui:debug:hide", function()
    SendUIMessage({ source = "vrp-nui", app = "debuglogs", data = { display = false } });
end, false)

RegisterNUICallback("vrp-ui:resetApp", function(data, cb)
    SetUIFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
    sendCharacterData()
end)

RegisterNetEvent("vrp-ui:server-relay")
AddEventHandler("vrp-ui:server-relay", function(data)
    SendUIMessage(data)
end)

RegisterNetEvent("isJudge")
AddEventHandler("isJudge", function()
  sendAppEvent("character", { job = "judge" })
end)

RegisterNetEvent("isJudgeOff")
AddEventHandler("isJudgeOff", function()
  sendAppEvent("character", { job = "unemployed" })
end)

RegisterNetEvent("vrp-jobmanager:playerBecameJob")
AddEventHandler("vrp-jobmanager:playerBecameJob", function(job)
  sendAppEvent("character", { job = job })
end)

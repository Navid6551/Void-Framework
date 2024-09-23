local isRadioOpen = false

RegisterNetEvent('ChannelSet')
AddEventHandler('ChannelSet', function(chan)
    exports["vrp-ui"]:sendAppEvent("radio", { value = chan })
end)

RegisterCommand('radio', function()
    TriggerEvent('radioGui')
end)

RegisterNetEvent('radioGui')
AddEventHandler('radioGui', function()
    local currentJob = exports["isPed"]:isPed("myjob")

    if exports["isPed"]:isPed("incall") then
    TriggerEvent("DoShortHudText","You can not do that while in a call!",2)
        return
    end

    if not hasRadio() then
        TriggerEvent("DoShortHudText","You need a radio.",2)
        toggleRadioAnimation(false)
        return
    end

    if not isRadioOpen then
        exports["vrp-ui"]:openApplication("radio", {
            emergency = (currentJob == "police" or currentJob == "ems" or currentJob == "doc")
        })
        local _, isAnimalModel = pcall(function () return exports["vrp-misc-code"]:isAnimalModel(GetEntityModel(PlayerPedId())) end)
        if not isAnimalModel then toggleRadioAnimation(true) end
    else
        exports["vrp-ui"]:closeApplication("radio")
        closeEvent()
    end

    isRadioOpen = not isRadioOpen
end)

RegisterUICallback('vrp-ui:radioVolumeUp', function(data, cb)
    exports["vrp-voice"]:IncreaseRadioVolume()
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RegisterUICallback('vrp-ui:radioVolumeDown', function(data, cb)
    exports["vrp-voice"]:DecreaseRadioVolume()
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RegisterUICallback('vrp-ui:toggleRadioOn', function(data, cb)
    exports["vrp-voice"]:SetRadioPowerState(true)
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RegisterUICallback('vrp-ui:toggleRadioOff', function(data, cb)
    exports["vrp-voice"]:SetRadioPowerState(false)
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RegisterUICallback('vrp-ui:setRadioChannel', function(data, cb)
    local success = handleConnectionEvent(data.channel)
    cb({ data = success, meta = { ok = true, message = '' } })
end)

AddEventHandler('vrp-radio:setChannel', function(params)
    handleConnectionEvent(params[1])
    exports["vrp-ui"]:sendAppEvent("radio", { value = params[1] })
end)

AddEventHandler('vrp-radio:updateRadioState', function (frequency, powered)
    exports["vrp-ui"]:sendAppEvent("radio", { value = frequency, state = powered })
end)

AddEventHandler("vrp-ui:application-closed", function (name, data)
    if name ~= "radio" then return end
    isRadioOpen = false
    closeEvent()
end)

RegisterNetEvent('vrp-inventory:itemCheck')
AddEventHandler('vrp-inventory:itemCheck', function (item, state, quantity)
    if item ~= "civradio" and item ~= "radio" then return end
    if state or quantity > 0 then return end
    exports["vrp-voice"]:SetRadioPowerState(false)
    exports["vrp-ui"]:sendAppEvent("radio", { value = 0, state = false })
    TriggerEvent("DoLongHudText", "You have been disconnected from the radio.")
end)
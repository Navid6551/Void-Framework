RegisterNUICallback("vrp-ui:hudUpdateRadioSettings", function(data, cb)
    exports["vrp-base"]:getModule("SettingsData"):setSettingsTableGlobal({ ["tokovoip"] = data.settings }, true)
    cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterNUICallback("vrp-ui:hudUpdateKeybindSettings", function(data, cb)
    exports["vrp-base"]:getModule("DataControls"):encodeSetBindTable(data.controls)
    cb({ data = {}, meta = { ok = true, message = 'done' } })
end)
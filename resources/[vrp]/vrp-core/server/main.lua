QBCore = {}
QBCore.Config = QBConfig
QBCore.Shared = QBShared
QBCore.ClientCallbacks = {}
QBCore.ServerCallbacks = {}

exports('GetCoreObject', function()
    return QBCore
end)

AddEventHandler('onResourceStart', function(pResource)
    if pResource ~= GetCurrentResourceName() then return end
    Wait(150)
    TriggerEvent('vrp-core:updateObject', QBCore)
end)

-- To use this export in a script instead of manifest method
-- Just put this line of code below at the very top of the script
-- local QBCore = exports['vrp-core']:GetCoreObject()

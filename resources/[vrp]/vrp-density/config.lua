Config = {}

-- Default Values
Config.populationDensity = 0.8

Config.antiGhostDebug = false
Config.antiGhostYeetVehicles = true
Config.antiGhostScaleX = 10.0
Config.antiGhostScaleY = 5.0

Citizen.CreateThread(function ()
    while not NetworkIsSessionStarted() do Citizen.Wait(0) end

    -- local resourceConfig = exports['vrp-config']:GetModuleConfig('vrp-density')

    -- if resourceConfig == nil then return end

    -- Config = resourceConfig
end)

AddEventHandler('vrp-config:configLoaded', function (pId, pConfig)
    if (pId ~= 'vrp-density') then return end

    Config = pConfig
end)
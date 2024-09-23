RPC.register('showroom:locationInit', function(pSource, pLocation)
    local config = getConfigFor(pLocation)
    return config.carSpawns, config.testDriveSpawnPoint
end)

RPC.register('showroom:locationRemove', function(pSource, pLocation)
    ---This is an api for the showroom app
    return true
end)

RPC.register('showroom:changeSpawnedCar', function(pSource, pLocation, pIndex, pModel)
    local myCoords = exports['vrp-infinity']:GetPlayerCoords(pSource)
    local nearPlayers = exports['vrp-infinity']:GetNearbyPlayers(myCoords, 20)
    local config = getConfigFor(pLocation)

    config.carSpawns[pIndex].model = pModel

    for k, v in pairs(nearPlayers) do
        TriggerClientEvent('showroom:updateCarSpawns', v, config.carSpawns)
    end
end)
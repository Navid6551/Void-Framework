local QBCore = exports['vrp-core']:GetCoreObject()

RPC.register('GetLicenses', function(pSource)
    local licenses = {}
    local Player = QBCore.Functions.GetPlayer(pSource)
    for k, v in pairs(Player.PlayerData.metadata.licences) do
        if v then
            table.insert(licenses, {
                name = k..' License',
                status = v
            })
        end
    end
    return true, licenses
end)

RPC.register('vrp-gov:police:showBadge', function(pSource, pData)
    local myCoords = exports['vrp-infinity']:GetPlayerCoords(pSource)
    local nearBy = exports['vrp-infinity']:GetNearbyPlayers(myCoords, 2)
    for k, v in pairs(nearBy) do
        TriggerClientEvent('vrp-gov:police:showBadge', v, pSource, pData)
    end
end)
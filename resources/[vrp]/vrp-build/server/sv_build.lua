local QBCore = exports['vrp-core']:GetCoreObject()
local playersInside = {}
local saveIds = {}

function findPlayer(id, src)
    local data = playersInside[id]
    for k,v in pairs(data) do
        if v == src then
            return k
        end
    end
end

function triggerEventForHouse(pSource, pEvent, ...)
    local id = saveIds[pSource]
    if not id then return end

    local data = playersInside[id]
    if not data then return end
    
    for k,v in pairs(data) do
        if v ~= pSource then
            TriggerClientEvent(pEvent, v, ...)
        end
    end
end exports('TriggerEventForHouse', triggerEventForHouse)

RegisterNetEvent('build:event:inside', function(isInside, pData)
    local src = source
    if not isInside then
        local id = saveIds[src]
        local player = findPlayer(id, src)
        QBCore.Functions.SetPlayerBucket(src, 0)
        playersInside[id][player] = nil
        saveIds[src] = nil
        TriggerClientEvent('8-weathersync:client:EnableSync', src)
        return
    end

    local id = pData.name..''..pData.posGen
    saveIds[src] = id
    if not playersInside[id] then
        playersInside[id] = {
            src
        }
    else
        table.insert(playersInside[id], src)
    end
    QBCore.Functions.SetPlayerBucket(src, pData.posGen)
    TriggerClientEvent('8-weathersync:client:DisableSync', src, 22)
end)
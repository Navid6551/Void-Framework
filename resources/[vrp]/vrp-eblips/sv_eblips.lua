local QBCore = exports['vrp-core']:GetCoreObject()
local EmergencyPlayers = {}
local AllowedJobs = {
    ["police"] = true,
    ["ems"] = true,
}

function triggerEvent(event, ...)
    for k, v in pairs(EmergencyPlayers) do
        TriggerClientEvent(event, v.netId, ...)
    end
end

AddEventHandler('vrp-jobmanager:playerBecameJob', function(pSource, pJob, pDepartment)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if pJob == 'unemployed' then
        if not EmergencyPlayers[pSource] then
            return
        end
        EmergencyPlayers[pSource] = nil
        triggerEvent('e-blips:removeHandler', pSource)
        TriggerClientEvent('e-blips:deleteHandlers', pSource)
        return
    end
    if not AllowedJobs[pJob] then
        return
    end
    TriggerClientEvent('e-blips:setHandlers', pSource, EmergencyPlayers)

    local data = {
        netId = pSource,
        job = pJob,
        callsign = Player.PlayerData.metadata.callsign,
        department = pDepartment,
        sprite = 1,
        jobs = AllowedJobs
    }
    
    EmergencyPlayers[pSource] = data
    triggerEvent('e-blips:addHandler', data)
    
end)

RegisterNetEvent('e-blips:updateBlipHandlerSprite', function(pServerId, pSprite)
    local data = EmergencyPlayers[pServerId]
    if not data then return end
    EmergencyPlayers[pServerId].sprite = pSprite
    triggerEvent('e-blips:client:updateBlipHandlerSprite', pServerId, pSprite, data.department, data.job, data.callsign)
end)

AddEventHandler('vrp-jobmanager:playerCallsignChanged', function(pSource, pCallsign)
    local data = EmergencyPlayers[pSource]
    if not data then return end
    EmergencyPlayers[pSource].callsign = pCallsign
    triggerEvent('e-blips:client:updateBlipHandlerSprite', pSource, data.sprite, data.department, data.job, pCallsign)
end)

AddEventHandler('playerDropped', function (reason)
    local src = source
    if not EmergencyPlayers[src] then
        return
    end
    EmergencyPlayers[src] = nil
    triggerEvent('e-blips:removeHandler', src)
end)
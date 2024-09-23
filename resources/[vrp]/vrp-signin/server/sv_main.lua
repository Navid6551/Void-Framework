local QBCore = exports['vrp-core']:GetCoreObject() 

function isWhitelisted(pCid, pJob)
    local data = Await(SQL.execute("SELECT * FROM mdt_staff WHERE job = @job AND character_id = @cid", {
        ["job"] = pJob,
        ["cid"] = pCid
    }))
    if not data[1] then
        return false, '', '', 0
    end
    return true, data[1].job, data[1].department, data[1].rank
end exports('isWhitelisted', isWhitelisted)

function SetCallsign(pSource, pCallsign)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then return false end
    Player.Functions.SetMetaData('callsign', pCallsign)
    TriggerClientEvent('vrp-jobmanager:playerCallsignChanged', pSource, pCallsign)
    TriggerEvent('vrp-jobmanager:playerCallsignChanged', pSource, pCallsign)
    return true
end exports('SetCallsign', SetCallsign)


RegisterNetEvent('vrp-signin:duty', function(pJob)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local pCid = Player.PlayerData.citizenid
    -- local isWhitelisted, s, pDebt = isWhitelisted(pCid, pJob)
    -- if not isWhitelisted then
    --     TriggerClientEvent('DoLongHudText', src, 'You are not whitelisted! dickhead.', 2)
    --     return
    -- end
    if pJob == 'police' then
        
    end
    TriggerClientEvent('vrp-jobmanager:playerBecameJob', src, pJob, pDebt)
    TriggerEvent('vrp-jobmanager:playerBecameJob', src, pJob, pDebt)
    Player.Functions.SetJob(pJob, 0)
    Player.Functions.SetJobDuty(true)
end)

RegisterCommand('callsign', function(pSource, pArgs)
    SetCallsign(pSource, tonumber(pArgs[1]))
end)
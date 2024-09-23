local QBCore = exports['vrp-core']:GetCoreObject()
local activeEmploeeys = {
    snr_buns = {}
}

function findEmploeeById(src, biz)
    local members = activeEmploeeys[biz]
    for k, v in pairs(members) do
        return k, v
    end
    return false, false
end

RPC.register('vrp-restaurants:joinJob', function(pSource, pBiz, pType)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local emplooes = activeEmploeeys[pBiz]

    if (#emplooes >= 6) then
        return false, 'no-more', "You can't work here right now!"
    end

    table.insert(emplooes, {
        src = pSource,
        biz = pBiz,
        cid = Player.PlayerData.citizenid,
        name = Player.PlayerData.charinfo.firstname..' '..Player.PlayerData.charinfo.lastname
    })


    return true, 'joined-job', 'Clocked in!'
end)

RPC.register('vrp-restaurants:leaveJob', function(pSource, pJob)
    local pRestaurant = activeEmploeeys[pJob]
    local user = findEmploeeById(pSource, pJob)

    if not user then return false end

    pRestaurant[user] = nil

    return true
end)

RPC.register('vrp-restaurants:getActiveEmployees', function(pSource, pBiz)
    return activeEmploeeys[pBiz]
end)
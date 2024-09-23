CharacterProgression = Progression:new()

local function InitProgression()
    local progression = RPC.execute('vrp:progression:character:init')

    if not progression then return error('Unable to load progression') end

    CharacterProgression:setProgression(progression)
end

function GetProgression(pSystem)
    return CharacterProgression:getProgression(pSystem)
end

exports('GetProgression', GetProgression)

RPC.register('vrp:progression:update', function (pSystem, pValue)
    CharacterProgression:updateProgression(pSystem, pValue)
end)

Citizen.CreateThread(function()
    local cid = exports['isPed']:isPed('cid');

    if not cid or cid <= 0 then return end

    InitProgression()
end)

AddEventHandler('vrp-spawn:characterSpawned', function()
    InitProgression()
end)
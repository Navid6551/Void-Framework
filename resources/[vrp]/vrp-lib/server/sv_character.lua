QBCore = exports['vrp-core']:GetCoreObject()

-- function characterExist(cid)
--     if not cid then return false end

--     local exist = MySQL.scalar.await([[
--         SELECT id
--         FROM characters
--         WHERE id = ?
--     ]],
--     { cid })

--     if not exist then return false end

--     return true
-- end

-- function getCharacter(cid, info)
--     if not cid then return 0 end

--     local info = MySQL.scalar.await([[
--         SELECT ??
--         FROM characters
--         WHERE id = ?
--     ]],
--     { info, cid })

--     if not info then return 0 end

--     return info
-- end

exports('getCharacter', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    return {
        id = tonumber(Player.PlayerData.citizenid)
    }
end)

exports('getPlayerModule', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    return Player
end)

exports('removeMoney', function(pSource, pAmount)
    local Player = QBCore.Functions.GetPlayer(pSource)
    Player.Functions.RemoveMoney('cash', pAmount)
end)

exports('addMoney', function(pSource, pAmount)
    local Player = QBCore.Functions.GetPlayer(pSource)
    Player.Functions.AddMoney('cash', pAmount)
end)
PlayersCoords = {}

RegisterServerEvent("vrp:infinity:player:ready")
AddEventHandler("vrp:infinity:player:ready", function()
    local src = source

    local ped = GetPlayerPed(src)
    local coords = GetEntityCoords(ped)

    -- PlayersCoords[src] = coords
    -- TriggerClientEvent("vrp:infinity:player:coords", src, PlayersCoords)
end)

RegisterServerEvent("vrp:infinity:entity:coords")
AddEventHandler("vrp:infinity:entity:coords", function(pNetId)
    local src = source

    local entity = NetworkGetEntityFromNetworkId(pNetId)
    local coords = GetEntityCoords(Gentity)

    TriggerClientEvent("vrp:infinity:entity:coords", src, coords)
end)

RegisterServerEvent("vrp:infinity:player:remove")
AddEventHandler("vrp:infinity:player:remove", function(src)
    PlayersCoords[src] = nil
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(750)
        local players = GetPlayers()
        for idx, player in ipairs(players) do
            local ped = GetPlayerPed(player)
            local coords = GetEntityCoords(ped)
            PlayersCoords[tonumber(player)] = coords
            TriggerEvent('vrp:infinity:player:coords', tonumber(player), coords)
        end
        TriggerClientEvent("vrp:infinity:player:coords", -1, PlayersCoords)
    end
end)

-- RegisterServerEvent('vrp:infinity:player:ready')
-- AddEventHandler('vrp:infinity:player:ready', function()
--     local src = source
--     local ped = GetPlayerPed(src)
--     local playerCoords = GetEntityCoords(ped)
--     PlayersCoords[src] = playerCoords    
--     TriggerClientEvent('vrp:infinity:player:coords', src, PlayersCoords)
-- end)

-- Citizen.CreateThread(function()
--     while true do
--         if #PlayersCoords > 0 then
--             for k,v in pairs(PlayersCoords) do
--                 if v ~= nil then
--                     local ped = GetPlayerPed(k)
--                     local playerCoords = GetEntityCoords(ped)
--                     PlayersCoords[k] = playerCoords
--                 end
--             end
--         end
--         TriggerClientEvent('vrp:infinity:player:coords', -1, PlayersCoords)

--         Citizen.Wait(500)
--     end
-- end)

AddEventHandler("playerDropped", function()
    local src = source
    if #PlayersCoords > 0 then
        PlayersCoords[src] = nil
    end
end)

function GetPlayerCoords(serverid)
    if PlayersCoords[serverid] then
        return PlayersCoords[serverid]
    else
        return false
    end
end

exports("GetPlayerCoords", GetPlayerCoords)

function GetNearbyPlayers(pCoords, pDistance)
    local pData = PlayersCoords
    local returndata = {}
    for pPlayer,COORD in pairs(pData) do
        if #(vector3(pCoords.x,pCoords.y,pCoords.z) - vector3(COORD.x,COORD.y,COORD.z)) < pDistance then
            table.insert( returndata, pPlayer )
        end
    end
    return returndata
end

exports("GetNearbyPlayers", GetNearbyPlayers)
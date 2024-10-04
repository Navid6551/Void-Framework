local PlayersCoords = {}

function GetNerbyPlayers(pCoords, pRange)
    local players = {}
    for k, v in pairs(PlayersCoords) do
        local tempCoords = vector3(v.x, v.y, v.z)
        if #(tempCoords - pCoords) <= pRange then
            table.insert(players, tonumber(k))
        end
    end

    return players
end

function CurrentPlayers()
    return PlayersCoords
end

function GetPlayerCoords(serverID)
    local playerID = serverID

    if playerID ~= -1 then
        return GetEntityCoords(GetPlayerPed(playerID))
    else
        return PlayersCoords[tonumber(serverID)] or vector3(0.0, 0.0, 0.0)
    end
end

RegisterServerEvent("vrp:infinity:player:ready")
AddEventHandler("vrp:infinity:player:ready", function()
    local src = source
    local ped = GetPlayerPed(src)
    local coords = GetEntityCoords(ped)

    PlayersCoords[tonumber(src)] = coords
    exports["vrp-infinity"]:setWorld(src, "default") 
    return 
end)

RegisterServerEvent("vrp:infinity:player:coords")
AddEventHandler("vrp:infinity:player:coords", function()
    local src = source
    local ped = GetPlayerPed(src)
    local coords = GetEntityCoords(ped)

    PlayersCoords[tonumber(src)] = coords
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
    PlayersCoords[tonumber(src)] = nil
end)

exports("GetNerbyPlayers", GetNerbyPlayers)
exports("CurrentPlayers", CurrentPlayers)
exports("GetPlayerCoords", GetPlayerCoords)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(750)

        local players = GetPlayers()
        for idx, player in ipairs(players) do
            local ped = GetPlayerPed(player)
            local coords = GetEntityCoords(ped)
            PlayersCoords[tonumber(player)] = coords
        end
        Citizen.Wait(1000)
        TriggerClientEvent("vrp:infinity:player:coords", -1, PlayersCoords)
    end
end)

AddEventHandler("playerDropped", function()
    local src = source
    PlayersCoords[tonumber(src)] = nil
end)

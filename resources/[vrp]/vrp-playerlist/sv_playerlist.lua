local QBCore = exports['vrp-core']:GetCoreObject()
local Players = {}
local RecentPlayers = {}

function HexIdToSteamId(hexId)
    local cid = math.floor(tonumber(string.sub(hexId, 7), 16))
	local steam64 = math.floor(tonumber(string.sub( cid, 2)))
	local a = steam64 % 2 == 0 and 0 or 1
	local b = math.floor(math.abs(6561197960265728 - steam64 - a) / 2)
	local sid = "STEAM_0:"..a..":"..(a == 1 and b -1 or b)
    return sid
end

function GetPlayerById(src)
    for k, v in pairs(Players) do
        if v.src == src then
            return v, k
        end
    end
    return nil, nil
end

RegisterNetEvent('vrp-base:playerSessionStarted', function()
    local src = source
    local steamIdentifier = QBCore.Functions.GetIdentifier(src, 'steam')
    local qbPlayers = QBCore.Functions.GetPlayers()

    local stid = HexIdToSteamId(steamIdentifier)
    local ply = GetPlayerName(src)
    local scomid = steamIdentifier:gsub("steam:", "")
    local data = { src = src, steamid = stid, comid = scomid, name = ply }
    table.insert(Players, data)
    TriggerClientEvent("vrp-playerlist:AddAllPlayers", src, Players, RecentPlayers)
    for k, v in pairs(qbPlayers) do
        if v ~= src then
            TriggerClientEvent('vrp-playerlist:AddPlayer', v, data)
        end
    end
end)

AddEventHandler("playerDropped", function()
    local src = source
	local Player = GetPlayerById(src)
    if not Player then return end

    TriggerClientEvent("vrp-playerlist:RemovePlayer", -1, Player)
    Wait(300000)
    TriggerClientEvent("vrp-playerlist:RemoveRecent", -1, src)
end)
QBCore = exports['vrp-core']:GetCoreObject()

RegisterServerEvent('police:showID')
AddEventHandler('police:showID', function(itemInfo)
    local src = source
    local fuck = json.decode(itemInfo)

    local myCoords = exports['vrp-infinity']:GetPlayerCoords(src)
    local nearBy = exports['vrp-infinity']:GetNearbyPlayers(myCoords, 2)
    for k, v in pairs(nearBy) do
        TriggerClientEvent("chat:showCID", v, {
            ['DOB'] = fuck.DOB,
            ['Name'] = fuck.Name,
            ['Surname'] = fuck.Surname,
            ['Sex'] = fuck.Sex == 1 and "F" or "M",
            ['Identifier'] = fuck.Identifier,
            ['pref'] = fuck.Sex == 1 and "Female" or "Male"
        })
    end
end)

RegisterNetEvent("police:rob", function(pTarget)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local tPlayer = QBCore.Functions.GetPlayer(pTarget)
    local cash = tPlayer.PlayerData.money.cash
        
    if cash > 0 then
        tPlayer.Functions.RemoveMoney('cash', cash, "Robbed by player")
        Player.Functions.AddMoney('cash', cash, "Robbed player")
    end
end)

RegisterNetEvent('police:targetCheckInventory', function(pTarget, pFrisk)
    local src = source
    local Player = QBCore.Functions.GetPlayer(pTarget)
    if pFrisk then
        local hasWeapon = Await(exports['vrp-inventory']:FriskPlayer(Player.PlayerData.citizenid))
        local pMessage = {
            color = 2,
            multiline = true,
            args = {
                'Frisk',
                hasWeapon and 'Large bulge on the person' or 'Can\'t feel anything'
            }
        }
        TriggerClientEvent('chat:addMessage', src, pMessage)
        return
    end
    TriggerClientEvent("DoLongHudText", pTarget, "You are being searched")
    TriggerClientEvent("server-inventory-open", src, "1", "ply-" ..Player.PlayerData.citizenid)
end)

RegisterNetEvent("police:targetCheckInventoryPerson", function(pTarget, pFrisk)
    local src = source
	local Player = QBCore.Functions.GetPlayer(pTarget)
    local cid = Player.PlayerData.citizenid
    if not cid then return end
    TriggerClientEvent("DoLongHudText", pTarget, "You are being searched")
    TriggerClientEvent("server-inventory-open", src, "1", "ply-" ..cid)
end)
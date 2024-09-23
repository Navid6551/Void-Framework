QBCore = exports['vrp-core']:GetCoreObject()
local currentRoomLocks = {
    [1] = {},
    [2] = {},
    [3] = {}
}

CURRENT_APARTMENTS = {}

AddEventHandler('vrp-core:updateObject', function(pCore)
    QBCore = pCore
end)

RegisterServerEvent("apartment:serverLockdown")
AddEventHandler("apartment:serverLockdown",function(roomType, roomNumber)
end)

RegisterServerEvent("apartment:serverLockdownCID")
AddEventHandler("apartment:serverLockdownCID", function(roomCid, roomNumber)
end)

RegisterServerEvent("apartments:ToggleLocks")
AddEventHandler("apartments:ToggleLocks",function(roomType, roomNumber)
    currentRoomLocks[roomType][roomNumber] = not currentRoomLocks[roomType][roomNumber]
    TriggerClientEvent("apartments:apartmentLocks", -1, currentRoomLocks)
end)

-- RegisterNetEvent("apartment:serverApartmentSpawn")
RegisterNetEvent("apartment:serverApartmentSpawn",function(roomType, isNew, instance, isSpawn)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)

    local result = Await(SQL.execute("SELECT * FROM player_motel WHERE citizenid = @cid", {
        ["cid"] = Player.PlayerData.citizenid
    }))
    
    if isSpawn then
        TriggerClientEvent("apartments:enterMotel", src, result[1].id, roomType, isSpawn)
    end
    if isNew then
        TriggerClientEvent("apartments:enterMotel", src, result[1].id, roomType, isSpawn)
    end

    TriggerClientEvent("apartments:apartmentSpawn", src, {roomType = roomType}, result[1].id)

    currentRoomLocks[roomType][result[1].id] = false

    TriggerClientEvent("apartments:apartmentLocks", -1, currentRoomLocks)
end)

RPC.register("GetMotelInformation", function(pSource, currentRoomType, currentRoomNumber)
    local returnData = Await(SQL.execute("SELECT * FROM player_motel WHERE id = @number AND building_type = @type", {
        ["number"] = currentRoomNumber,
        ["type"] = currentRoomType
    }))

    return returnData
end)

RPC.register("IsValidRoom", function(pSource, roomType, roomNumber)
    local returnData = Await(SQL.execute("SELECT * FROM player_motel WHERE id = @number AND building_type = @type", {
        ["number"] = roomNumber,
        ["type"] = roomType
    }))

    local retval = false

    if returnData[1] then
        retval = true
    end

    return retval
end)

RPC.register('DoTransaction', function(pSource, pCost)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if Player.PlayerData.money.bank >= pCost then
        Player.Functions.RemoveMoney('bank', pCost)
        return true, 'Success'
    end
    return false, 'Not enough money'
end)

RPC.register("getApartmentInformation", function(pSource)
    return Apart.info
end)

RPC.register("apartment:allCurrentApartmentsOfRoomType", function(pSource, pRoomType)
    for k,v in pairs(currentRoomLocks[pRoomType]) do
        if (CURRENT_APARTMENTS[k]) then return CURRENT_APARTMENTS end
        table.insert(CURRENT_APARTMENTS, k)
    end

    return CURRENT_APARTMENTS
end)

RPC.register("upgradeApartment", function(pSource, apartmentTargetType, roomType, roomNumber)
    local returnData = Await(SQL.execute("SELECT * FROM player_motel WHERE id = @number AND building_type = @type", {
        ["number"] = roomNumber,
        ["type"] = roomType
    }))

    SQL.execute("UPDATE player_motel SET building_type = @type WHERE id = @number", {
        ["number"] = roomNumber,
        ["type"] = apartmentTargetType
    })

    return true
end)

RPC.register("apartment:forclose", function(pSource, roomType, roomNumber)

end)

RPC.register("apartment:getOwner", function(pSource, roomType, roomNumber)
    local returnData = Await(SQL.execute("SELECT * FROM player_motel WHERE id = @number AND building_type = @type", {
        ["number"] = roomNumber,
        ["type"] = roomType
    }))

    return returnData[1].citizenid
end)
   
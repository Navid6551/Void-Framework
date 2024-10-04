QBCore = exports['vrp-core']:GetCoreObject()
local serverStorages = {}

function GetStorageById(pId)
    for k, v in pairs(serverStorages) do
        if v.id == pId then
            return v, k
        end
    end

    return nil, nil
end

RegisterNetEvent('vrp-storage:prepareStorage', function(pModel, pCid, pCoords, pRotation)
    local data = {
        size = pModel,
        coordinates = {
            x = pCoords.x,
            y = pCoords.y,
            z = pCoords.z,
            p = pRotation.x,
            r = pRotation.y,
            h = pRotation.z
        },
        placed_by = pCid,
        placed_at = os.time(),
        despawn_at = os.time() + Config.crates[pModel].duration,
        is_locked = false,
    }

    local insert = SQL.execute("INSERT INTO _storage (size, placed_by, placed_at, despawn_at, coordinates) VALUES (@size, @placed_by, @placed_at, @despawn_at, @coordinates)", {
        ["@size"] = data.size,
        ["@placed_by"] = data.placed_by,
        ["@placed_at"] = data.placed_at,
        ["@coordinates"] = json.encode(data.coordinates)
        ["@despawn_at"] = data.despawn_at
    })

    if not insert then
        return
    end

    table.insert(serverStorages, data)

    TriggerClientEvent('vrp:storage:prepareNewStorage', -1, data)
end)

RegisterNetEvent("vrp-storage:repairStorage", function(closestStash, chargesLeft, pSlots)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local storage = GetStorageById(closestStash)

    SQL.execute("UPDATE _storage SET placed_at = @placed_at, despawn_at = @despawn_at WHERE id = @id", {
        ["@placed_at"] = os.time(), 
        ["@placed_at"] = os.time(), 
        ["@id"] = closestStash
    })
    
    TriggerEvent("server-update-item", Player.PlayerData.citizenid, "craterepairkit", pSlots, json.encode({
        charges = chargesLeft - Config.crates[storage.size].repairCharges,
    }))
end)

RegisterNetEvent("vrp-storage:lockStorage", function(keyCode, crateId, pBoolean)
    local src = source 
    local storage, index = GetStorageById(crateId)

    SQL.execute("UPDATE _storage SET is_locked = @is_locked, key_code = @key_code WHERE id = @id", {
        ["@is_locked"] = true,
        ["@key_code"] = keyCode,
        ["@id"] = crateId
    })

    serverStorages[index].is_locked = true
    serverStorages[index].key_code = keyCode

    if pBoolean then
        TriggerClientEvent("inventory:removeItem", src, "mobilecratekeylock", 1)
    else
        TriggerClientEvent("inventory:removeItem", src, "mobilecratelock", 1)
    end

    TriggerClientEvent("vrp-storage:updateLockState", -1, crateId, true, keyCode)
end)

RegisterNetEvent("vrp-storage:destroyStash", function(closestStash)
    local src = source 
    local storage, index = GetStorageById(closestStash)

    SQL.execute("DELETE FROM _storage WHERE id = @id", {
        ["@id"] = closestStash,
    })

    serverStorages[index] = nil
    
    TriggerClientEvent("vrp-storage:clearStorages", -1, closestStash)
end)

RegisterServerEvent("vrp-storage:breakInStorageFailed")
AddEventHandler("vrp-storage:breakInStorageFailed", function(closestStash, itemUsed)
    print("breakInStorageFailed", closestStash, itemUsed)
end)

RegisterServerEvent("vrp-storage:breakInStorage")
AddEventHandler("vrp-storage:breakInStorage", function(closestStash, itemUsed)
    print("breakInStorage", closestStash, itemUsed)
    local src = source
    local storage = GetStorageById(closestStash)

    TriggerClientEvent("server-inventory-open", src, "1", string.format("mobile-stash-%s_%s", Config.crates[storage.size].invPrefix, closestStash))
end)


RegisterNetEvent('vrp-storage:requestStorages', function()
    local src = source
    TriggerClientEvent('vrp-storage:loadStorages', src, serverStorages)
end)

Citizen.CreateThread(function()
    local result = SQL.execute("SELECT * FROM _storage")
    for k, v in pairs(result) do
        serverStorages[k] = {
            id = v.id,
            size = v.size,
            coordinates = json.decode(v.coordinates),
            placed_by = v.placed_by,
            placed_at = tonumber(v.placed_at),
            despawn_at = tonumber(v.despawn_at),
            is_locked = v.is_locked == 1,
            key_code = v.key_code
        }
    end
end)
Housing.currentHousingLocks = {}
Housing.currentHousingLockdown = {}
Housing.BuisnessLocations = {}
Housing.info = {}

function getHouseFromDatabase(pId)
    local data = Await(SQL.execute("SELECT * FROM _houses WHERE hid = @hid", {
        ['hid'] = pId
    }))

    if not data[1] then
        return false
    end

    if data[1].owner then
        data[1].owner = json.decode(data[1].owner)
    end

    data[1].keys = json.decode(data[1].keys)
    data[1].information = json.decode(data[1].information)
    data[1].objects = json.decode(data[1].objects)
    
    return data[1]
end

function UpdateHouseFromDb(pId, pCol, pValue)
    local update = Await(SQL.execute(string.format("UPDATE _houses SET %s = @col WHERE hid = @id", pCol), {
        col = pValue,
        id = pId
    }))

    if not update then
        return false
    end

    return true
end

function getHouseById(pId)
    return Housing.info[pId]
end

function currentKeys(pSource, pReturnOwner)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local cid = tonumber(Player.PlayerData.citizenid)
    local keys = {}
    
    for k, v in pairs(Housing.info) do
        -- Check if the player owns the house
        if v.housingOwnedBy and v.housingOwnedBy.cid == cid and pReturnOwner then
            keys[k] = {
                keyId = 1,
            }
        end
        -- Check if the player has keys to the house
        for x, z in pairs(v.housingKeys) do
            if z.cid == cid then
                keys[k] = keys[k] or {}
                keys[k].keyId = z.id
                keys[k].designerKey = z.designerKey
            end
        end
    end

    return keys
end

function getCurrentOwned(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local cid = tonumber(Player.PlayerData.citizenid)
    local owned = {}

    for k, v in pairs(Housing.info) do
        if v.housingOwnedBy and v.housingOwnedBy.cid == cid then
            owned[k] = v
        end
    end

    return owned
end

Citizen.CreateThread(function()
    for k, v in pairs(Housing.newStatic) do
        local houseFromDb = getHouseFromDatabase(k)

        v.id = k
        v.housingOwnedBy = houseFromDb and houseFromDb.owner or nil
        v.housingName = v.Street
        v.housingKeys = houseFromDb and houseFromDb.keys or {}
        v.housingCat = Housing.typeInfo[v.model].cat or 'housing'
        v.housingInformation = houseFromDb and houseFromDb.information or defaultInformation

        Housing.info[k] = v
    end
end)

exports('GetCurrentKeys', currentKeys)
exports('GetCurrentOwned', getCurrentOwned)
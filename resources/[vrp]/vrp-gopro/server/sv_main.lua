local QBCore = exports['vrp-core']:GetCoreObject()

function getCamsByCid(pCid)
    local cameras = {}
    local data = Await(SQL.execute("SELECT * FROM _cameras", {}))
    for k, v in pairs(data) do
        local users = json.decode(v.users)
        for i,u in pairs(users) do
            if tonumber(u.id) == tonumber(pCid) then
                table.insert(cameras, {
                    id = v.id,
                    name = v.name,
                })
            end
        end
    end

    return cameras
end

RPC.register('vrp-gopros:getSecurityCameraByCid', function(pSource, pCid)
    return getCamsByCid(pCid)
end)

RPC.register('vrp-gopros:getSecurityCameraById', function(pSource, pId)
    local data = Await(SQL.execute("SELECT * FROM businesses WHERE code = @code", {
        ['code'] = pid
    }))
    if not data[1] then
        return false
    end
    return {
        id = data[1].id,
        name = data[1].name,
        coords = json.decode(data[1].coords),
        heading = data[1].heading,
    }
end)

RPC.register('vrp-gopros:playerSpawnedSendCams', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then
        return {}
    end
    return getCamsByCid(Player.PlayerData.citizenid)
end)

RPC.register('vrp-gopros:addSecCamera', function(pSource, pName, pCoords, pRotation)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local users = {
        {
            id = Player.PlayerData.citizenid,
            name = Player.PlayerData.charinfo.firstname..' '..Player.PlayerData.charinfo.lastname
        }
    }
    Await(SQL.execute("INSERT INTO _cameras (name, coords, heading, users) VALUES (@name, @coords, @heading, @users)", {
        ["name"] = pName,
        ["coords"] = json.encode(pCoords),
        ["heading"] = pRotation.z,
        ["users"] = json.encode(users),
    }))
    return true
end)
RPC.register('phone:getContacts', function(pSource)
    
    local Player = QBCore.Functions.GetPlayer(pSource)
    local data = Await(SQL.execute("SELECT * FROM phone_contacts WHERE citizenid = @citizenid", {
        ["citizenid"] = Player.PlayerData.citizenid
    }))

    if not data[1] then
        return false, data
    end
    return true, data
end)

RPC.register('phone:addContact', function(pSource, pCid, pName, pNumber)
    local data = Await(SQL.execute("INSERT INTO phone_contacts (citizenid, name, number) VALUES (@citizenid, @name, @number)", {
        ["citizenid"] = pCid,
        ["name"] = pName,
        ["number"] = pNumber,
    }))

    if not data then
        return false, 'Failed to add contact'
    end

    return true, {
        id = data.insertId,
        name = pName,
        number = pNumber
    }
end)

RPC.register('phone:deleteContact', function(pSource, pId)
    local data = Await(SQL.execute("DELETE FROM phone_contacts WHERE id = @id", {
        ["id"] = pId,
    }))

    return true, ''
end)
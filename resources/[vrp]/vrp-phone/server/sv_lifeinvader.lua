function GetPersonalEmail(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then
        return false, 0
    end

    local cid = Player.PlayerData.citizenid

    local data = Await(SQL.execute("SELECT * FROM player_emails WHERE citizenid = @cid", {
        ["cid"] = cid
    }))

    if not data[1] then
        return false, cid
    end

    data[1].emails = json.decode(data[1].emails)
    data[1].contacts = json.decode(data[1].contacts)

    return data[1], cid
end

function UpdatePersonalEmail(pId, pCoulmn, pValue)
    local update = Await(SQL.execute(string.format("UPDATE player_emails SET %s = @col WHERE id = @id", pCoulmn), {
        ["col"] = pValue,
        ["id"] = pId
    }))

    if not update then
        return false
    end

    return true
end

RPC.register('vrp-phone:setEmailAddress', function(pSource, pDomain, pUpdate)
    local myEmail, pCid = GetPersonalEmail(pSource)
    if pUpdate and myEmail then
        local update = UpdatePersonalEmail(myEmail.id, 'domain', pDomain)

        return true, 'Updated your email adress'
    else
        local insert = Await(SQL.execute("INSERT INTO player_emails (citizenid, domain) VALUES (@citizenid, @domain)", {
            ["citizenid"] = pCid,
            ["domain"] = pDomain,
        }))

        if not insert then
            return false, 'Failed to insert to database!'
        end

        return true, 'Successfully created your email!'
    end
end)

RPC.register('vrp-phone:getEmailAddress', function(pSource)
    local myEmail = GetPersonalEmail(pSource)
    if not myEmail then
        return false, ''
    end
    return true, myEmail.domain
end)

RPC.register('phone:li:getRandomAdURL', function()
    return true, ''
end)

RPC.register('phone:getEmailContacts', function(pSource)
    local myEmail = GetPersonalEmail(pSource)
    if not myEmail then
        return false, 'no email bro'
    end
    return true, myEmail.contacts
end)

RPC.register('phone:addEmailContact', function(pSource, pData)
    local myEmail = GetPersonalEmail(pSource)
    if not myEmail then
        return false, 'You dont have an email!'
    end

    table.insert(myEmail.contacts, {
        id = #myEmail.contacts + 1,
        name = pData.name,
        email = pData.email
    })

    local update = UpdatePersonalEmail(myEmail.id, 'contacts', json.encode(myEmail.contacts))

    if not update then
        return false, 'Failed to update contacts!'
    end

    return true, 'Added contact'
end)

RPC.register('phone:deleteEmailContact', function(pSource, pData)
    local myEmail = GetPersonalEmail(pSource)
    if not myEmail then
        return false, 'You dont have an email!'
    end
    local newContacts = {}
    for k, v in pairs(myEmail.contacts) do
        if v.id ~= pData.id then
            table.insert(newContacts, v)
        end
    end

    local update = UpdatePersonalEmail(myEmail.id, 'contacts', json.encode(newContacts))

    if not update then
        return false, 'Failed to update contacts!'
    end

    return true, 'Removed contact'
end)

RegisterNetEvent('phone:li:sentEmail', function(pData)
    print('yooo sentEmail', json.encode(pData, {indent = true}))
end)
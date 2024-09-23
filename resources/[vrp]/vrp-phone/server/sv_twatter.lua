local TwatEntries = {}

RPC.register('phone:getTwatterEntries', function()
    return TwatEntries
end)

RPC.register('phone:addTwatterEntry', function(pSource, pCid, pFirstName, pLastName, pText)
    local data =  {
        character = {
            id = pCid,
            first_name = pFirstName,
            last_name = pLastName
        },
        text = pText,
        timestamp = getCurrentTimestamp()
    }
    table.insert(TwatEntries, data)
    TriggerClientEvent('phone:twatter:receive', -1, data)

    return true, ''
end)

RPC.register('vrp-phone:getBlockedUsers', function()
    return {}
end)

RPC.register('vrp-phone:unblockTwatterUser', function()
    return true
end)

RPC.register('vrp-phone:getTwatterBlue', function()
    return false
end)
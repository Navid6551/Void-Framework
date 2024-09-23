local YellowPageEntrys = {}

RPC.register('phone:getYellowPageEntries', function()
    return true, YellowPageEntrys
end)

RPC.register('phone:addYellowPageEntry', function(pSource, pCid, pFirstName, pLastName, pNumber, pText)
    table.insert(YellowPageEntrys, {
        character = {
            id = pCid,
            first_name = pFirstName,
            last_name = pLastName,
            number = pNumber
        },
        text = pText
    })
    return true, ''
end)

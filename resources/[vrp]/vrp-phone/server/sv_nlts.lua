local NlftsDrivers = {
    {
        src = 1,
        phoneNumber = '1234567890',
        status = 'Available',
        name = 'Madar Kaveh Ro NLTS'
    }
}

function FindNltsDriver(src)
    for k, v in pairs(NlftsDrivers) do
        if v.src == src then
            return k
        end
    end
    return nil
end

RPC.register('vrp-ui:nlts:fetchDrivers', function()
    return true, NlftsDrivers
end)

RPC.register('vrp-ui:nlts:addCharOnDuty', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local char = PlayerData.charinfo
    if not Player then
        return false, NlftsDrivers
    end

    table.insert(NlftsDrivers, {
        src = pSource,
        phoneNumber = char.phone,
        status = 'Available',
        name = char.firstname..' '..char.lastname
    })

    return true, NlftsDrivers
end)

RPC.register('vrp-ui:nlts:removeCharFromDuty', function(pSource)
    local player = FindNltsDriver(pSource)
    if not player then
        return false, NlftsDrivers
    end
    NlftsDrivers[player] = nil
    return true, NlftsDrivers
end)

RPC.register('vrp-ui:nlts:updateDriverStatus', function(pSource, pStatus)
    local player = FindNltsDriver(pSource)
    if not player then
        return false, NlftsDrivers
    end
    NlftsDrivers[player].status = pStatus

    return true, NlftsDrivers
end)
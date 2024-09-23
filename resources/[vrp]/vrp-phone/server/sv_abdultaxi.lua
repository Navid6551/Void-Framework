QBCore = exports['vrp-core']:GetCoreObject()

local AbdultaxiDrivers = {
    {
        src = 1,
        phoneNumber = '1234567890',
        status = 'Available',
        name = 'Madar Kaveh Ro Abdul Taxi'
    }
}

function FindAbdulDriver(src)
    for k, v in pairs(AbdultaxiDrivers) do
        if v.src == src then
            return k
        end
    end
    return nil
end

RPC.register('vrp-ui:abdultaxi:fetchDrivers', function()
    return true, AbdultaxiDrivers
end)

RPC.register('vrp-ui:abdultaxi:addCharOnDuty', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local char = PlayerData.charinfo
    if not Player then
        return false, AbdultaxiDrivers
    end

    table.insert(AbdultaxiDrivers, {
        src = pSource,
        phoneNumber = char.phone,
        status = 'Available',
        name = char.firstname..' '..char.lastname
    })

    return true, AbdultaxiDrivers
end)

RPC.register('vrp-ui:abdultaxi:removeCharFromDuty', function(pSource)
    local player = FindAbdulDriver(pSource)
    if not player then
        return false, AbdultaxiDrivers
    end
    AbdultaxiDrivers[player] = nil
    return true, AbdultaxiDrivers
end)

RPC.register('vrp-ui:abdultaxi:updateDriverStatus', function(pSource, pStatus)
    local player = FindAbdulDriver(pSource)
    if not player then
        return false, AbdultaxiDrivers
    end
    AbdultaxiDrivers[player].status = pStatus

    return true, AbdultaxiDrivers
end)
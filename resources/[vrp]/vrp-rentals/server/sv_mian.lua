local QBCore = exports['vrp-core']:GetCoreObject()

RPC.register('rentals:purchaseVehicle', function(pSource, pData)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if Player.PlayerData.money.cash < pData.price then
        TriggerClientEvent('DoLongHudText', pSource, 'Not enough money', 2)
        return false, 'Not enough money'
    end
    Player.Functions.RemoveMoney('cash', pData.price, 'Purchase rental vehicle')
    return true, ''
end)

RPC.register('vrp:vehicles:rentalSpawn', function(pSource, pModel, pCoords, pHeading)
    local vehicle = exports['vrp-vehicles']:BasicSpawn(pSource, pModel, pCoords, pHeading, 'rental')
    if not vehicle then
        return false
    end
    return vehicle
end)
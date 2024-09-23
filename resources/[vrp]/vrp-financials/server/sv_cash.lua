RegisterNetEvent('vrp-financials:cash:get', function()
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)

    TriggerClientEvent('vrp-financials:cash', src, Player.PlayerData.money.cash)
end)

RPC.register('GetCurrentCash', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then
        return 0
    end
    return Player.PlayerData.money.cash
end)
RegisterNetEvent('loot:useItem', function(pItem)
    local src = source
    local data = Config.itemList[pItem]
    if not data then
        return
    end
    for k, v in pairs(data.items) do
        TriggerClientEvent('player:receiveItem', src, k, tonumber(v))
    end
    if data.notification then
        TriggerClientEvent('DoLongHudText', src, data.notification)
    end
end)
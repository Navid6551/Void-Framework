QBCore = exports['vrp-core']:GetCoreObject()

RPC.register('GetDefaultBankAccount', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then
        return false, 0
    end
    return true, tonumber(Player.PlayerData.charinfo.account)
end)

RPC.register('vrp-ui:getCharacterDetails', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local licenses = Player.PlayerData.metadata.licences

    userlicenses = {}
    for k,v in pairs(licenses) do
        if v then
            userlicenses[#userlicenses+1] = {
                name = k.." License",
                status = v
            }
        end
    end

    return {
        bank = Player.PlayerData.money.bank,
        cash = Player.PlayerData.money.cash,
        casino = Player.PlayerData.money.chips,
        jobs = {
            primary = "Unemployed",
            secondary = "None"
        },
        licenses = userlicenses
    }
end)
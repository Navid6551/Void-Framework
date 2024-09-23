QBCore = exports['vrp-core']:GetCoreObject()

RPC.register('GetAccounts', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then
        return {}
    end
    local Business = exports['vrp-business']:GetPlayerBusinesses(tonumber(Player.PlayerData.citizenid))
    local accounts = {
        {
            owner_first_name = Player.PlayerData.charinfo.firstname,
            owner_last_name = Player.PlayerData.charinfo.lastname,
            name = 'Personal Account',
            type = 'Default',
            type_id = 1,
            id = tonumber(Player.PlayerData.charinfo.account),
            balance = Player.PlayerData.money.bank,
            is_frozen = false,
            is_monitored = false,
            cid = Player.PlayerData.citizenid,
            access= {
                'deposit',
                'withdraw',
                'transfer',
                'transactions',
                'balance',
            },
        },
    }
    -- view_logs
    for k, v in pairs(Business) do
        local hasPerm = exports['vrp-business']:hasPermission(pSource, v.code, 'view_logs')
        if hasPerm then
            table.insert(accounts, {
                owner_first_name = '',
                owner_last_name = '',
                name = 'Personal Account',
                type = 'Business',
                type_id = 3,
                id = v.bank_account_id,
                balance = v.bank_balance,
                is_frozen = false,
                is_monitored = false,
                cid = v.id,
                access= {
                    'deposit',
                    'withdraw',
                    'transfer',
                    'transactions',
                    'balance',
                },
            })
        end
    end

    return accounts
end)

RPC.register('GetAccountTypes', function(pSource)
    return {
        {
            id = 1,
            name = 'Default',
        },
        {
            id = 2,
            name = 'Personal',
            public = true,
        },
        {
            id = 3,
            name = 'Business',
        },
        {
            id = 4,
            name = 'Savings',
            public = true,
        },
    }
end)

RPC.register('GetCharactersWithAccess', function(pSource, pId)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if pId == tonumber(Player.PlayerData.charinfo.account) then
        return {
            'deposit',
            'withdraw',
            'transfer',
            'transactions',
            'balance',
        }
    end

    return {}
end)

RPC.register('GetCurrentBank', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then
        return false, 0
    end

    return true, Player.PlayerData.money.bank
end)

RPC.register('GetCurrentCasino', function()
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then
        return 0
    end

    return Player.PlayerData.money.casino
end)
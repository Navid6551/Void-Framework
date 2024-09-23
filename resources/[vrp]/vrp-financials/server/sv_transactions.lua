RPC.register('GetTransactionLogs', function(pSource, pAccountId, pType)
    local data = Await(SQL.execute("SELECT * FROM bank_logs WHERE to_account_id = @accountId OR from_account_id = @accountId ORDER BY shitId DESC", {
        ["accountId"] = pAccountId
    }))

    return true, data
end)

RPC.register('BankDeposit', function(pSource, pAccountId, pAmount, pComent)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local accountId = tonumber(Player.PlayerData.charinfo.account)
    local pName = Player.PlayerData.charinfo.firstname..' '..Player.PlayerData.charinfo.lastname
    if accountId == pAccountId then
        if Player.PlayerData.money.cash < pAmount then
            return false, 'You dont have that much cash'
        end
        Player.Functions.RemoveMoney('cash', pAmount, 'Deposited To Bank')
        Player.Functions.AddMoney('bank', pAmount, 'Deposited To Bank')
        Await(SQL.execute(
            "INSERT INTO bank_logs (id, direction, amount, type, date, comment, to_account_id, to_account_name, to_civ_name, from_account_id, from_account_name) VALUES (@id, @direction, @amount, @type, @date, @comment, @to_account_id, @to_account_name, @to_civ_name, @from_account_id, @from_account_name)", 
            {
                ["id"] = uuid(),
                ["direction"] = 'in',
                ["amount"] = pAmount,
                ["type"] = 'deposit',
                ['date'] = os.time(),
                ['comment'] = pComent,
                ['to_account_id'] = pAccountId,
                ['to_civ_name'] = pName,
                ['to_account_name'] ='Personal Account',
                ['from_account_id'] = pAccountId,
                ['from_account_name'] = 'Personal Account',
            }
        ))
        return true, ''
    else
        local business = exports['vrp-business']:GetBusinessByBankId(pAccountId)
        if not business then
            return false, 'Business do not exist'
        end
        if Player.PlayerData.money.cash < pAmount then
            return false, 'You dont have that much cash'
        end
        Player.Functions.RemoveMoney('cash', pAmount, 'Deposited To Business')
        Await(SQL.execute(
            "INSERT INTO bank_logs (id, direction, amount, type, date, comment, to_account_id, to_civ_name, from_account_id, from_account_name, from_civ_name) VALUES (@id, @direction, @amount, @type, @date, @comment, @to_account_id, @to_civ_name, @from_account_id, @from_account_name, @from_civ_name)", 
            {
                ["id"] = uuid(),
                ["direction"] = 'in',
                ["amount"] = pAmount,
                ["type"] = 'deposit',
                ['date'] = os.time(),
                ['comment'] = pComent,
                ['to_account_id'] = pAccountId,
                ['to_civ_name'] = business.name,
                ['from_account_id'] = accountId,
                ['from_account_name'] = pName,
                ['from_civ_name'] = pName
            }
        ))
        return exports['vrp-business']:AddBusinessBalance(pAccountId, pAmount)
    end
end)

RPC.register('BankWithdraw', function(pSource, pAccountId, pAmount, pComent)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local accountId = tonumber(Player.PlayerData.charinfo.account)
    local pName = Player.PlayerData.charinfo.firstname..' '..Player.PlayerData.charinfo.lastname
    if accountId == pAccountId then
        if Player.PlayerData.money.bank < pAmount then
            return false, 'You dont have that much money'
        end
        Player.Functions.RemoveMoney('bank', pAmount, 'Withdraw from bank')
        Player.Functions.AddMoney('cash', pAmount, 'Withdraw from bank')
        Await(SQL.execute(
            "INSERT INTO bank_logs (id, direction, amount, type, date, comment, to_account_id, to_account_name, from_civ_name, from_account_id, from_account_name) VALUES (@id, @direction, @amount, @type, @date, @comment, @to_account_id, @to_account_name, @from_civ_name, @from_account_id, @from_account_name)", 
            {
                ["id"] = uuid(),
                ["direction"] = 'out',
                ["amount"] = pAmount,
                ["type"] = 'withdraw',
                ['date'] = os.time(),
                ['comment'] = pComent,
                ['to_account_id'] = pAccountId,
                ['from_civ_name'] = pName,
                ['to_account_name'] ='Personal Account',
                ['from_account_id'] = pAccountId,
                ['from_account_name'] = 'Personal Account',
            }
        ))
        return true, ''
    else
        local business = exports['vrp-business']:GetBusinessByBankId(pAccountId)
        if not business then
            return false, 'Business do not exist'
        end
        if Player.PlayerData.money.bank < pAmount then
            return false, 'You dont have that much money'
        end
        Player.Functions.AddMoney('cash', pAmount, 'Deposited To Business')
        Await(SQL.execute(
            "INSERT INTO bank_logs (id, direction, amount, type, date, comment, to_account_id, from_civ_name, from_account_id, from_account_name, to_account_name, to_civ_name) VALUES (@id, @direction, @amount, @type, @date, @comment, @to_account_id, @from_civ_name, @from_account_id, @from_account_name, @to_account_name, @to_civ_name)", 
            {
                ["id"] = uuid(),
                ["direction"] = 'out',
                ["amount"] = pAmount,
                ["type"] = 'withdraw',
                ['date'] = os.time(),
                ['comment'] = pComent,
                ['to_account_id'] = accountId,
                ['to_civ_name'] = pName,
                ['to_account_name'] = 'Personal Account',
                ['from_account_id'] = pAccountId,
                ['from_account_name'] = business.name,
                ['from_civ_name'] = business.name,
            }
        ))
        return exports['vrp-business']:AddBusinessBalance(pAccountId, pAmount, true)
    end
end)
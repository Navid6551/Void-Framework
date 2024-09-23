-- GET TRANSACTIONS
RegisterUICallback("vrp-ui:getAccountTransactions", function(data, cb)
    local accountId, transactionType = data.account_id, data.type
    local success, transactions = RPC.execute("GetTransactionLogs", accountId, transactionType)
    cb({ data = transactions, meta = { ok = success, message = 'done' } })
end)

RegisterUICallback("vrp-ui:accountDeposit", function(data, cb)
    local accountId, amount, comment = data.account_id, data.amount, data.comment
    local success, error = RPC.execute("BankDeposit", accountId, tonumber(amount), comment)
    cb({ data = {}, meta = { ok = success, message = (not success and error or 'done') } })
end)

RegisterUICallback("vrp-ui:accountWithdraw", function(data, cb)
    local accountId, amount, comment = data.account_id, data.amount, data.comment
    local success, error = RPC.execute("BankWithdraw", accountId, tonumber(amount), comment)
    cb({ data = {}, meta = { ok = success, message = (not success and error or 'done') } })
end)

RegisterUICallback("vrp-ui:accountTransfer", function(data, cb)
    local sourceAccountId, targetAccountId, targetStateId, amount, comment  = data.account_id, data.target_account_id, data.target_state_id, data.amount, data.comment
    local transferType, targetPhoneNumber = data.type or 'transfer', data.target_phone_number
    local result = RPC.execute("DoAccountTransfer", sourceAccountId, targetAccountId, targetStateId, amount, comment, transferType, targetPhoneNumber)
    local success, error = result[1], result[2]
    cb({ data = {}, meta = { ok = success, message = (not success and error or 'done') } })
end)

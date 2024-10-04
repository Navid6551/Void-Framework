AddEventHandler('reviveGranted', function(pUser)
    TriggerClientEvent('reviveFunction', pUser, false)
end)
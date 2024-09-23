RegisterNetEvent('vehicle:poptire', function(pSource, pNetId, pTire)
    TriggerServerEvent('vehicle:poptire', pSource, pNetId, pTire)
end)
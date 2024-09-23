RegisterNetEvent('vrp-vehicleSync:updateSyncState', function(pNetId, pSyncState)
    TriggerClientEvent('vrp-vehicleSync:updateSyncState', -1, pNetId, pSyncState)
end)
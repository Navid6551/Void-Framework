RegisterNetEvent('vrp-vehicleSync:updateSirenState', function(netId, sirenState, sirenPreset)
    TriggerClientEvent('vrp-vehicleSync:updateSirenState', -1, netId, sirenState, sirenPreset)
end)
RegisterServerEvent("vrp:flags:set")
AddEventHandler("vrp:flags:set", function(callID, netID, flagType, flags)
    local src = source
    local entity = NetworkGetEntityFromNetworkId(netID)
    local eType = GetEntityType(entity)
    TriggerClientEvent("vrp:flags:set", -1, netID, eType, flagType, flags)
end)

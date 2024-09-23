local instances = {}

RegisterServerEvent("Instance:addToInstance", function(genID)
    local src = source
    instances[src] = true
    TriggerClientEvent("Instance:setCurrentInstance", -1, genID, instances)
end)

RegisterServerEvent("Instance:removeFromInstance", function(genID)
    local src = source
    instances[src] = nil
    TriggerClientEvent("Instance:setCurrentInstance", -1, genID, instances)
end)
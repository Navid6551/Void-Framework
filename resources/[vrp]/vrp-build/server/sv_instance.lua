local instances = {}

RegisterServerEvent("Instance:addToInstance", function(genID)
    local src = source
    instances[src] = true
    TriggerClientEvent("Instance:setCurrentInstance", src, genID, instances)
end)

RegisterServerEvent("Instance:removeFromInstance", function(genID)
    local src = source
    instances[src] = nil
    TriggerClientEvent("Instance:setCurrentInstance", src, genID, instances)
end)
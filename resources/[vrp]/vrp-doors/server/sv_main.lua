local doors = {}
local elevators = {}

RPC.register('vrp-doors:getHackedAccess', function()
    return {}
end)

RPC.register('vrp-doors:charHasMrpdKeys', function()
    return false
end)

RegisterNetEvent('vrp-doors:request-lock-state', function()
    local src = source
    TriggerClientEvent('vrp-doors:initial-lock-state', src, doors)
end)

RegisterNetEvent('vrp-doors:change-lock-state', function(pDoorId, pDoorLockState)
    if doors[pDoorId] then
        doors[pDoorId].lock = pDoorLockState
        TriggerClientEvent('vrp-doors:change-lock-state', -1, pDoorId, pDoorLockState)
    end
end)


Citizen.CreateThread(function()
    for _,door in ipairs(DOOR_CONFIG) do
        doors[#doors + 1] = door
    end
end)
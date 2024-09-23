local ActiveAreaEvents = {}

function TriggerActiveAreaEvent(event, area, ...)
    local id = #ActiveAreaEvents + 1
    local data = {
        id = id,
        area = area,
        event = event,
        params = table.pack(...)
    }
    ActiveAreaEvents[id] = data
    TriggerClientEvent('vrp:sync:active:area:start', -1, data)
    return id
end exports('TriggerActiveAreaEvent', TriggerActiveAreaEvent)

function CancelActiveAreaEvent(pId)
    if not ActiveAreaEvents[pId] then
        return
    end
    ActiveAreaEvents[pId] = nil
    TriggerClientEvent('vrp:sync:active:area:stop', -1, pId)
end exports('CancelActiveAreaEvent', CancelActiveAreaEvent)

RPC.register('vrp:sync:getActiveEvents', function()
    return ActiveAreaEvents
end)
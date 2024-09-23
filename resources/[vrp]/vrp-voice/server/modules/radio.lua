local RadioChannels = {}

function GetPlayerInRadio(pSource, pChanel)
    if not RadioChannels[pChanel] then return nil, nil end
    for k, v in pairs(RadioChannels[pChanel]) do
        if tonumber(v) == tonumber(pSource) then
            return k, v
        end
    end
    return nil, nil
end

function GetPlayerInRadios(pSource)
    for k, v in pairs(RadioChannels) do
        local subs = RadioChannels[k]
        for u, i in pairs(subs) do
            if tonumber(i) == tonumber(pSource) then
                return k, u, i
            end
        end
    end
    return nil, nil
end

function TriggerEventForChanel(pChanel, pEvent, ...)
    for k, v in pairs(RadioChannels[pChanel]) do
        TriggerClientEvent(pEvent, v, ...)
    end
end

function AddPlayerToRadio(pSource, pChanel)
    if GetPlayerInRadio(pSource, pChanel) then
        return true
    end
    if RadioChannels[pChanel] == nil then
        RadioChannels[pChanel] = {}
    end

    TriggerEventForChanel(pChanel, "vrp:voice:radio:added", pChanel, pSource)

    table.insert(RadioChannels[pChanel], pSource)
    print(json.encode(RadioChannels[pChanel]))
    TriggerClientEvent('vrp:voice:radio:connect', pSource, pChanel, RadioChannels[pChanel])

    return true
end

function RemovePlayerFromRadio(pSource, pChanel)
    local pIdex = GetPlayerInRadio(pSource, pChanel)
    if not pIdex then return false end
    table.remove(RadioChannels[pChanel], pIdex)

    TriggerEventForChanel(pChanel, "vrp:voice:radio:removed", pChanel, pSource)

    TriggerClientEvent('vrp:voice:radio:disconnect', pSource, pChanel)
    return true
end

RPC.register('vrp-voice:addPlayerToRadio', function(pSource, pChanel)
    if pChanel > 0 then
        local playerRadio = GetPlayerInRadios(pSource)
        if playerRadio then
            RemovePlayerFromRadio(pSource, playerRadio)
        end
        Wait(100)
        return AddPlayerToRadio(pSource, pChanel)
    end
    return RemovePlayerFromRadio(pSource, pChanel)
end)

AddEventHandler("playerDropped", function(pSource)
    local playerRadio = GetPlayerInRadios(pSource)
    print('playerDropped', playerRadio)
    if not playerRadio then return end
    RemovePlayerFromRadio(pSource, playerRadio)
end)
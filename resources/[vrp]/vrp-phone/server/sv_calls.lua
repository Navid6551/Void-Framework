ActiveCalls = {}
local muteCalls = {}

function PromiseTimeout(time)
    local timeout = promise:new()

    Citizen.SetTimeout(time or 1000, function ()
        timeout:resolve(false)
    end)

    return timeout
end

function startPhoneCall(pSource, pCallNumber, pTargetNumber)
    local call = {}
    local targetD = QBCore.Functions.GetPlayerByPhone(pTargetNumber)
    if not targetD then
        return
    end
    local targetId = targetD.PlayerData.source

    if tonumber(pCallNumber) == tonumber(pTargetNumber) then
        TriggerClientEvent("phone:call:inactive", pSource, pTargetNumber, nil, '')
        return
    end

    if ActiveCalls then
        for k,v in pairs(ActiveCalls) do
            if tonumber(pTargetNumber) == tonumber(v.caller.number) then
                TriggerClientEvent("phone:call:inactive", pSource, pTargetNumber, nil, '')
                return
            end

            if tonumber(pTargetNumber) == tonumber(v.target.number) then
                TriggerClientEvent("phone:call:inactive", pSource, pTargetNumber, nil, '')
                return
            end
        end
    end

    -- call state [ completed = 0, establishing = 1, active = 2 ]
    call.state = 1

    --call participants
    call.caller = { id = pSource, number = pCallNumber }
    call.target = { id = targetId, number = pTargetNumber }


    --promises for handling connection and disconnection
    call.establish = promise:new()
    call.completed = promise:new()


    local callId = registerCallData(call)
    

    -- do call receive logic here
    
    if targetId ~= nil then -- check payphone
        TriggerClientEvent("phone:call:receive", call.target.id, call.caller.number, callId)
    end

    if pSource ~= nil then
        TriggerClientEvent("phone:call:dialing", call.caller.id, call.target.number, callId)
    end
    call.target.soundId = triggerAudio(call.target.id, 2, 3.0, 'ringing', 0.5, 'playLooped')
    call.caller.soundId = triggerAudio(call.caller.id, 2, 0.2, 'dialing', 0.5, 'playLooped')
    local timeout = 30000

    promise.first({ call.establish, call.completed }):next(function (establish)
        exports["vrp-infinity"]:CancelActiveAreaEvent(call.target.soundId)
        exports["vrp-infinity"]:CancelActiveAreaEvent(call.caller.soundId)
        if establish then
            establishPhoneCall(callId)
        else
            completePhoneCall(callId)
        end
    end)
end

function establishPhoneCall(callId)
    local call = ActiveCalls[callId]

    if call then
        call.state = 2
        if call.target.id ~= nil then
            TriggerClientEvent("phone:call:in-progress", call.target.id, call.caller.number, callId)
        end
        if call.caller.id ~= nil then
            TriggerClientEvent("phone:call:in-progress", call.caller.id, call.target.number, callId)
        end

        TriggerEvent('vrp:voice:server:phone:startCall', callId, call.caller.id, call.target.id)

        call.completed:next(function()
            completePhoneCall(callId)
        end)
    end
end

function completePhoneCall(callId)
    local call = ActiveCalls[callId]

    if call then 
        call.state = 0
        if call.target.id ~= nil then
            TriggerClientEvent("phone:call:inactive", call.target.id, call.caller.number, callId, '')
        end
        if call.caller.id ~= nil then
            TriggerClientEvent("phone:call:inactive", call.caller.id, call.target.number, callId, '')
        end
        --stop the mumble call 
        TriggerEvent('vrp:voice:server:phone:endCall', callId, call.caller.id, call.target.id)
        
        clearCallData(callId)
    end
end

function acceptPhoneCall(pCallId)
    local call = ActiveCalls[pCallId]
    if call and call.state == 1 then
        call.establish:resolve(true)
    elseif call and call.state == 0 then
        return false, 'Caller Hung up'
    elseif not call then
        return false, 'Invalid Call ID'
    end
    return true, 'Call Established'
end

function endPhoneCall(pCallId)
    local call = ActiveCalls[pCallId]
    if call and call.state == 1 then
        call.completed:resolve(false)
    elseif call and call.state == 2 then
        call.completed:resolve(true)
    elseif not call then
        return false, 'Invalid Call ID'
    end
    return true, 'Call Completed'
end

function registerCallData(callData)
    local callId = #ActiveCalls +1
    ActiveCalls[callId] = callData 
    return callId
end

function clearCallData(callId)
    --Citizen.SetTimeout(30 * 1000, function ()
        ActiveCalls[callId] = nil
    --end)
end

function triggerAudio(pPlayerId, pType, pRadius, ...)
    if muteCalls[pPlayerId] then
        return 0
    end

    local Area = {
        type = pType, -- [ 1 = coords, 2 = player, 3 = entity ]
        target = pPlayerId, -- [ vector3 or net handle]
        radius = pRadius
    }

    local Event = {
        server = false, -- set to false if we don't want to trigger server events
        inEvent = 'InteractSound_CL:PlayOnOne',
        outEvent = 'InteractSound_CL:StopLooped'
    }

    return exports["vrp-infinity"]:TriggerActiveAreaEvent(Event, Area, ...)
end

RPC.register("phone:callStart", function(pSource, pTargetNumber)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local pCallNumber = Player.PlayerData.charinfo.phone

    startPhoneCall(pSource, pCallNumber, pTargetNumber)
end)

RPC.register("phone:callAccept", function(pSource, pCallId)
    acceptPhoneCall(pCallId)
end)

RPC.register("phone:callEnd", function(pSource, pCallId)
    endPhoneCall(pCallId)
end)

RPC.register('vrp-phone:silenceCallsForServerId', function(pSource)
    if not muteCalls[pSource] then
        muteCalls[pSource] = true
        print('ya allah adding')
        return true
    end
    print('ya allah removeing')
    muteCalls[pSource] = nil
    return true
end)
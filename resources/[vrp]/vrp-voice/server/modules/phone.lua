function startCall(pCallId, callerID, receiverID)
    TriggerClientEvent("vrp:voice:phone:call:start", callerID, receiverID, pCallId)
    TriggerClientEvent("vrp:voice:phone:call:start", receiverID, callerID, pCallId)
end

function endCall(pCallId, callerID, receiverID)
    TriggerClientEvent("vrp:voice:phone:call:end", callerID, receiverID, pCallId)
    TriggerClientEvent("vrp:voice:phone:call:end", receiverID, callerID, pCallId)
end

RegisterServerEvent("vrp:voice:server:phone:startCall")
AddEventHandler("vrp:voice:server:phone:startCall", startCall)

RegisterServerEvent("vrp:voice:server:phone:endCall")
AddEventHandler("vrp:voice:server:phone:endCall", endCall)
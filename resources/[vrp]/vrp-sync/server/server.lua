local readyPlayers = {}

RegisterServerEvent("vrp:sync:player:ready")
AddEventHandler("vrp:sync:player:ready",function()
    local src = source

    readyPlayers[src] = true
end)

RegisterServerEvent("sync:request")
AddEventHandler("sync:request", function(pResource, pNative, pSource, pNetId, ...)
    if readyPlayers[pSource] then
        TriggerClientEvent("sync:execute", pSource, pNative, pNetId, ...)
    end
end)

RegisterServerEvent("sync:execute:aborted")
AddEventHandler("sync:execute:aborted", function(native, netID)
end)

RegisterServerEvent("vrp-sync:executeSyncNative")
AddEventHandler("vrp-sync:executeSyncNative", function(native, netEntity, options, args)
    TriggerClientEvent("vrp-sync:clientExecuteSyncNative", -1, native, netEntity, options, args)
end)
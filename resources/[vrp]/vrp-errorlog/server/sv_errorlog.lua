RegisterNetEvent("rpc:server:timeout")
AddEventHandler("rpc:server:timeout",function(origin, name)
    print("RPC [Timeout]",origin, name)
end)

RegisterNetEvent("rpc:client:error")
AddEventHandler("rpc:client:error",function(Resource, origin, name, error)
    print("RPC [Error]", Resource, origin, name, error)
end)
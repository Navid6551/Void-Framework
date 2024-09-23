function IsPlayerActive(pServerId)
    return exports['vrp-infinity']:IsPlayerActive(pServerId)
end

function DoesPlayerExist(pServerId)
    return exports['vrp-infinity']:DoesPlayerExist(pServerId)
end

function GetPlayerCoords(pServerId)
    return exports['vrp-infinity']:GetPlayerCoords(pServerId)
end

function GetNetworkedCoords(pType, pNetId)
    return exports['vrp-infinity']:GetNetworkedCoords(pType, pNetId)
end

function GetLocalEntity(pType, pNetId)
    return exports['vrp-infinity']:GetLocalEntity(pType, pNetId)
end
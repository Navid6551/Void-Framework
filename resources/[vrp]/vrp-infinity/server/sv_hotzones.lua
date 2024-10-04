local HotZones = {}

RegisterNetEvent("vrp-infinity:hotzones:requestList")
AddEventHandler("vrp-infinity:hotzones:requestList", function()
    local src = source

    TriggerClientEvent("vrp-infinity:hotzones:updateList", src, HotZones)
end)

RegisterNetEvent("vrp-infinity:hotzones:enteredZone")
AddEventHandler("vrp-infinity:hotzones:enteredZone", function(zoneId)
    local src = source
    HotZones[zoneId] = src
end)

RegisterNetEvent("vrp-infinity:hotzones:exitZone")
AddEventHandler("vrp-infinity:hotzones:exitZone", function(zoneId)
    local src = source
    HotZones[zoneId] = nil
end)
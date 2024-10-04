QBCore = exports['vrp-core']:GetCoreObject()

RPC.register("housingShouldSetZoneLocations", function(pSource)
    return #Housing.zone == 0
end)

RPC.register("setZoneLocations", function(pSource, pZones)
    Housing.zone = pZones
end)

RPC.register('getCurrentLocks', function()
    return Housing.currentHousingLocks
end)

RPC.register('getCurrentLockdown', function()
    return Housing.currentHousingLockdown
end)

RPC.register('getBuisnessLocations', function()
    return Housing.BuisnessLocations
end)

RPC.register('getCostOfProperty', function(pSource, pPropertyId)
    if not Housing.info[pPropertyId] then
        return 999999
    end

    return Housing.info[pPropertyId].cost or 100000
end)

RPC.register("unlockProperty", function(src, pHouseId)
    if Housing.currentHousingLocks[pHouseId] ~= nil and Housing.currentHousingLocks[pHouseId] == false then
        return false, Housing.currentHousingLocks
    end

    Housing.currentHousingLocks[pHouseId] = false

    return true, Housing.currentHousingLocks
end)

RPC.register("lockProperty", function(src, pHouseId)
    if Housing.currentHousingLocks[pHouseId] == nil then
        return false, Housing.currentHousingLocks
    end

    Housing.currentHousingLocks[pHouseId] = nil

    return true, Housing.currentHousingLocks
end)

RPC.register('housing:getCurrentHousingList', function()
    return Housing.info
end)

RPC.register('property:getOwnerRaw', function(pSource, pPropertyId)
    local house = getHouseById(pPropertyId)
    if not house then
        return false
    end

    if not house.housingOwnedBy then
        return false
    end

    return house.housingOwnedBy
end)

RPC.register("getCurrentSelected", function(pSource, pPropertyId)
    local _result = getHouseById(pPropertyId)

    local isResult = false
    if _result then
        isResult = true
    end

    local housingInformation = {}
    if _result.housingInformation then
        housingInformation = _result.housingInformation
        for k, v in pairs(_result.housingInformation) do
            if k == "backdoor_coordinates" then
                for k2, v2 in pairs(v) do
                    housingInformation[k][k2] = vector3(v2.x, v2.y, v2.z)
                end
            elseif k == "garage_coordinates" then
                if v.w then
                    housingInformation[k] = vector4(v.x, v.y, v.z, v.w)
                else
                    housingInformation[k] = vector3(v.x, v.y, v.z)
                end
            else
                housingInformation[k] = vector3(v.x, v.y, v.z)
            end
        end
    end

    local currentHousingLocks = Housing.currentHousingLocks

    -- local keys = currentKeys(pSource, true)
    -- for k, v in pairs(keys) do
    --     currentHousingLocks[k] = false
    -- end

    local robTargets = {}
    if Housing.housingRobTargets[pPropertyId] ~= nil then
        robTargets = Housing.housingRobTargets[pPropertyId]
    end

    local robLocations = {}
    if Housing.robPosLocations[pPropertyId] ~= nil then
        robLocations = Housing.robPosLocations[pPropertyId]
    end

    local alarm = false
    if Housing.alarm[pPropertyId] ~= nil then
        alarm = Housing.alarm[pPropertyId]
    end

    return true, housingInformation, currentHousingLocks, isResult, Housing.currentHousingLockdown, Housing.housingBeingRobbed, robTargets, robLocations, alarm, {}
end)

RPC.register("updateCurrentSelected", function(src, pPropertyId, pInformation, pOrigin)
    if pInformation["id"] then
        pInformation["id"] = nil
    end

    local affectedRows = UpdateHouseFromDb(pPropertyId, 'information', json.encode(pInformation)) 

    if not affectedRows then
        return false
    end

    local info = pInformation
    local name = Housing.info[pPropertyId]["street"]

    local data = {
        ["houseid"] = pPropertyId,
        ["type"] = "car",
        ["pos"] = info.garage_coordinates,
        ["distance"] = 50,
        ["spaces"] = {info.garage_coordinates}
    }

    -- exports["caue-vehicles"]:setGarage(name, data, nil, false)

    return true
end)

RPC.register('getCurrentOwned', function(pSource)
    return getCurrentOwned(pSource)
end)
RPC.register('currentKeys', function(pSource)
    return currentKeys(pSource)
end)
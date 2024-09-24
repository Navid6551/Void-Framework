local QBCore = exports['vrp-core']:GetCoreObject()
local calls = {
    -- {
    --     callSign = nil,
    --     ctxId = 1,
    --     dispatchCode = '10-30A',
    --     dispatchMessage = 'A homie dead RIP',
    --     firstColor = nil,
    --     flagged_at = nil,
    --     flagged_by = nil,
    --     flagged_reason = nil,
    --     extraData = nil,
    --     heading = nil,
    --     id = 1,
    --     location = nil,
    --     model = nil,
    --     origin = {
    --         x = 1,
    --         y = 2,
    --         z = 3
    --     },
    --     plate = nil,
    --     secondColor = nil,
    --     senderId = nil,
    --     senderName = nil,
    --     senderNumber = nil,
    --     text = nil,
    --     timestamp = 'Timestamp',
    --     title = nil,
    --     priotiy = 1
    -- },
    -- {
    --     callSign = nil,
    --     ctxId = 2,
    --     dispatchCode = '10-30A',
    --     dispatchMessage = 'A homie dead RIP',
    --     firstColor = nil,
    --     flagged_at = nil,
    --     flagged_by = nil,
    --     flagged_reason = nil,
    --     extraData = nil,
    --     heading = nil,
    --     id = 1,
    --     location = nil,
    --     model = nil,
    --     origin = {
    --         x = 1,
    --         y = 2,
    --         z = 3
    --     },
    --     plate = nil,
    --     secondColor = nil,
    --     senderId = nil,
    --     senderName = nil,
    --     senderNumber = nil,
    --     text = nil,
    --     timestamp = 'Timestamp',
    --     title = nil,
    --     priotiy = 1
    -- },
    -- {
    --     callSign = nil,
    --     ctxId = 3,
    --     dispatchCode = '10-30A',
    --     dispatchMessage = 'A homie dead RIP',
    --     firstColor = nil,
    --     flagged_at = nil,
    --     flagged_by = nil,
    --     flagged_reason = nil,
    --     extraData = nil,
    --     heading = nil,
    --     id = 1,
    --     location = nil,
    --     model = nil,
    --     origin = {
    --         x = 1,
    --         y = 2,
    --         z = 3
    --     },
    --     plate = nil,
    --     secondColor = nil,
    --     senderId = nil,
    --     senderName = nil,
    --     senderNumber = nil,
    --     text = nil,
    --     timestamp = os.time(),
    --     title = nil,
    --     priotiy = 1
    -- },
    -- {
    --     callSign = nil,
    --     ctxId = 4,
    --     dispatchCode = '10-30A',
    --     dispatchMessage = 'A homie dead RIP',
    --     firstColor = nil,
    --     flagged_at = nil,
    --     flagged_by = nil,
    --     flagged_reason = nil,
    --     extraData = nil,
    --     heading = nil,
    --     id = 1,
    --     location = nil,
    --     model = nil,
    --     origin = {
    --         x = 1,
    --         y = 2,
    --         z = 3
    --     },
    --     plate = nil,
    --     secondColor = nil,
    --     senderId = nil,
    --     senderName = nil,
    --     senderNumber = nil,
    --     text = nil,
    --     timestamp = 'Timestamp',
    --     title = nil,
    --     priotiy = 1
    -- },
    -- {
    --     callSign = nil,
    --     ctxId = 5,
    --     dispatchCode = '10-30A',
    --     dispatchMessage = 'A homie dead RIP',
    --     firstColor = nil,
    --     flagged_at = nil,
    --     flagged_by = nil,
    --     flagged_reason = nil,
    --     extraData = nil,
    --     heading = nil,
    --     id = 1,
    --     location = nil,
    --     model = nil,
    --     origin = {
    --         x = 1,
    --         y = 2,
    --         z = 3
    --     },
    --     plate = nil,
    --     secondColor = nil,
    --     senderId = nil,
    --     senderName = nil,
    --     senderNumber = nil,
    --     text = nil,
    --     timestamp = 'Timestamp',
    --     title = nil,
    --     priotiy = 1
    -- }
}
local pings = {
    -- {
    --     callSign = nil,
    --     ctxId = 1,
    --     dispatchCode = '10-30A',
    --     dispatchMessage = 'A homie dead RIP',
    --     firstColor = nil,
    --     flagged_at = nil,
    --     flagged_by = nil,
    --     flagged_reason = nil,
    --     extraData = nil,
    --     heading = nil,
    --     id = 1,
    --     location = nil,
    --     model = nil,
    --     origin = {
    --         x = 1,
    --         y = 2,
    --         z = 3
    --     },
    --     plate = nil,
    --     secondColor = nil,
    --     senderId = nil,
    --     senderName = nil,
    --     senderNumber = nil,
    --     text = nil,
    --     timestamp = os.time(),
    --     title = nil,
    --     priotiy = 1
    -- }
}
local units = {
    -- {
    --     callSign = '205',
    --     name = 'Jackie Snow',
    --     attachedTo = nil,
    --     job = 'police',
    --     vehicle = 'car',
    --     status = '10-8'
    -- },
    -- {
    --     callSign = '215',
    --     name = 'Tony Andrews',
    --     attachedTo = nil,
    --     job = 'police',
    --     vehicle = 'heli',
    --     status = '10-7'
    -- },
    -- {
    --     callSign = '669',
    --     name = 'Francis J Francer',
    --     attachedTo = '205',
    --     job = 'police',
    --     vehicle = 'car',
    --     status = '10-8'
    -- },
    -- {
    --     callSign = 'L-1',
    --     name = 'Weebs R Us',
    --     attachedTo = nil,
    --     job = 'ems',
    --     vehicle = 'car',
    --     status = '10-8'
    -- }
}
local unitAssignments = {
    -- [205] = 1,
}

function TriggerEventForUnits(event, ...)
    for k, v in pairs(units) do
        TriggerClientEvent(event, v.serverId, ...)
    end
end

function GetUnitById(src)
    for k, v in pairs(units) do
        if v.serverId == src then
            return v, k
        end
    end
    return nil, 0
end

RPC.register('vrp-dispatch:getDispatchData', function(pSource)
    TriggerClientEvent('vrp-dispatch:updateUnitCoords', pSource, units)
    return {
        calls = calls,
        pings = pings,
        units = units,
        unitAssignments = {},
    }
end)

RPC.register('vrp-dispatch:getDispatchersOnDuty', function()
    return 0
end)

RPC.register('vrp-dispatch:getDispatchUnits', function()
    return units
end)

AddEventHandler('vrp-jobmanager:playerBecameJob', function(pSource, pJob)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local ped = GetPlayerPed(pSource)
    local unit = GetUnitById(pSource)
    if not Config.AllowedJobs[pJob] then
        return
    end

    if unit then
        return
    end
    
    table.insert(units, {
        serverId = pSource,
        coords = GetEntityCoords(ped),
        callSign = Player.PlayerData.metadata.callsign,
        name = Player.PlayerData.charinfo.firstname..' '..Player.PlayerData.charinfo.lastname,
        attachedTo = nil,
        job = pJob,
        vehicle = 'car',
        status = '10-8'
    })
    TriggerEventForUnits('vrp-dispatch:updateUnits', units)
    TriggerEventForUnits('vrp-dispatch:updateUnitCoords', units)
end)

RegisterCommand('AddDispatchPing', function(pSource, pArgs)
    local ped = GetPlayerPed(pSource)
    local data  = {
        callSign = nil,
        ctxId = 1,
        dispatchCode = '10-30A',
        dispatchMessage = pArgs[1],
        firstColor = nil,
        flagged_at = nil,
        flagged_by = nil,
        flagged_reason = nil,
        extraData = nil,
        heading = nil,
        id = 1,
        location = nil,
        model = nil,
        origin = GetEntityCoords(ped),
        plate = nil,
        secondColor = nil,
        senderId = nil,
        senderName = nil,
        senderNumber = nil,
        text = nil,
        timestamp = os.time(),
        title = nil,
        priotiy = 1,
        getStreetCord = true,
        recipientList = {
            ['police'] = true
        }
    }
    table.insert(pings, data)
    TriggerEventForUnits('dispatch:clNotify', data)
    TriggerEventForUnits('vrp-dispatch:updateDispatch', 'addPing', data)
end)

RegisterNetEvent('dispatch:svNotify', function(pData)
    local pushData = pData
    pushData.id = #pings + 1
    pushData.ctxId = #pings + 1
    local codeData = Config.CallsData[pData.dispatchCode]
    for k, v in pairs(codeData) do
        pushData[k] = v
    end
    table.insert(pings, pushData)

    TriggerEventForUnits('dispatch:clNotify', pushData)
    TriggerEventForUnits('vrp-dispatch:updateDispatch', 'addPing', pushData)
end)

AddEventHandler('vrp:infinity:player:coords', function(pSource, pCoords)
    local unit, index = GetUnitById(pSource)
    if not unit then return end
    Wait(5000)
    units[index].coords = pCoords
    TriggerEventForUnits('vrp-dispatch:updateUnitCoords', units)
end)
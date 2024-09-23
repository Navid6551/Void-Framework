local plantedBombs = {}

CreateThread(function ()
    exports["vrp-interact"]:AddPeekEntryByModel({`h4_prop_h4_ld_bomb_01a`}, {
        {
            id = "c4_check_time",
            event = "vrp-miscscripts:bombs:checkTime",
            icon = "stopwatch",
            label = "Check remaining time",
        },
        {
            id = "c4_cut_red",
            event = "vrp-miscscripts:bombs:cut",
            icon = "cut",
            label = "Cut red wire",
            parameters = { wire = "red" }
        },
        {
            id = "c4_cut_green",
            event = "vrp-miscscripts:bombs:cut",
            icon = "cut",
            label = "Cut green wire",
            parameters = { wire = "green" }
        },
        {
            id = "c4_cut_blue",
            event = "vrp-miscscripts:bombs:cut",
            icon = "cut",
            label = "Cut blue wire",
            parameters = { wire = "blue" }
        },
        {
            id = "c4_cut_yellow",
            event = "vrp-miscscripts:bombs:cut",
            icon = "cut",
            label = "Cut yellow wire",
            parameters = { wire = "yellow" }
        },
        {
            id = "c4_cut_purple",
            event = "vrp-miscscripts:bombs:cut",
            icon = "cut",
            label = "Cut purple wire",
            parameters = { wire = "purple" }
        },
        {
            id = "c4_cut_white",
            event = "vrp-miscscripts:bombs:cut",
            icon = "cut",
            label = "Cut white wire",
            parameters = { wire = "white" }
        },
    }, { distance = { radius = 2.5 }, isEnabled = function (pEntity)
        local nearestBomb = getNearestBomb(GetEntityCoords(pEntity))
        if not nearestBomb then return false end
        return plantedBombs[nearestBomb].defused == false and plantedBombs[nearestBomb].exploded == false
    end })
    Wait(5000)
    local bombs = VPX.Procedures.execute("vrp-miscscripts:bombs:request")
    plantedBombs = bombs
    RequestAnimDict("amb@world_human_bum_wash@male@low@idle_a")
    while not HasAnimDictLoaded("amb@world_human_bum_wash@male@low@idle_a") do
        Wait(100)
        RequestAnimDict("amb@world_human_bum_wash@male@low@idle_a")
    end
end)

AddEventHandler("vrp-inventory:itemUsed", function (name, info)
    local bombType = "normal"
    local wiretext = "Wire to cut"
    local item = "C4_dev"
    if name == "C4_gem" then
        bombType = "gem"
        wiretext = "Wire to explode"
        item = "C4_gem"
    elseif name ~= "C4_dev" then return end

    local wireOptions = {
        { id = "red", name = "Red" },
        { id = "green", name = "Green" },
        { id = "blue", name = "Blue" },
        { id = "yellow", name = "Yellow" },
        { id = "purple", name = "Purple" },
        { id = "white", name = "White" },
        { id = "random", name = "Random :)" },
    }

    local elements = {
        { name = "length", label = "Length in seconds (900-7200)", icon = "time", _type = "number" },
        { name = "wire", label = wiretext, icon = "cut", _type = "select", options = wireOptions },
        { name = "gridSize", label = "Grid Size (5-8)", icon = "time", _type = "number" },
        { name = "coloredSquares", label = "Colored Sqaures (5-10)", icon = "time", _type = "number" },
        { name = "timeToComplete", label = "Time To Complete (15-30)", icon = "time", _type = "number" },
    }

    local prompt = exports["vrp-ui"]:OpenInputMenu(elements)

    if not prompt or not prompt.length or not prompt.wire then return end

    local length = tonumber(prompt.length)
    if length < 900 or length > 7200 then
        return TriggerEvent("DoLongHudText", "Time needs to be between 900 and 7200 seconds", 2)
    end

    local gridSize = tonumber(prompt.gridSize)
    if gridSize > 8 or gridSize < 5 then
        return TriggerEvent("DoLongHudText", "Grid size must be between 5-8", 2)
    end

    local coloredSquares = tonumber(prompt.coloredSquares)
    if coloredSquares > 10 or coloredSquares < 5 then
        return TriggerEvent("DoLongHudText", "Colored Sqaures must be between 5-10", 2)
    end

    local timeToComplete = tonumber(prompt.timeToComplete) * 1000
    if timeToComplete < 15000 or timeToComplete > 30000 then
        return TriggerEvent("DoLongHudText", "Time to complete must be between 15-30 seconds", 2)
    end

    local coords = GetEntityCoords(PlayerPedId()) + GetEntityForwardVector(PlayerPedId())

    TaskPlayAnim(PlayerPedId(), "amb@world_human_bum_wash@male@low@idle_a", "idle_a", 8.0, -8.0, -1, 1, 1.0, false, false, false)

    local progress = exports["vrp-taskbar"]:taskBar(30000, "Planting bomb...", true)
    ClearPedTasks(PlayerPedId())
    if progress ~= 100 then return end

    local _, GroundZ = GetGroundZAndNormalFor_3dCoord(coords.x, coords.y, coords.z, 0)

    VPX.Procedures.execute("vrp-miscscripts:bombs:plant", {
        x = coords.x,
        y = coords.y,
        z = GroundZ + 0.05
    }, length, prompt.wire, gridSize, coloredSquares, timeToComplete, bombType)

    TriggerEvent("inventory:removeItem", item, 1)
end)

RegisterNetEvent("vrp-miscscripts:bombs:setUpBomb")
AddEventHandler("vrp-miscscripts:bombs:setUpBomb", function (index, bomb)
    plantedBombs[index] = bomb
end)

RegisterNetEvent("vrp-miscscripts:bombs:defuseCorrectBomb")
AddEventHandler("vrp-miscscripts:bombs:defuseCorrectBomb", function (index, gridSize, coloredSquares, timeToComplete)
    TriggerEvent("doAnim", "kneel2")

    exports['vrp-ui']:openApplication('memorygame', {
        gameFinishedEndpoint = 'vrp-miscscripts:bombs:completeHacking',
        gameTimeoutDuration = timeToComplete or 14000,
        coloredSquares =  coloredSquares or 10,
        gridSize = gridSize or 5,
        parameters = {
            bombId = index
        }
    })
end)

AddEventHandler("vrp-miscscripts:bombs:checkTime", function (index)
    local nearestBomb = getNearestBomb(GetEntityCoords(PlayerPedId()))
    if not nearestBomb then return end
    local remaining = VPX.Procedures.execute("vrp-miscscripts:bombs:remaining", nearestBomb)
    TriggerEvent("DoLongHudText", ("Remaining time: %s minutes and %s seconds"):format(remaining.minutes, remaining.seconds), 2, 12000, { i18n = { "Remaining time", "minutes", "and", "seconds" } })
end)

AddEventHandler("vrp-miscscripts:bombs:cut", function (params)
    if not params.wire then return false end

    local nearestBomb = getNearestBomb(GetEntityCoords(PlayerPedId()))
    if not nearestBomb then return false end

    if plantedBombs[nearestBomb].defused or plantedBombs[nearestBomb].exploded then return false end

    TriggerEvent("doAnim", "kneel2")

    VPX.Procedures.execute('vrp-miscscripts:bombs:cut', nearestBomb, params.wire)
end)

RegisterNetEvent("vrp-miscscripts:bombs:defused")
AddEventHandler("vrp-miscscripts:bombs:defused", function (index)
    if not plantedBombs[index] then return end
    plantedBombs[index].defused = true

    if plantedBombs[index].soundId and plantedBombs[index].handle then 
        exports["vrp-fx"]:StopEntitySound(plantedBombs[index].handle, plantedBombs[index].soundId)
        plantedBombs[index].handle = nil
        plantedBombs[index].soundId = nil
    end
end)

RegisterNetEvent("vrp-miscscripts:bombs:explode")
AddEventHandler("vrp-miscscripts:bombs:explode", function (index, bomb)
    if not plantedBombs[index] then return false end

    local offsets = {
        { ["x"] = 0, ["y"] = 0 },
        { ["x"] = 8, ["y"] = 8 },
        { ["x"] = 8, ["y"] = -8 },
        { ["x"] = -8, ["y"] = 8 },
        { ["x"] = -8, ["y"] = -8 },
        { ["x"] = 16, ["y"] = 16 },
        { ["x"] = 16, ["y"] = -16 },
        { ["x"] = -16, ["y"] = 16 },
        { ["x"] = -16, ["y"] = -16 },
        { ["x"] = 16, ["y"] = 0 },
        { ["x"] = -16, ["y"] = 0 },
        { ["x"] = 0, ["y"] = 16 },
        { ["x"] = 0, ["y"] = -16 },
    }
    for index, offset in pairs(offsets) do
        AddExplosion(
            bomb.coords.x + offset.x,
            bomb.coords.y + offset.y,
            bomb.coords.z,
            8,
            1.0,
            true,
            false,
            1.0,
            false
        )
    end
end)

RegisterNetEvent("vrp-miscscripts:bombs:exploded")
AddEventHandler("vrp-miscscripts:bombs:exploded", function (index, bomb)
    if not plantedBombs[index] then return false end
    
    if plantedBombs[index].soundId and plantedBombs[index].handle then
        exports["vrp-fx"]:StopEntitySound(plantedBombs[index].handle, plantedBombs[index].soundId)
        plantedBombs[index].handle = nil
        plantedBombs[index].soundId = nil
    end
end)

AddEventHandler("vrp-objects:objectCreated", function (object, handle)
    if object.data.model ~= `h4_prop_h4_ld_bomb_01a` then return end
    local index = object.data.metadata.id
    if not plantedBombs[index] then return end

    plantedBombs[index].handle = handle
    if plantedBombs[index].defused or plantedBombs[index].exploded then return end

    plantedBombs[index].soundId = exports["vrp-fx"]:PlayEntitySound(handle, "bomb", "DLC_NIKEZ_ROS_GENERAL", 0, "ROS_GENERAL");
end)

AddEventHandler("vrp-objects:objectDeleting", function (object, handle)
    if object.data.model ~= `h4_prop_h4_ld_bomb_01a` then return end
    local index = object.data.metadata.id
    if not plantedBombs[index] then return end

    if not plantedBombs[index].soundId then return end
    
    exports["vrp-fx"]:StopEntitySound(plantedBombs[index].handle, plantedBombs[index].soundId)
    plantedBombs[index].handle = nil
    plantedBombs[index].soundId = nil
end)

AddEventHandler('onResourceStop', function (resource)
    if resource ~= GetCurrentResourceName() then return end
    for index, bomb in pairs(plantedBombs) do
        if bomb.soundId and bomb.handle then
            exports["vrp-fx"]:StopEntitySound(bomb.handle, bomb.soundId)
        end
    end
end)

RegisterUICallback('vrp-miscscripts:bombs:completeHacking', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
  
    local success = data.success
    local bombId = data.parameters.bombId

    TriggerServerEvent('vrp-miscscripts:bombs:completedHacking', success, bombId)

    Citizen.Wait(2000)
    exports['vrp-ui']:closeApplication('memorygame')
  end)

function getNearestBomb(coords, dist)
    if not dist then dist = 3 end
    local nearestBomb = nil
    local nearestDistance = nil
    for index, bomb in pairs(plantedBombs) do
        local distance = #(vector3(coords.x, coords.y, coords.z) - vector3(bomb.coords.x, bomb.coords.y, bomb.coords.z))
        if not nearestDistance or distance < nearestDistance and (not bomb.exploded and not bomb.defused) then
            nearestBomb = index
            nearestDistance = distance
        end
    end
    if not nearestDistance or nearestDistance > dist then return nil end
    return nearestBomb
end

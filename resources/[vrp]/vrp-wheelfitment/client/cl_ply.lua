DecorRegister("vrp-wheelfitment_applied", 2)
DecorRegister("vrp-wheelfitment_w_width", 1)
DecorRegister("vrp-wheelfitment_w_fl", 1)
DecorRegister("vrp-wheelfitment_w_fr", 1)
DecorRegister("vrp-wheelfitment_w_rl", 1)
DecorRegister("vrp-wheelfitment_w_rr", 1)

local plyVehFitments = {}
local vehiclesToCheckFitment = {}
local didPlyAdjustFitments = false
local performVehicleCheck = false
local currentFitmentsToSet = {width = 0, fl = 0, fr = 0, rl = 0, rr = 0}
local inZone = false
local zoneName = nil
local devmode = false
local vehicleCheckThreadRunning = false
local menuFitmentThreadRunning = false

local validZones = {
    ["vrp-wheelfitment:zone1"] = true,
    ["vrp-wheelfitment:zone2"] = true
}

local WhitelistedChars = {
  [1234] = true, -- Raided COP
  [1318] = true, -- Raided Crim
}

local function roundNum(num, numDecimalPlaces)
    local mult = 10 ^ (numDecimalPlaces or 0)
    return math.floor(num * mult + 0.5) / mult
end

local function isNear(pos1, pos2, distMustBe)
    local diff = #(pos2 - pos1)
    return (diff < (distMustBe))
end

function SyncWheelFitment()
    local plyPed = PlayerPedId()
    local plyVeh = GetVehiclePedIsIn(plyPed, false)

    if didPlyAdjustFitments then
        if not DecorExistOn(plyVeh, "vrp-wheelfitment_applied") then
            DecorSetBool(plyVeh, "vrp-wheelfitment_applied", true)
        end

        DecorSetFloat(plyVeh, "vrp-wheelfitment_w_width", roundNum(GetVehicleWheelWidth(plyVeh), 2))
        DecorSetFloat(plyVeh, "vrp-wheelfitment_w_fl", roundNum(GetVehicleWheelXOffset(plyVeh, 0), 2))
        DecorSetFloat(plyVeh, "vrp-wheelfitment_w_fr", roundNum(GetVehicleWheelXOffset(plyVeh, 1), 2))
        DecorSetFloat(plyVeh, "vrp-wheelfitment_w_rl", roundNum(GetVehicleWheelXOffset(plyVeh, 2), 2))
        DecorSetFloat(plyVeh, "vrp-wheelfitment_w_rr", roundNum(GetVehicleWheelXOffset(plyVeh, 3), 2))

        VPX.Procedures.execute("vrp-wheelfitment_sv:saveWheelfitment", NetworkGetNetworkIdFromEntity(plyVeh), currentFitmentsToSet)
        
        didPlyAdjustFitments = false
    end

    currentFitmentsToSet = {width = 0, fl = 0, fr = 0, rl = 0, rr = 0}

    performVehicleCheck = true

    checkVehicleFitment()
    startVehicleCheckThread()

    FreezeEntityPosition(plyVeh, false)
    SetEntityCollision(plyVeh, true, true)

    VPX.Procedures.execute("vrp-wheelfitment_sv:setIsWheelFitmentInUse", false)
end

function AdjustWheelFitment(state, wheel, amount)
    if amount == -1 then
        amount = -1.00
    elseif amount == 1 then
        amount = 1.00
    elseif amount == 0 then
        amount = 0.00
    end

    if state then
        if wheel == "w_fl" then
            wheel = 0

            currentFitmentsToSet.fl = amount
        elseif wheel == "w_fr" then
            wheel = 1

            currentFitmentsToSet.fr = amount
        elseif wheel == "w_rl" then
            wheel = 2

            currentFitmentsToSet.rl = amount
        elseif wheel == "w_rr" then
            wheel = 3

            currentFitmentsToSet.rr = amount
        end

        if not didPlyAdjustFitments then
            didPlyAdjustFitments = true
        end
    else
        if not didPlyAdjustFitments then
            didPlyAdjustFitments = true
        end

        currentFitmentsToSet.width = amount
    end
end

function startMenuFitmentThread()
    if menuFitmentThreadRunning then return end
    menuFitmentThreadRunning = true
    Citizen.CreateThread(function ()
        while isMenuShowing do
            if not performVehicleCheck then
                local plyPed = PlayerPedId()
                local plyVeh = GetVehiclePedIsIn(plyPed, false)
        
                SetVehicleWheelWidth(plyVeh, currentFitmentsToSet.width)
                SetVehicleWheelXOffset(plyVeh, 0, currentFitmentsToSet.fl)
                SetVehicleWheelXOffset(plyVeh, 1, currentFitmentsToSet.fr)
                SetVehicleWheelXOffset(plyVeh, 2, currentFitmentsToSet.rl)
                SetVehicleWheelXOffset(plyVeh, 3, currentFitmentsToSet.rr)
            end
            Citizen.Wait(0)
        end
        menuFitmentThreadRunning = false
    end)
end

function startVehicleCheckThread()
    if vehicleCheckThreadRunning then return end
    vehicleCheckThreadRunning = true
    Citizen.CreateThread(function ()
        while performVehicleCheck and #vehiclesToCheckFitment > 0 do
            if not isMenuShowing then
                for _, vehData in ipairs(vehiclesToCheckFitment) do
                    if vehData.vehicle ~= nil and DoesEntityExist(vehData.vehicle) then
                        if GetVehicleWheelWidth(vehData.vehicle) ~= vehData.w_width then
                            SetVehicleWheelWidth(vehData.vehicle, vehData.w_width)
                        end
                        if GetVehicleWheelXOffset(vehData.vehicle, 0) ~= vehData.w_fl then
                            SetVehicleWheelXOffset(vehData.vehicle, 0, vehData.w_fl)
                            SetVehicleWheelXOffset(vehData.vehicle, 1, vehData.w_fr)
                            SetVehicleWheelXOffset(vehData.vehicle, 2, vehData.w_rl)
                            SetVehicleWheelXOffset(vehData.vehicle, 3, vehData.w_rr)
                        end
                    end
                end
            end
            Citizen.Wait(0)
        end
        vehicleCheckThreadRunning = false
    end)
end

function checkVehicleFitment()
    vehiclesToCheckFitment = {}

    local vehicles = GetGamePool("CVehicle")

    -- Iterate table backwards so we can safely remove entries while iterating through it.
    for i = #vehiclesToCheckFitment, 1, -1 do
        if not DoesEntityExist(vehiclesToCheckFitment[i].vehicle) then
            table.remove(vehiclesToCheckFitment, i)
        end
    end

    for _, veh in ipairs(vehicles) do
        local plyPed = PlayerPedId()
        local plyPos = GetEntityCoords(plyPed)

        if isNear(plyPos, GetEntityCoords(veh), 150) then
            if DecorExistOn(veh, "vrp-wheelfitment_applied") then
                vehiclesToCheckFitment[#vehiclesToCheckFitment + 1] = {
                    vehicle = veh,
                    w_width = DecorGetFloat(veh, "vrp-wheelfitment_w_width"),
                    w_fl = DecorGetFloat(veh, "vrp-wheelfitment_w_fl"),
                    w_fr = DecorGetFloat(veh, "vrp-wheelfitment_w_fr"),
                    w_rl = DecorGetFloat(veh, "vrp-wheelfitment_w_rl"),
                    w_rr = DecorGetFloat(veh, "vrp-wheelfitment_w_rr")
                }
            end
        end
    end
end

-- #[Citizen Threads]#--
Citizen.CreateThread(function()
    exports["vrp-polyzone"]:AddBoxZone("vrp-wheelfitment:zone1", vector3(124.5, -3047.7, 7.05), 6.4, 4.0, {heading = 270.0, minZ = 6.04, maxZ = 9.04, data = {id = "wheel_fitment_zone"}})
    
    -- PD Zone bruh
    exports["vrp-polyzone"]:AddBoxZone("vrp-wheelfitment:zone2", vector3(435.41, -975.99, 25.7), 4.0, 8.6, {
    name="2",
    heading=0,
    minZ=24.5,
    maxZ=27.1,
    data = { id = "wheel_fitment_zone2" }
    })
end)

Citizen.CreateThread(function()
    while true do
        local oldVehiclesToCheckFitmentCount = #vehiclesToCheckFitment
        checkVehicleFitment()
        if oldVehiclesToCheckFitmentCount == 0 and #vehiclesToCheckFitment > 0 then
            performVehicleCheck = true
            startVehicleCheckThread()
        end

        Citizen.Wait(cfg_scanVehicleTimer)
    end
end)

AddEventHandler("vrp-polyzone:enter", function(zone, data)
    if not validZones[zone] then return end

    Citizen.CreateThread(function()
        local plyPed = PlayerPedId()
        inZone = true
        zoneName = zone
        local isWheelFitmentInUse = VPX.Procedures.execute("vrp-wheelfitment_sv:getIsWheelFitmentInUse", zone)
        
        local cid = exports['isPed']:isPed('cid')
        
        while inZone and (devmode or WhitelistedChars[cid]) do
            if IsPedInAnyVehicle(plyPed, false) and not isWheelFitmentInUse then
                if not isMenuShowing then
                    local plyPos = GetEntityCoords(plyPed, false)
                    local coords = cfg_wheelFitmentPos[zone].coords
                    local heading = cfg_wheelFitmentPos[zone].heading
                    DrawMarker(20, coords.x, coords.y, coords.z, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.5, 0.5, 148, 0, 211, 255, true, false, 2, true, nil, nil, false)

                    if isNear(plyPos, coords, 2.0) then
                        Draw3DText(coords.x, coords.y, coords.z, "[Press ~p~E~w~ - Adjust Wheel Fitment]", 255, 255, 255, 255, 4, 0.45, true, true, true, true, 0, 0, 0, 0, 55)

                        if IsControlJustReleased(1, 38) then -- Key: E
                            local slider_wWidth = {}
                            local slider_wfFL = {}
                            local slider_wfFR = {}
                            local slider_wfRL = {}
                            local slider_wfRR = {}
                            local sliderStartPos = {}
                            local plyVeh = GetVehiclePedIsIn(plyPed, false)

                            performVehicleCheck = false

                            SetEntityCoords(plyVeh, coords)
                            SetEntityHeading(plyVeh, heading)
                            FreezeEntityPosition(plyVeh, true)
                            SetEntityCollision(plyVeh, false, true)

                            VPX.Procedures.execute("vrp-wheelfitment_sv:setIsWheelFitmentInUse", zone, true)

                            for i = 0.0, 1.56, 0.01 do
                                slider_wWidth[#slider_wWidth + 1] = roundNum(i, 2)

                                if math.abs(i - roundNum(GetVehicleWheelWidth(plyVeh), 2)) < 0.00000001 then
                                    sliderStartPos[#sliderStartPos + 1] = #slider_wWidth
                                end
                            end

                            for i = 0.0, -1.56, -0.01 do
                                slider_wfFL[#slider_wfFL + 1] = roundNum(i, 2)

                                if math.abs(i - roundNum(GetVehicleWheelXOffset(plyVeh, 0), 2)) < 0.00000001 then
                                    sliderStartPos[#sliderStartPos + 1] = #slider_wfFL
                                end
                            end

                            for i = 0.0, 1.56, 0.01 do
                                slider_wfFR[#slider_wfFR + 1] = roundNum(i, 2)

                                if math.abs(i - roundNum(GetVehicleWheelXOffset(plyVeh, 1), 2)) < 0.00000001 then
                                    sliderStartPos[#sliderStartPos + 1] = #slider_wfFR
                                end
                            end

                            for i = 0.0, -1.56, -0.01 do
                                slider_wfRL[#slider_wfRL + 1] = roundNum(i, 2)

                                if math.abs(i - roundNum(GetVehicleWheelXOffset(plyVeh, 2), 2)) < 0.00000001 then
                                    sliderStartPos[#sliderStartPos + 1] = #slider_wfRL
                                end
                            end

                            for i = 0.0, 1.56, 0.01 do
                                slider_wfRR[#slider_wfRR + 1] = roundNum(i, 2)

                                if math.abs(i - roundNum(GetVehicleWheelXOffset(plyVeh, 3), 2)) < 0.00000001 then
                                    sliderStartPos[#sliderStartPos + 1] = #slider_wfRR
                                end
                            end

                            currentFitmentsToSet.width = GetVehicleWheelWidth(plyVeh)
                            currentFitmentsToSet.fl = GetVehicleWheelXOffset(plyVeh, 0)
                            currentFitmentsToSet.fr = GetVehicleWheelXOffset(plyVeh, 1)
                            currentFitmentsToSet.rl = GetVehicleWheelXOffset(plyVeh, 2)
                            currentFitmentsToSet.rr = GetVehicleWheelXOffset(plyVeh, 3)
                            checkVehicleFitment()

                            DisplayMenu(true, slider_wWidth, slider_wfFL, slider_wfFR, slider_wfRL, slider_wfRR, sliderStartPos)
                        end
                    end
                end
            end
            Citizen.Wait(0)
        end
    end)
end)

AddEventHandler("vrp-polyzone:exit", function(zone)
    if not validZones[zone] then return end
    inZone = false
    zoneName = nil
end)

RegisterNetEvent("vrp-admin:currentDevmode")
AddEventHandler("vrp-admin:currentDevmode", function(pDevmode)
    devmode = pDevmode
end)

-- #[Event Handlers]#--
RegisterNetEvent("vrp-wheelfitment_cl:applySavedWheelFitment")
AddEventHandler("vrp-wheelfitment_cl:applySavedWheelFitment", function(wheelFitments, plyVeh)
    performVehicleCheck = false

    SetVehicleWheelWidth(plyVeh, wheelFitments.width)
    SetVehicleWheelXOffset(plyVeh, 0, wheelFitments.fl)
    SetVehicleWheelXOffset(plyVeh, 1, wheelFitments.fr)
    SetVehicleWheelXOffset(plyVeh, 2, wheelFitments.rl)
    SetVehicleWheelXOffset(plyVeh, 3, wheelFitments.rr)

    if not DecorExistOn(plyVeh, "vrp-wheelfitment_applied") then
        DecorSetBool(plyVeh, "vrp-wheelfitment_applied", true)
    end

    DecorSetFloat(plyVeh, "vrp-wheelfitment_w_width", wheelFitments.width)
    DecorSetFloat(plyVeh, "vrp-wheelfitment_w_fl", wheelFitments.fl)
    DecorSetFloat(plyVeh, "vrp-wheelfitment_w_fr", wheelFitments.fr)
    DecorSetFloat(plyVeh, "vrp-wheelfitment_w_rl", wheelFitments.rl)
    DecorSetFloat(plyVeh, "vrp-wheelfitment_w_rr", wheelFitments.rr)

    performVehicleCheck = true
    checkVehicleFitment()
    startVehicleCheckThread()
end)

RegisterNetEvent("vrp-wheelfitment_cl:forceMenuClose")
AddEventHandler("vrp-wheelfitment_cl:forceMenuClose", function()
    if isMenuShowing then
        local plyPed = PlayerPedId()
        local plyVeh = GetVehiclePedIsIn(plyPed, false)

        if plyVeh ~= 0 or plyVeh ~= nil then
            -- SetEntityCoords(plyVeh, cfg_wheelFitmentPos)
            -- SetEntityHeading(plyVeh, cfg_wheelFitmentHeading)
            FreezeEntityPosition(plyVeh, false)
            SetEntityCollision(plyVeh, true, true)
        end
    end

    VPX.Procedures.execute("vrp-wheelfitment_sv:setIsWheelFitmentInUse", zoneName, false)

    SyncWheelFitment()
    DisplayMenu(false)
end)

RegisterCommand("leavefitment", function()
    TriggerEvent("vrp-wheelfitment_cl:forceMenuClose")
end)

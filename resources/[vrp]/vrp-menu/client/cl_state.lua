CurrentJob = 'unemployed'
isJudge = false
isDoctor = false
isNews = false
isInstructorMode = false
myJob = "unemployed"
isHandcuffed = false
isHandcuffedAndWalking = false
isEscorting = false
hasOxygenTankOn = false
inS2Mission = false
cuffStates = {}

polyChecks = {
    vanillaUnicorn = { isInside = false, data = nil },
    gasStation = { isInside = false, data = nil },
    bennys = { isInside = false, data = nil },
    townhallCourtGavel = { isInside = false, data = nil },
    prison = { isInside = false, data = nil },
    police = { isInside = false, data = nil },
}

isDoc = false
isPolice = false
isMedic = false
isMayor = false
isCountyClerk = false
isDead = false
isPrisoner = false
isInfected = false
isOutbreakRunning = false
isDeathAlertDisabled = false
isVampire = false

function IsDisabled()
    return isDead or isHandcuffed or isHandcuffedAndWalking
end

function GetBoneDistance(pEntity, pType, pBone)
    local bone

    if pType == 1 then
        bone = GetPedBoneIndex(pEntity, pBone)
    else
        bone = GetEntityBoneIndexByName(pEntity, pBone)
    end

    local boneCoords = GetWorldPositionOfEntityBone(pEntity, bone)
    local playerCoords = GetEntityCoords(PlayerPedId())

    return #(boneCoords - playerCoords)
end

exports("GetBoneDistance", GetBoneDistance)

function HasWeaponEquipped(pWeaponHash)
    return GetSelectedPedWeapon(PlayerPedId()) == pWeaponHash
end

RegisterNetEvent("menu:setCuffState")
AddEventHandler("menu:setCuffState", function(pTargetId, pState)
    cuffStates[pTargetId] = pState
end)

RegisterNetEvent("isJudge")
AddEventHandler("isJudge", function()
    isJudge = true
end)

RegisterNetEvent("isJudgeOff")
AddEventHandler("isJudgeOff", function()
    isJudge = false
end)

RegisterNetEvent("vrp-jobmanager:playerBecameJob")
AddEventHandler("vrp-jobmanager:playerBecameJob", function(job)
    if isMedic and job ~= "ems" then isMedic = false end
    if isPolice and job ~= "police" then isPolice = false end
    if isDoc and job ~= "doc" then isDoc = false end
    if isDoctor and job ~= "doctor" then isDoctor = false end
    if isNews and job ~= "news" then isNews = false end
    if isMayor and job ~= "mayor" then isMayor = false end
    if isCountyClerk and job ~= "county_clerk" then isCountyClerk = false end
    if job == "police" then isPolice = true end
    if job == "ems" then isMedic = true end
    if job == "news" then isNews = true end
    if job == "doctor" then isDoctor = true end
    if job == "doc" then isDoc = true end
    if job == "mayor" then isMayor = true end
    if job == "county_clerk" then isCountyClerk = true end
    myJob = job
end)

RegisterNetEvent('vrp-jobs:jobChanged')
AddEventHandler('vrp-jobs:jobChanged', function(pJobId)
    CurrentJob = pJobId
end)

RegisterNetEvent('pd:deathcheck')
AddEventHandler('pd:deathcheck', function()
    if not isDead then
        isDead = true
    else
        isDead = false
    end
end)

RegisterNetEvent("drivingInstructor:instructorToggle")
AddEventHandler("drivingInstructor:instructorToggle", function(mode)
    isInstructorMode = mode
end)

RegisterNetEvent("vrp-police:cuffs:state")
AddEventHandler("vrp-police:cuffs:state", function(pIsHandcuffed, pIsHandcuffedAndWalking)
    isHandcuffedAndWalking = pIsHandcuffedAndWalking
    isHandcuffed = pIsHandcuffed
end)

RegisterNetEvent("menu:hasOxygenTank")
AddEventHandler("menu:hasOxygenTank", function(pHasOxygenTank)
    hasOxygenTankOn = pHasOxygenTank
end)

RegisterNetEvent('vrp-police:drag:escort')
AddEventHandler('vrp-police:drag:escort', function()
    isEscorting = true
end)

RegisterNetEvent('vrp-police:drag:releaseEscort')
AddEventHandler('vrp-police:drag:releaseEscort', function()
    isEscorting = false
end)

AddEventHandler("vrp-polyzone:enter", function(zone, data)
    if zone == "vrp-jobs:impound:dropOff" then IsImpoundDropOff = true end
    if zone == "vanilla_unicorn_stage" then polyChecks.vanillaUnicorn = { isInside = true, polyData = data } end
    if zone == "gas_station" then polyChecks.gasStation = { isInside = true, polyData = data } end
    if zone == "bennys" then
        local plyPed = PlayerPedId()

        if data and data.type == "boats" and not (IsPedInAnyBoat(plyPed) or IsPedInAnySub(plyPed)) then
            return
        end
        if data and data.type == "planes" and not (IsPedInAnyPlane(plyPed) or IsPedInAnyHeli(plyPed)) then
            return
        end

        polyChecks.bennys = { isInside = true, polyData = data }
    end
    if zone == "townhall_court_gavel" then polyChecks.townhallCourtGavel = { isInside = true, polyData = nil } end
    if zone == "vrp-jail:prison" then polyChecks.prison = { isInside = true, polyData = nil } end
    if zone == "police_station" then polyChecks.police = { isInside = true, polyData = nil } end
end)

AddEventHandler("vrp-polyzone:exit", function(zone)
    if zone == "vanilla_unicorn_stage" then polyChecks.vanillaUnicorn = { isInside = false, polyData = nil } end
    if zone == "gas_station" then polyChecks.gasStation = { isInside = false, polyData = nil } end
    if zone == "bennys" then polyChecks.bennys = { isInside = false, polyData = nil } end
    if zone == "townhall_court_gavel" then polyChecks.townhallCourtGavel = { isInside = false, polyData = nil } end
    if zone == "vrp-jail:prison" then polyChecks.prison = { isInside = false, polyData = nil } end
    if zone == "police_station" then polyChecks.police = { isInside = false, polyData = nil } end
end)

AddEventHandler("vrp-jail:playerJailed", function()
    isPrisoner = true
end)

AddEventHandler("vrp-jail:playerUnjailed", function()
    isPrisoner = false
end)

AddEventHandler("vrp-outbreak:setTurnedStatus", function (pStatus)
    isInfected = pStatus
end)

AddEventHandler("vrp-menu:setOutbreakState", function (pState)
    isOutbreakRunning = pState
end)

AddEventHandler("vrp-menu:setVampireState", function(pState)
    isVampire = pState
end)

AddEventHandler("onClientResourceStart", function (pResource)
    if pResource ~= GetCurrentResourceName() then return end

    -- local policeConfig = exports["vrp-config"]:GetModuleConfig("vrp-police")

    -- if policeConfig then
    --     isDeathAlertDisabled = policeConfig["deathAlertDisabled"] == true
    -- end
end)

AddEventHandler("vrp-config:configLoaded", function (pConfigId, pConfig)
    if pConfigId == "vrp-police" then
        isDeathAlertDisabled = pConfig["deathAlertDisabled"] == true
    end
end)

function InDefaultWorld()
    local state = LocalPlayer.state
    local world = state.routingBucketName
    if world == 'default' then
      return true
    end
    return false
end

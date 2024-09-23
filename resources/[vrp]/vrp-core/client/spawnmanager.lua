local hasLoaded = false

function Initialize(self)
    Citizen.CreateThread(function()
        while true do
            if NetworkIsSessionStarted() then
                TriggerEvent("vrp-base:playerSessionStarted")
                TriggerServerEvent("vrp-base:playerSessionStarted")
                break
            end
        end
    end)
end

Initialize()

AddEventHandler("vrp-base:playerSessionStarted", function()
    while not hasLoaded do
        Wait(100)
    end
    ShutdownLoadingScreen()
    SpawnManagerInitialize()
end)


RegisterNetEvent("customNotification")
AddEventHandler("customNotification", function(msg, length, type)
	TriggerEvent("chatMessage","SYSTEM",4,msg)
end)

RegisterNetEvent("base:disableLoading")
AddEventHandler("base:disableLoading", function()
    print("player has spawned ")
    if not hasLoaded then
        hasLoaded = true
    end
end)

Citizen.CreateThread( function()
    TriggerEvent("base:disableLoading")
end)

function SpawnManagerInitialize(self)
    Citizen.CreateThread(function()

        FreezeEntityPosition(PlayerPedId(), true)

        TransitionToBlurred(500)
        DoScreenFadeOut(500)

        ShutdownLoadingScreen()

        local cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", 1)

        SetCamRot(cam, 0.0, 0.0, -45.0, 2)
        SetCamCoord(cam, -682.0, -1092.0, 226.0)
        SetCamActive(cam, true)
        RenderScriptCams(true, false, 0, true, true)

        local ped = PlayerPedId()

        SetEntityCoordsNoOffset(ped, -682.0, -1092.0, 200.0, false, false, false, true)

        SetEntityVisible(ped, false)

        DoScreenFadeIn(500)

        while IsScreenFadingIn() do
            Citizen.Wait(0)
        end

        TriggerEvent("vrp-base:spawnInitialized")
        TriggerServerEvent("vrp-base:spawnInitialized")

    end)
end

exports('SpawnManagerInitialize', SpawnManagerInitialize)

function QBCore.SpawnManagerInitialSpawn(self)
    Citizen.CreateThread(function()
        DisableAllControlActions(0)
      
        DoScreenFadeOut(10)

        while IsScreenFadingOut() do
            Citizen.Wait(0)
        end

        --Tells poggers clothing system to set ped to correct skin
        TriggerEvent("vrp-clothing:applyCurrentClothing")

        local ped = PlayerPedId()

        SetEntityVisible(ped, true)
        FreezeEntityPosition(PlayerPedId(), false)
        
        ClearPedTasksImmediately(ped)
        RemoveAllPedWeapons(ped)
        --ClearPlayerWantedLevel(PlayerId())

        EnableAllControlActions(0)

        TriggerEvent("character:finishedLoadingChar")
    end)
end

AddEventHandler("vrp-base:firstSpawn", function()
    QBCore.SpawnManagerInitialSpawn()
    Citizen.CreateThread(function()
        Citizen.Wait(600)
        TriggerEvent("vrp-clothing:applyCurrentClothing")
        FreezeEntityPosition(PlayerPedId(), false)
    end)
end)

RegisterNetEvent('vrp-base:clearStates')
AddEventHandler('vrp-base:clearStates', function()
  TriggerEvent("isJudgeOff")
  TriggerEvent("nowCopSpawnOff")
  TriggerEvent("nowEMSDeathOff")
  TriggerEvent("police:noLongerCop")
  TriggerEvent("nowCopDeathOff")
  TriggerEvent("ResetFirstSpawn")
  TriggerEvent("stopSpeedo")
  TriggerServerEvent("TokoVoip:removePlayerFromAllRadio",GetPlayerServerId(PlayerId()))
  TriggerEvent("wk:disableRadar")
end)

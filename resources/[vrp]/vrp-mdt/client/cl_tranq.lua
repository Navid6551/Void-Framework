local ped = nil
local isDead = false

-- RegisterCommand("spawnped", function()
--   ped = CreatePed(4, `mp_m_freemode_01`, vector4(-1104.39, -3081.89, 13.95, 247.22), 1, 1)
--   GiveWeaponToPed(ped, 727643628, 9999, 0, 1)
--   SetCurrentPedWeapon(ped, 727643628, 1)
-- end, false)

-- RegisterCommand("shootme", function()
--   TaskShootAtEntity(ped, PlayerPedId(), 5000, `FIRING_PATTERN_FULL_AUTO`)
-- end)

local isTranqed = false

local function DisableInput(pPed)
    DisableInputGroup(0)
    DisableInputGroup(1)
    DisableInputGroup(2)
    DisableControlAction(1, 19, true)
    DisableControlAction(0, 34, true)
    DisableControlAction(0, 9, true)
    DisableControlAction(0, 32, true)
    DisableControlAction(0, 8, true)
    DisableControlAction(2, 31, true)
    DisableControlAction(2, 32, true)
    DisableControlAction(1, 33, true)
    DisableControlAction(1, 34, true)
    DisableControlAction(1, 35, true)
    DisableControlAction(1, 21, true)  -- space
    DisableControlAction(1, 22, true)  -- space
    DisableControlAction(1, 23, true)  -- F
    DisableControlAction(1, 24, true)  -- F
    DisableControlAction(1, 25, true)  -- F
    DisableControlAction(1, 106, true) -- VehicleMouseControlOverride
    DisableControlAction(1, 140, true) --Disables Melee Actions
    DisableControlAction(1, 141, true) --Disables Melee Actions
    DisableControlAction(1, 142, true) --Disables Melee Actions 
    DisableControlAction(1, 37, true) --Disables INPUT_SELECT_WEAPON (tab) Actions
    DisablePlayerFiring(pPed, true) -- Disable weapon firing
    SetPedCanRagdoll(pPed, false)
end

local function playIsTranqed()
    isTranqed = true
    local ped = PlayerPedId()
    Citizen.CreateThread(function()
        while isTranqed do
            DisableInput(ped)
            Wait(0)
        end
    end)
end

local minorAnim = "cpr_pumpchest_idle"
local minorDict = "mini@cpr@char_b@cpr_def"
local tranqed = false
function loadAnimDict(dict)
  RequestAnimDict(dict)
  while(not HasAnimDictLoaded(dict)) do
      Citizen.Wait(0)
  end
end
AddEventHandler("DamageEvents:EntityDamaged", function(victim, attacker, pWeapon, isMelee)
  ClearPedLastDamageBone(victim) 
  local playerPed = PlayerPedId()
  if victim ~= playerPed then return end
  if pWeapon ~= 727643628 then return end
  if tranqed then return end
  tranqed = true
  Wait(1000)
  isTranqed = true
  exports['vrp-taskbar']:taskbarDisableInventory(true)
  exports['vrp-actionbar']:disableActionBar(true)
  exports["vrp-phone"]:EndPhoneCall()
  playIsTranqed()
  SetPedToRagdoll(playerPed, 10000, 10000, 0, false, false, false)
  TriggerEvent("vrp-voice:setTransmissionDisabled", { 
    ["phone"] = true,
    ["proximity"] = true,
    ["radio"] = true,
  })
  TriggerEvent("tranqed:enable",tranqed)
  DoScreenFadeOut(500)
  Wait(500)
  Citizen.CreateThread(function()
    local waitTime = 500
    local loopCount = 0
    loadAnimDict(minorDict)
    while loopCount < math.random(120, 240) do
      loopCount = loopCount + 1
      if not IsEntityPlayingAnim(playerPed, minorDict, minorAnim, 3) then
        ClearPedTasksImmediately(playerPed)
        TaskPlayAnim(playerPed, minorDict, minorAnim, 8.0, -8, -1, 1, 0, 0, 0, 0)
      end
      Wait(waitTime)
    end
    exports["vrp-ui"]:hideInteraction("Tranquilized", "error")
    tranqed = false
    isTranqed = false
    exports['vrp-taskbar']:taskbarDisableInventory(false)
    exports['vrp-actionbar']:disableActionBar(false)
    TriggerEvent("tranqed:enable",tranqed)
    StopScreenEffect("DrugsMichaelAliensFight")
    ClearPedTasks(playerPed)
    TriggerEvent("vrp-voice:setTransmissionDisabled", {
      ["phone"] = false,
      ["proximity"] = false,
      ["radio"] = isDead,
    })
  end)
  Citizen.CreateThread(function()
    Citizen.Wait(5000)
    exports["vrp-ui"]:showInteraction("Tranquilized", "error")
    DoScreenFadeIn(5000)
    StartScreenEffect("DrugsMichaelAliensFight", 3.0, 0)
  end)
end)

RegisterNetEvent('pd:deathcheck', function ()
  isDead = not isDead
  TriggerEvent("vrp-voice:setTransmissionDisabled", {
    ["radio"] = isDead,
  })
end)

local IsHoldingAward = false

AddEventHandler('vrp-inventory:itemUsed', function(pItemId)
    if pItemId ~= 'npma_2022' then return end

    if IsHoldingAward then
        IsHoldingAward = false

        TriggerEvent("disabledWeapons",false)
        ClearPedTasks(PlayerPedId())
        TriggerEvent("destroyProp")

        return
    end

    IsHoldingAward = true

    Citizen.CreateThread(function ()
        local pAnimDict, pAnimName = "move_weapon@pistol@copc", "idle"

        while not HasAnimDictLoaded(pAnimDict) and IsHoldingAward do
            RequestAnimDict(pAnimDict)
            Citizen.Wait(0)
        end

        if not IsHoldingAward then return end

        TriggerEvent("attachItem", "npma_2022")

        while IsHoldingAward do
            if not IsEntityPlayingAnim(PlayerPedId(), pAnimDict, pAnimName, 3) then
                TaskPlayAnim(GetPlayerPed(PlayerId()), 1.0, -1, -1, 50, 0, 0, 0, 0) -- 50 = 32 + 16 + 2
                TaskPlayAnim(GetPlayerPed(PlayerId()), pAnimDict, pAnimName, 1.0, -1, -1, 50, 0, 0, 0, 0)
            end

            DisablePlayerFiring(PlayerId(), true)
            DisableControlAction(0, 25, true) -- disable aim
            DisableControlAction(0, 44, true) -- INPUT_COVER
            DisableControlAction(0, 37, true) -- INPUT_SELECT_WEAPON
            TriggerEvent("actionbar:setEmptyHanded")

            Wait(0)
        end
    end)
end)
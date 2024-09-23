VPX.Events.onNet('vrp-miscscripts:puke', function()
  PlaySoundFromEntity(-1, 'Puke', PlayerPedId(), 'TREVOR_PUKEINTOFOUNT_SOUNDS', false, 0);
  TriggerServerEvent('fx:puke')
  TriggerEvent('animation:PlayAnimation','outofbreath')
end)

VPX.Events.onNet('vrp-miscscripts:playAnimation', function(dictionary, animation)
  local playerPed = PlayerPedId()
  local animDict = dictionary
  local animName = animation
  -- Check if the animation library is already loaded; if not, load it
  if not HasAnimDictLoaded(animDict) then
      RequestAnimDict(animDict)
      while not HasAnimDictLoaded(animDict) do
          Citizen.Wait(0) -- Wait until animation dictionary has loaded
      end
  end
  local animLength = GetAnimDuration(animDict, animName)
  -- Play the animation
  TaskPlayAnim(playerPed, animDict, animName, 1.0, 4.0, animLength, 1, 0, 0, 0, 0)
end)

VPX.Events.onNet('pmMode', function(speedMultiplier)
  local playerPed = PlayerPedId()
  local vehicle = GetVehiclePedIsIn(playerPed, false)

  if vehicle and vehicle ~= 0 then
      local baseSpeed = GetVehicleHandlingFloat(vehicle, 'CHandlingData', 'fInitialDriveMaxFlatVel')

      local newSpeed = baseSpeed * (1 + (tonumber(speedMultiplier) / 100))
      newSpeed = newSpeed - baseSpeed

      ModifyVehicleTopSpeed(vehicle, newSpeed)

      print("Speed modification applied!") -- Debug: Confirm that the speed modification was applied
  end
end)

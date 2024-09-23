local mrKPedDrawables = json.decode('{"Face":[2,0],"Mask":[-1,0],"Hair":[0,0],"Torso":[9,0],"Leg":[6,0],"Parachute":[1,0],"Shoes":[0,0],"Accessory":[0,1],"Undershirt":[-1,0],"Kevlar":[-1,0],"Badge":[-1,0],"Jacket":[3,0]}')
local mrKPedProps = json.decode('{"Hat":[-1,-1],"Glasses":[-1,-1],"Ears":[-1,-1],"Watch":[-1,-1],"Bracelet":[-1,-1]}')

local function loadAnim(dict)
  while not HasAnimDictLoaded(dict) do
    RequestAnimDict(dict)
    Citizen.Wait(0)
  end
end
AddEventHandler("vrp-katana:cursedKatanaEquipC", function()
  exports["vrp-clothing"]:ApplyPedClothing(PlayerPedId(), mrKPedDrawables, mrKPedProps, {0, 0}, true)
  Citizen.CreateThread(function()
    Wait(1000)
    while GetSelectedPedWeapon(PlayerPedId()) == 1692590063 do
      Wait(100)
    end
    TriggerEvent('vrp-clothing:applyCurrentClothing')
    TriggerEvent("vrp-katana:removeEquippedKatana")
  end)
end)
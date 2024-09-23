AddEventHandler('onResourceStart', function(resourceName)
  if (GetCurrentResourceName() ~= resourceName) then
    return
  end
  TriggerServerEvent("vrp-commands:buildCommands","")
end)

-- RegisterNetEvent('spawn:characterSpawned', function()
--   TriggerServerEvent("vrp-commands:buildCommands","")
-- end)

RegisterNetEvent('vrp-base:spawnInitialized', function()
  TriggerServerEvent("vrp-commands:buildCommands","")
end)
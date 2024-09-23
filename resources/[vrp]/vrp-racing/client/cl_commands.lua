RegisterCommand('getCreateRaceDongle', function (src, args)
  TriggerServerEvent("vrp-racing:getCreateRaceDongle", args[1])
end)

RegisterCommand('getRaceDongle', function (src, args)
  TriggerServerEvent("vrp-racing:getRaceDongle", args[1])
end)
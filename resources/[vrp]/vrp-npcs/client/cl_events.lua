RegisterNetEvent("vrp-npcs:set:ped")
AddEventHandler("vrp-npcs:set:ped", function(pNPCs)
  if type(pNPCs) == "table" then
    for _, ped in ipairs(pNPCs) do
      RegisterNPC(ped, 'vrp-npcs')
      EnableNPC(ped.id)
    end
  else
    RegisterNPC(ped, 'vrp-npcs')
    EnableNPC(ped.id)
  end
end)

RegisterNetEvent("vrp-npcs:set:position")
AddEventHandler("vrp-npcs:set:position", function(pId, pVectors, pHeading)
  local position = { coords = pVectors, heading = pHeading}
  UpdateNPCData(pId, 'position', position)
end)

RegisterNetEvent("vrp-npcs:ped:giveStolenItems")
AddEventHandler("vrp-npcs:ped:giveStolenItems", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["vrp-taskbar"]:taskBar(15000, "Preparing to receive goods, don't move.")
  if finished == 100 then
    if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      local serverCode = exports["vrp-config"]:GetServerCode()
      TriggerEvent("server-inventory-open", "1", "Stolen-Goods-1-" .. serverCode)
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 105)
    end
  end
end)

RegisterNetEvent("vrp-npcs:ped:exchangeRecycleMaterial")
AddEventHandler("vrp-npcs:ped:exchangeRecycleMaterial", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["vrp-taskbar"]:taskBar(3000, "Preparing to exchange material, don't move.")
  if finished == 100 then
    if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      TriggerEvent("server-inventory-open", "35", "Craft");
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 105)
    end
  end
end)

RegisterNetEvent("vrp-npcs:ped:signInJob")
AddEventHandler("vrp-npcs:ped:signInJob", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  if #pArgs == 0 then
    local npcId = DecorGetInt(pEntity, 'NPC_ID')
    if npcId == `news_reporter` then
      TriggerServerEvent("jobssystem:jobs", "news")
    elseif npcId == `head_stripper` then
      TriggerServerEvent("jobssystem:jobs", "entertainer")
    end
  else
    TriggerServerEvent("jobssystem:jobs", "unemployed")
  end
end)

RegisterNetEvent("vrp-npcs:ped:paycheckCollect")
AddEventHandler("vrp-npcs:ped:paycheckCollect", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerServerEvent("server:paySlipPickup")
end)

RegisterNetEvent("vrp-npcs:ped:receiptTradeIn")
AddEventHandler("vrp-npcs:ped:receiptTradeIn", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local cid = exports["isPed"]:isPed("cid")
  local accountStatus, accountTarget = RPC.execute("GetDefaultBankAccount", cid)
  if not accountStatus then return end
  RPC.execute("vrp-inventory:tradeInReceipts", cid, accountTarget)
end)

RegisterNetEvent("vrp-npcs:ped:receiptTradeInMarket")
AddEventHandler("vrp-npcs:ped:receiptTradeInMarket", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local cid = exports["isPed"]:isPed("cid")
  RPC.execute("vrp-inventory:tradeInReceiptsMarket", cid)
end)

RegisterNetEvent("vrp-npcs:ped:sellStolenItems")
AddEventHandler("vrp-npcs:ped:sellStolenItems", function()
  RPC.execute("vrp-inventory:sellStolenItems", false)
end)

RegisterNetEvent("vrp-npcs:ped:keeper")
AddEventHandler("vrp-npcs:ped:keeper", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerEvent("server-inventory-open", pArgs[1], "Shop")
end)
RegisterNetEvent("vrp-npcs:ped:keeperLiqour")
AddEventHandler("vrp-npcs:ped:keeperLiqour", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerEvent("server-inventory-open", pArgs[1], "Shop");
end)

TriggerServerEvent("vrp-npcs:location:fetch")

AddEventHandler("vrp-npcs:ped:weedSales", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local result, message = RPC.execute("vrp-npcs:weedShopOpen")
  if not result then
    TriggerEvent("DoLongHudText", message, 2)
    return
  end
  TriggerEvent("server-inventory-open", "44", "Shop");
end)

AddEventHandler("vrp-npcs:ped:licenseKeeper", function(pData)
  RPC.execute("vrp-npcs:purchaseDriversLicense", pData.type)
end)

AddEventHandler('vrp-island:hideBlips', function(pState)
  for _, data in pairs(Handler.npcs) do
    if data["npc"].blipHandler then
      data["npc"].blipHandler:hide(pState)
    end
  end
end)

local blip = nil

Citizen.CreateThread(function()
  -- Crafting Station
  exports["vrp-polytarget"]:AddBoxZone("pawnhub_craft_station", vector3(-729.42, -1123.45, 10.83), 1.8, 0.8, {
    heading = 34,
    minZ = 9.83,
    maxZ = 11.03,
    data = { id = "pawnhub_craft_station" }
  })

  exports["vrp-interact"]:AddPeekEntryByPolyTarget("pawnhub_craft_station", {{
    event = "vrp-business:client:pawnhub:openCraftStation",
    id = "pawnhub_craft_station",
    icon = "hammer",
    label = _L("interact-open-workbench", "Open Workbench"),
    parameters = { },
  }}, { distance = { radius = 3.5 }  })

  -- Table
  exports["vrp-polytarget"]:AddBoxZone("pawnhub_crush_items", vector3(-737.7, -1131.85, 10.83), 1.55, 0.55, {
    heading = 34,
    minZ = 9.83,
    maxZ = 10.83,
    data = { id = "pawnhub_crush_items" }
  })

  exports["vrp-interact"]:AddPeekEntryByPolyTarget("pawnhub_crush_items", {{
    event = "vrp-business:client:pawnhub:openToolTable",
    id = "pawnhub_crush_items",
    icon = "tools",
    label = _L("interact-open-workbench", "Open Table"),
    parameters = { },
  }}, { distance = { radius = 3.5 }  })


  exports["vrp-interact"]:AddPeekEntryByModel({ GetHashKey("prop_cs_heist_bag_02") }, {
    {
      id = "pawnhub_collect_cashbag",
      event = "vrp-business:client:pawnhub:pickupCash",
      icon = "hand-paper",
      label = "Collect Cash",
    }
  }, 
  { 
    distance = { radius = 2.5 },
    isEnabled = function(pEntity, pContext)
      local objInfo = exports["vrp-objects"]:GetObjectByEntity(pEntity)
      local hasAccess = HasPermission("pawnhub", "craft_access")
      return objInfo.data.metadata.isPawnshop and hasAccess
    end
  })

end)

local crushableItems = {
  ['stolenpsp'] = {
    name = 'PSP',
    miscParts = 1,
  },
  ['stolenart'] = {
    name = 'Art piece',
    miscParts = 10,
  },
  ['stolengameboy'] = {
    name = 'Gameboy',
    miscParts = 1,
  },
  ['stoleniphone'] = {
    name = 'Apple Iphone',
    miscParts = 1,
  },
  ['stolennokia'] = {
    name = 'Nokia Iphone',
    miscParts = 1,
  },
  ['stolenoakleys'] = {
    name = 'Oakley Sunglasses',
    miscParts = 1,
  },
  ['stolentv'] = {
    name = 'Flat Panel TV',
    miscParts = 10,
  },
  ['stolenmusic'] = {
    name = 'Music Equipment',
    miscParts = 5,
  },
  ['stolencomputer'] = {
    name = 'Computer',
    miscParts = 10,
  }
}


AddEventHandler("vrp-business:client:pawnhub:openCraftStation", function()
  local hasAccess = HasPermission("pawnhub", "craft_access")
  if not hasAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2, 12000, { i18n = { "Sorry you can't use this." } })

  end

  TriggerEvent("server-inventory-open", "42132", "Craft")
end)

AddEventHandler("vrp-business:client:pawnhub:openToolTable", function()
  local hasAccess = HasPermission("pawnhub", "craft_access")
  if not hasAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2, 12000, { i18n = { "Sorry you can't use this." } })
  end

  local context = {}

  local currentCrushables = {}
  for k,v in pairs(crushableItems) do
    local qty = exports["vrp-inventory"]:getQuantity(k)

    currentCrushables[#currentCrushables+1] = {
      title = v.name,
      titleRight = '1:' .. v.miscParts,
      icon = 'square',
      action = 'vrp-business:client:pawnhub:crushItem',
      key = {
        item = k
      }
    }
  end

  context[#context+1] = {
    title = 'Crush Items',
    icon = 'hammer',
    action = '',
    children = currentCrushables,
    key = { }
  }
  
  context[#context+1] = {
    title = 'Craft Relic',
    titleRight = '50 Misc Parts',
    icon = 'certificate',
    action = 'vrp-busines:client:pawnhub:craftRelic',
    key = { }
  }

  exports['vrp-ui']:showContextMenu(context)
end)

RegisterUICallback("vrp-business:client:pawnhub:crushItem", function(pData, cb)
  cb({ data = {}, meta = { ok = true, message = 'OK' } })

  local item = pData.key.item
  local qty = exports["vrp-inventory"]:getQuantity(item)
  
  if (qty < 1) then
    return TriggerEvent("DoLongHudText", "You don't have any " .. crushableItems[item].name .. " to crush.", 2, 12000, { i18n = { "You don't have any ", " to crush." } })
  end

  TriggerEvent("animation:PlayAnimation", "type")

  local finished = exports["vrp-taskbar"]:taskBar(15000, 'Crushing ' .. crushableItems[item].name .. '...')
  ClearPedTasks(PlayerPedId())

  if finished ~= 100 then
    return
  end

  local hasEnoughStill = exports["vrp-inventory"]:hasEnoughOfItem(item, qty, false, true);
  if not hasEnoughStill then return end

  TriggerEvent("inventory:removeItem", item, qty)
  TriggerEvent("player:receiveItem", "miscscrap", crushableItems[item].miscParts * qty)

  TriggerEvent("DoLongHudText", "You have crushed " .. qty .. " " .. crushableItems[item].name .. "'s.", 1, 12000, { i18n = { "You have crushed ", "'s." } })
end)

RegisterUICallback("vrp-busines:client:pawnhub:craftRelic", function(pData, cb)
  cb({ data = {}, meta = { ok = true, message = 'OK' } })

  local hasEnough = exports["vrp-inventory"]:hasEnoughOfItem('miscscrap', 50, false, true)
  if not hasEnough then
    return TriggerEvent("DoLongHudText", "You don't have enough misc scrap to craft a relic.", 2, 12000, { i18n = { "You don't have enough misc scrap to craft a relic." } })
  end

  TriggerEvent("animation:PlayAnimation", "type")

  local finished = exports["vrp-taskbar"]:taskBar(10000, 'Crafting a relic...')
  ClearPedTasks(PlayerPedId())

  if finished ~= 100 then
    return
  end

  local hasEnoughStill = exports["vrp-inventory"]:hasEnoughOfItem('miscscrap', 50, false, true)
  if not hasEnoughStill then
    return TriggerEvent("DoLongHudText", "You don't have enough misc scrap to craft a relic.", 2, 12000, { i18n = { "You don't have enough misc scrap to craft a relic." } })
  end

  TriggerEvent("inventory:removeItem", 'miscscrap', 50)

  TriggerServerEvent("vrp-gallery:craftJewelryItem", "relic", 0)

  return TriggerEvent("DoLongHudText", "Successfully crafted relic!", 1, 12000, { i18n = { "Successfully crafted relic!" } })
end)

RegisterNetEvent("vrp-business:client:pawnhub:giveStolenItems")
AddEventHandler("vrp-business:client:pawnhub:giveStolenItems", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local hasPawnHubAccess = exports["vrp-business"]:HasPermission("pawnhub", "hire")
  if not hasPawnHubAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2, 12000, { i18n = { "Sorry you can't use this." } })
  end

  local serverCode = exports["vrp-config"]:GetServerCode()
  TriggerEvent("server-inventory-open", "1", "Stolen-Goods-PH-" .. serverCode)
end)

RegisterNetEvent("vrp-business:client:pawnhub:sellStolenItems")
AddEventHandler("vrp-business:client:pawnhub:sellStolenItems", function()
  local hasPawnHubAccess = exports["vrp-business"]:HasPermission("pawnhub", "hire")
  if not hasPawnHubAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2, 12000, { i18n = { "Sorry you can't use this." } })
  end
  
  RPC.execute("vrp-inventory:sellStolenItems", hasPawnHubAccess)
end)

RegisterNetEvent("vrp-business:client:pawnhub:startRun")
AddEventHandler("vrp-business:client:pawnhub:startRun", function()
  local hasPawnHubAccess = exports["vrp-business"]:HasPermission("pawnhub", "hire")
  if not hasPawnHubAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2, 12000, { i18n = { "Sorry you can't use this." } })
  end
  
  local vehicleNearSpawn = IsAnyVehicleNearPoint(-647.46, -1156.08, 9.1, 5.0)
  if vehicleNearSpawn then
    return TriggerEvent("DoLongHudText", "A vehicle is blocking the vehicle area", 2, 12000, { i18n = { "A vehicle is blocking the vehicle area" } })
  end
  
  TriggerServerEvent("vrp-business:server:pawnhub:startRun")
end)

RegisterNetEvent("vrp-business:client:pawnhub:pickupCash")
AddEventHandler("vrp-business:client:pawnhub:pickupCash", function(_, _, pContext)
  local isInVehicle = IsPedInAnyVehicle(PlayerPedId(), false)
  if isInVehicle then
    return TriggerEvent("DoLongHudText", "Nice rat move pal UHM", 2, 12000, { i18n = { "Nice rat move pal UHM" } })
  end

  TriggerEvent("animation:PlayAnimation", "pickup")
  Wait(500)
  TriggerServerEvent("vrp-business:server:pawnhub:pickupCash", pContext.meta.id)
end)

RegisterNetEvent("vrp-business:client:pawnhub:getBalance")
AddEventHandler("vrp-business:client:pawnhub:getBalance", function(_, _, pContext)
  TriggerServerEvent("vrp-business:server:pawnhub:getBalance")
end)

RegisterNetEvent("vrp-business:client:pawnhub:pickupLocationMarked")
AddEventHandler("vrp-business:client:pawnhub:pickupLocationMarked", function(pCoords)
  RemoveBlip(blip)
  blip = AddBlipForCoord(pCoords)
  SetBlipSprite(blip, 306)
  SetBlipScale(blip, 0.8)
  SetBlipColour(blip, 3)
  SetBlipAsShortRange(blip, true)
  BeginTextCommandSetBlipName("STRING")
  AddTextComponentString("Current Task")
  EndTextCommandSetBlipName(blip)

  TriggerEvent("DoLongHudText", "Pickup location has been marked on your GPS.", 1, 12000, { i18n = { "Pickup location has been marked on your GPS." } })
end)

RegisterNetEvent("vrp-business:client:pawnhub:completedRun")
AddEventHandler("vrp-business:client:pawnhub:completedRun", function()
  RemoveBlip(blip)
  blip = nil
  
  TriggerEvent("DoLongHudText", "Successfully completed run!", 1, 12000, { i18n = { "Successfully completed run!" } })
end)

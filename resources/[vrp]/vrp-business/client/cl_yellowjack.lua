Citizen.CreateThread(function()
  local areStashesPublic = exports['vrp-config']:GetMiscConfig("business.stashes.public")
  if areStashesPublic then
    return
  end
  -- Drinks
  exports["vrp-polytarget"]:AddBoxZone("yellowjack_drinks", vector3(1981.84, 3053.1, 47.21), 2.4, 0.2, {
    heading = 330,
    minZ = 46.41,
    maxZ = 47.21,
    data = {
      id = "yellowjack_drinks",
    },
  })
  exports["vrp-interact"]:AddPeekEntryByPolyTarget("yellowjack_drinks", {{
    event = "vrp-business:client:openYellowjackDrinks",
    id = "yellowJackDrinks",
    icon = "circle",
    label = _L("restaurant-open", "Open"),
    parameters = { action = "openFridge" },
  }}, { distance = { radius = 3.5 }  })

end)

AddEventHandler("vrp-business:client:openYellowjackDrinks", function()
  local employed = IsEmployedAt("yellow_jack")
  if not employed then
    TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2)
    return
  end

  TriggerEvent('server-inventory-open', '42117', 'Shop')
end)

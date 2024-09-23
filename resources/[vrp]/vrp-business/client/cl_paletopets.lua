AddEventHandler("vrp-business:paletopets:openMenu", function(data)
  exports["vrp-companions"]:openAccessoryMenu(data.companionType, false)
end)

Citizen.CreateThread(function()

  exports["vrp-polytarget"]:AddBoxZone(
    "paleto_pets_vendor",
    vector3(-288.16, 6299.1, 31.49), 0.6, 1.4,
    {
      heading=45,
      minZ=30.29,
      maxZ=32.69
    }
  );

  local pets = exports["vrp-companions"]:getPetsWithAccessories()
  local items = {}
  for k, v in ipairs(pets) do
    items[#items + 1] = {
      event = "vrp-business:paletopets:openMenu",
      id = "paleto_pets_" .. v.type,
      icon = "book",
      label = "Browse " .. v.name .. " Accessories",
      parameters = {
        companionType = v.type
      }
    }
  end

  exports["vrp-interact"]:AddPeekEntryByPolyTarget(
    "paleto_pets_vendor",
    items,
    {
      distance = { radius = 2.0 }
    }
  )
end)

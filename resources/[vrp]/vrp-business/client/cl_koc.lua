Citizen.CreateThread(function()
  exports['vrp-polytarget']:AddBoxZone('koc_switch', vector3(87.83, -1420.01, 29.45), 0.5, 0.1,
                                      { heading = 321, minZ = 29.45, maxZ = 29.95, data = { id = '1' } })
  exports['vrp-interact']:AddPeekEntryByPolyTarget('koc_switch', {
    { event = 'vrp-business:koc:lights', id = 'koc_switch', icon = 'lightbulb', label = 'Switch' },
  }, {
    distance = { radius = 3.0 },
    isEnabled = function()
      return IsEmployedAt('kiki_organic_clothing')
    end,
  })
  TriggerEvent('vrp-business:koc:entitySet', 'default')
end)

AddEventHandler('vrp-business:koc:lights', function()
  local context = {
    { title = 'Default', icon = 'circle', action = 'vrp-business:koc:setEntitySet', key = 'default' },
    { title = 'Pink', icon = 'palette', action = 'vrp-business:koc:setEntitySet', key = 'pink' },
    { title = 'Pride', icon = 'rainbow', action = 'vrp-business:koc:setEntitySet', key = 'pride' },
  }
  exports['vrp-ui']:showContextMenu(context)
end)

RegisterUICallback('vrp-business:koc:setEntitySet', function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
  TriggerServerEvent('vrp-business:koc:setInteriorSet', data.key)
end)

local interiorSetNames = { ['default'] = 'set_xee_koc_white', ['pink'] = 'set_xee_koc_pink', ['pride'] = 'set_xee_koc_pride' }
RegisterNetEvent('vrp-business:koc:entitySet', function(set)
  local cInteriorId = GetInteriorAtCoords(87.2, -1419.6, 29.43)
  for _, v in pairs(interiorSetNames) do
    DeactivateInteriorEntitySet(cInteriorId, v)
  end
  ActivateInteriorEntitySet(cInteriorId, interiorSetNames[set])
  RefreshInterior(cInteriorId)
end)

AddEventHandler('vrp-spawn:characterSpawned', function()
  TriggerServerEvent('vrp-business:koc:getInteriorSet')
end)

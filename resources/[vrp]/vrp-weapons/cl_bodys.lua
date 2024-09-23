VPX.Events.on('vrp-weapons:talkToDealer', function()
  local currentGangInfo = exports['vrp-gangsystem']:GetCurrentGangInfo()
  if not currentGangInfo then
    return TriggerEvent('DoLongHudText', 'Looks at you confused...', 2)
  end

  local prices = VPX.Procedures.execute('vrp-weapons:getCurrentBodyPrices')
  local context = {}

  context[#context+1] = {
    title = 'What would you like to purchase?',
    icon = 'info-circle',
    action = '',
    key = {}
  }

  context[#context+1] = {
    title = 'Rifle Body 1x',
    titleRight = '$' .. prices.rifle,
    icon = 'circle',
    action = 'vrp-weapons:purchaseWeaponBody',
    disabled = true,
    key = { type = 'rifle' }
  }

  context[#context+1] = {
    title = 'SMG Body 1x',
    titleRight = '$' .. prices.smg,
    icon = 'circle',
    action = 'vrp-weapons:purchaseWeaponBody',
    disabled = true,
    key = { type = 'smg' }
  }

  context[#context+1] = {
    title = 'Pistol Parts 1x',
    titleRight = '$' .. prices.pistol,
    icon = 'circle',
    action = 'vrp-weapons:purchaseWeaponBody',
    key = { type = 'pistol' }
  }

  context[#context+1] = {
    title = 'Shotgun Body 1x',
    titleRight = '$' .. prices.shotgun,
    icon = 'circle',
    action = 'vrp-weapons:purchaseWeaponBody',
    key = { type = 'shotgun' }
  }

  exports['vrp-ui']:showContextMenu(context)
end)

RegisterUICallback('vrp-weapons:purchaseWeaponBody', function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })

  Wait(500)
  
  local bodyType = data.key.type

  local prompt = exports['vrp-ui']:OpenInputMenu({
    { label = 'Quantity', name = 'amount', type = 'text' },
  }, function(values)
      return values.amount and tonumber(values.amount) > 0
  end)

  if not prompt then return end

  VPX.Procedures.execute('vrp-weapons:purchaseWeaponBody', bodyType, prompt.amount)
end)

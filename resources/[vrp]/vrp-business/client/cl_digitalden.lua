local isSignedOn = false

local SignOn = {
    data = {
      {
        id = 'dd_sign_on',
        label = _L('interact-sign-in', 'sign in'),
        icon = 'lock',
        event = 'vrp-business:dd:jobState',
        parameters = { signIn = true },
      },
    },
    options = {
      npcIds = { 'digital_den_npc' },
      distance = { radius = 2.5 },
      isEnabled = function(pEntity, pContext)
        return IsEmployedAt("digital_den") and not isSignedOn
      end,
    },
}

local SignOff = {
    data = {
      {
        id = 'dd_sign_off',
        label = _L('interact-sign-out', 'sign out'),
        icon = 'lock-open',
        event = 'vrp-business:dd:jobState',
        parameters = { signIn = false },
      },
    },
    options = {
      npcIds = { 'digital_den_npc' },
      distance = { radius = 2.5 },
      isEnabled = function(pEntity, pContext)
        return IsEmployedAt("digital_den") and isSignedOn
      end,
    },
}

Citizen.CreateThread(function()
    exports["vrp-polyzone"]:AddBoxZone("vrp-business:digitalDenArea", vector3(1132.47, -471.99, 66.43), 25.0, 17.2, {
        heading=346,
        minZ=64.63,
        maxZ=75.23
    })

    exports["vrp-polytarget"]:AddBoxZone("vrp-business:digitalden:craft", vector3(1133.27, -471.38, 62.61), 1.0, 1.9, {
      name="advanced_tech_craft",
      heading=18,
      minZ=62.61,
      maxZ=63.11,
      data = {
        id = "1",
      },
    })

    exports['vrp-polytarget']:AddBoxZone('vrp-business:digitalden:recharge', vector3(1134.86, -466.76, 66.29), 0.5, 1.1, {
      heading=346,
      minZ=66.29,
      maxZ=66.79,
      data = {
        id = "1"
      }
    })

    exports["vrp-interact"]:AddPeekEntryByPolyTarget("vrp-business:digitalden:craft", {
      {
          id = "vrp-business:digitalden:craft",
          event = "vrp-business:digitalden:craft",
          icon = "hammer",
          label = "Craft"
      }
    },
    {
        distance = { radius = 2.5 },
        isEnabled = function ()
            return HasPermission("digital_den", "hire")
        end
    })

    exports["vrp-interact"]:AddPeekEntryByPolyTarget("vrp-business:digitalden:recharge", {
      {
          id = "vrp-business:digitalden:recharge",
          event = "vrp-business:digitalden:recharge",
          icon = "charging-station",
          label = "Recharger"
      }
    },
    {
        distance = { radius = 2.5 },
        isEnabled = function ()
            return HasPermission("digital_den", "craft_access")
        end
    })

    exports['vrp-interact']:AddPeekEntryByFlag({ 'isNPC' }, SignOn.data, SignOn.options)
    exports['vrp-interact']:AddPeekEntryByFlag({ 'isNPC' }, SignOff.data, SignOff.options)
end)

AddEventHandler("vrp-npcs:ped:openDigitalDenShop", function()
    local canOpen = RPC.execute("vrp-business:digitalDen:canUseNPC")

    if canOpen then
        TriggerEvent("server-inventory-open", "42073", "Shop")
    else
        TriggerEvent("DoLongHudText", _L("dd-speak-to-employee", "Please speak to one of our other employees."))
    end
end)

AddEventHandler("vrp-business:dd:jobState", function(pParams, pEntity, pContext)
    isSignedOn = RPC.execute("vrp-business:digitalDen:toggleJob", pParams.signIn)
end)

AddEventHandler("vrp-business:digitalden:craft", function(pParams, pEntity, pContext)
  local hasPermission = HasPermission("digital_den", "hire")
  if not hasPermission then return end
  TriggerEvent("server-inventory-open", "42122", "Craft")  
end)

AddEventHandler('vrp-business:digitalden:recharge', function()
  local hasPermission = HasPermission("digital_den", "craft_access")
  if not hasPermission then return end
  local invName = 'container-recharger-Recharger-recharger'
  TriggerEvent("inventory-open-container", invName, 10, 250.0)
end)

AddEventHandler('vrp-inventory:closed', function(pName)
  if pName ~= 'container-recharger-Recharger-recharger' then return end

  TriggerServerEvent('vrp-business:digitalden:checkRechargeState')
end)

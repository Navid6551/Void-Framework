local isSignedOn = false



local SignOn = {
    data = {
      {
        id = 'pp_sign_on',
        label = _L('interact-sign-in', 'sign in'),
        icon = 'lock',
        event = 'vrp-business:pp:jobState',
        parameters = { signIn = true },
      },
    },
    options = {
      npcIds = {},
      distance = { radius = 1.25 },
      isEnabled = function(pEntity, pContext)
        return exports['vrp-business']:IsEmployedAt('pixel_perfect') and not isSignedOn
      end,
    },
}
local SignOff = {
    data = {
      {
        id = 'pp_sign_off',
        label = _L('interact-sign-out', 'sign out'),
        icon = 'lock-open',
        event = 'vrp-business:pp:jobState',
        parameters = { signIn = false },
      },
    },
    options = {
      npcIds = {},
      distance = { radius = 1.25 },
      isEnabled = function(pEntity, pContext)
        return exports['vrp-business']:IsEmployedAt('pixel_perfect') and isSignedOn
      end,
    },
}
local OpenShop = {
    data = {{
        id = "pixel_perfect_npc_peek",
        label = _L("interact-pixel-perfect-shop", "Open Shop"),
        icon = "circle",
        event = "vrp-npcs:ped:openPixelPerfectShop",
    }},
    options = {
        npcIds = {},
        distance = { radius = 1.25 }
    }
}

Citizen.CreateThread(function()
  CUSTOM_SHOPS['pixel_perfect'] = function (coords, heading)
      local serverCode = 'wl'
      if serverCode == "wl" or serverCode == "dev" then
        if coords == nil or heading == nil then return end
        local data = {
            id = "pixel_perfect_npc_"..math.random(10000)..'x'..math.random(10000),
            name = "Pixel Perfect",
            pedType = 4,
            model = "a_m_y_stwhi_02",
            networked = false,
            distance = 50.0,
            position = {
            coords = coords,
            heading = heading,
            random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
            scenario = "WORLD_HUMAN_STAND_MOBILE_UPRIGHT"
        }

        local seller = exports["vrp-npcs"]:RegisterNPC(data, "vrp-build")
        exports["vrp-npcs"]:EnableNPC(seller.id)
        CURRENT_NPC[seller.id] = true

        SignOn.options.npcIds = { seller.id }
        SignOff.options.npcIds = { seller.id }
        OpenShop.options.npcIds = { seller.id }

        exports['vrp-interact']:AddPeekEntryByFlag({ 'isNPC' }, SignOn.data, SignOn.options)
        exports['vrp-interact']:AddPeekEntryByFlag({ 'isNPC' }, SignOff.data, SignOff.options)
        exports['vrp-interact']:AddPeekEntryByFlag({ 'isNPC' }, OpenShop.data, OpenShop.options)
    end
  end
end)

RegisterNetEvent("vrp-editor:openCraft")
AddEventHandler("vrp-editor:openCraft", function()
  local success = RPC.execute("vrp-business:hasPermission", "pixel_perfect", "craft_access")
    if not success and isPD() then
      success = getPDAuthCode()
    end
    if success then
        TriggerEvent("server-inventory-open", "42130", "Craft")
        return
    else
      TriggerEvent("DoLongHudText", "Not allowed", 2)
    end
  end)

AddEventHandler("vrp-npcs:ped:openPixelPerfectShop", function()
    local canOpen = RPC.execute("vrp-business:pixelPerfect:canUseNPC")

    if canOpen then
        TriggerEvent("server-inventory-open", "42129", "Shop")
    else
        TriggerEvent("DoLongHudText", _L("pp-speak-to-employee", "Please speak to one of our other employees."))
    end
end)

AddEventHandler("vrp-business:pp:jobState", function(pParams, pEntity, pContext)
    isSignedOn = RPC.execute("vrp-business:pixelPerfect:toggleJob", pParams.signIn)
end)

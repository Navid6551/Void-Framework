local loggedIn = false
local takenTowel = false


function logIn()
  if loggedIn then
    TriggerEvent("DoLongHudText", "You're already logged in to Mitch.tv", 2)
    return
  end

  RefreshEmploymentList();
  HasPermission("vu", "craft_access")
  if not IsEmployedAt("vanilla_unicorn") then
    TriggerEvent("DoLongHudText", "Mitch.tv is only available for Mitch Mods and VIP Members", 2)
    return
  end

  loggedIn, message = RPC.execute("vrp-business:vu:addStreamer")

  if not loggedIn then
    TriggerEvent("DoLongHudText", message, 2)
    return
  end

  takenTowel = false
  TriggerEvent("DoLongHudText", "Go fetch yourself a towel..", 1)

  Citizen.CreateThread(function()
  	while loggedIn do
      local waitTime = math.random(240000, 480000)
      Wait(waitTime)
      loggedIn = RPC.execute("vrp-business:vu:isLoggedIn") -- ensure they're still logged in
      if not loggedIn then
        logOut()
        return
      end
      local payment = 0
      if hasTowel("yellow") and hasItems("markedbills", 20) then
        TriggerEvent("inventory:removeItem", "markedbills", 20)
        payment = payment + (250 * 20) -- $5k / $250 per
      elseif hasTowel("purple") and hasItems("rollcash", 20) then
        TriggerEvent("inventory:removeItem", "rollcash", 5)
        payment = payment + (30 * 5) -- $150 / $30 per
      elseif hasTowel("green") and hasItems("band", 5) then
        TriggerEvent("inventory:removeItem", "band", 5)
        payment = payment + (300 * 5) -- $1500, / $300 per
      end
      TriggerEvent("client:newStress", false, math.random(100, 250))
      if payment ~= 0 then
        -- do payment
        TriggerServerEvent('complete:job', payment, 'v' .. tostring(math.random(1, 10)))
      end
    end
  end)
end


function logOut()
  local loggedOut = RPC.execute("vrp-business:vu:removeStreamer")
  if not loggedOut then
    return
  end
  doLogout()
end


function doLogout()
  loggedIn = false
  takenTowel = false
  TriggerEvent("DoLongHudText", "You have been logged out of Mitch.tv", 1)
  destroyTowels()
end


function destroyTowels()
  local qty = exports["vrp-inventory"]:getQuantity("vu_towel_purple")
  if qty and qty > 0 then
    TriggerEvent("inventory:removeItem", "vu_towel_purple", qty)
  end
  qty = exports["vrp-inventory"]:getQuantity("vu_towel_yellow")
  if qty and qty > 0 then
    TriggerEvent("inventory:removeItem", "vu_towel_yellow", qty)
  end
  qty = exports["vrp-inventory"]:getQuantity("vu_towel_green")
  if qty and qty > 0 then
    TriggerEvent("inventory:removeItem", "vu_towel_green", qty)
  end
end


function pickUpTowel(params)
  loggedIn = RPC.execute("vrp-business:vu:isLoggedIn") 
  if not loggedIn then
    TriggerEvent("DoLongHudText", "You must be logged in to Mitch.tv", 2)
    return
  end

  if takenTowel then
    TriggerEvent("DoLongHudText", "You've already taken a towel.", 2)
    return
  end

  takenTowel = true
  TriggerEvent("player:receiveItem", "vu_towel_" .. params.color , 1)
end


function hasItems(id, quantity)
  return exports["vrp-inventory"]:hasEnoughOfItem(id, quantity, false)
end


function hasTowel(color)
  return hasItems("vu_towel_" .. color, 1)
end


local listening = false
function listenForDJKeypress(type, data)
  listening = true
  Citizen.CreateThread(function()
    while listening do
      if IsControlJustReleased(0, 38) then
        TriggerEvent("vrp-music:showBroadcastContextMenu", "vanilla_unicorn")
      end
      Wait(0)
    end
  end)
end


AddEventHandler("vrp-polyzone:enter", function(name, data)
  if name == "vanilla_unicorn" then
    exports["vrp-flags"]:SetPedFlag(PlayerPedId(), "isInsideVanillaUnicorn", true) -- keeping for legacy
    TriggerEvent("vrp-music:subscribe", "vanilla_unicorn");
    return
  end
  if name == "vu_dj" then
    listenForDJKeypress(name, data)
    exports["vrp-ui"]:showInteraction("[E] DJ")
  end
end)


AddEventHandler("vrp-polyzone:exit", function(name, data)
  if name == "vanilla_unicorn" then
    exports["vrp-flags"]:SetPedFlag(PlayerPedId(), "isInsideVanillaUnicorn", false) -- keeping for legacy
    TriggerEvent("vrp-music:unsubscribe");
    return
  end
  if name == "vu_dj" then
    listening = false
    exports["vrp-ui"]:hideInteraction()
  end
end)


AddEventHandler("vrp-business:vu:login", logIn)
AddEventHandler("vrp-business:vu:logout", logOut)
AddEventHandler("vrp-business:vu:towel", pickUpTowel)
AddEventHandler("vrp-business:vu:grabDrink", grabDrink)
AddEventHandler("vrp-business:vu:openFridge", openFridge)
RegisterNetEvent("vrp-business:vu:logoutRemote")
AddEventHandler("vrp-business:vu:logoutRemote", doLogout)


CreateThread(function()

  -- laptop
  exports["vrp-interact"]:AddPeekEntryByPolyTarget(
    "vu_laptop",
    {
      {
        event = "vrp-business:vu:login",
        id = "vu_login",
        icon = "laptop-medical",
        label = "Log in to Mitch.tv"
      },
      {
        event = "vrp-business:vu:logout",
        id = "vu_logout",
        icon = "laptop",
        label = "Log out of Mitch.tv"
      }
    },
    {
      distance = { radius = 2.0 }
    }
  )

  -- towels
  exports["vrp-interact"]:AddPeekEntryByPolyTarget(
    "vu_towels",
    {
      {
        event = "vrp-business:vu:towel",
        id = "vu_towel_purple",
        icon = "align-justify",
        label = "Take a Purple Towel",
        parameters = {
          color = "purple"
        }
      },
      {
        event = "vrp-business:vu:towel",
        id = "vu_towel_yellow",
        icon = "align-justify",
        label = "Take a Yellow Towel",
        parameters = {
          color = "yellow"
        }
      },
      {
        event = "vrp-business:vu:towel",
        id = "vu_towel_green",
        icon = "align-justify",
        label = "Take a Green Towel",
        parameters = {
          color = "green"
        }
      }
    },
    {
      distance = { radius = 2.0 },
      isEnabled = function(pEntity, pContext)
        return loggedIn
      end
    }
  )

end)

local currentBoardUrl = nil
local dui = nil
local inOffice = false

local allowedToChangeBoard = {
  [1052] = true,
  [4916] = true
}

Citizen.CreateThread(function()
  -- llibrary_office
  exports["vrp-polyzone"]:AddBoxZone("llibrary_office", vector3(1151.18, -419.64, 67.48), 8.0, 10.2, {
    heading = 344.0,
    minZ = 66.28,
    maxZ = 70.08,
    data = {
      id = "llibrary_office"
    }
  })

  -- Whiteboard for class room
  exports["vrp-polytarget"]:AddBoxZone("llibary_switch", vector3(1156.19, -417.77, 67.48), 1, 1, {
    heading = 345.0,
    minZ = 67.28,
    maxZ = 68.08,
    data = {
      id = "llibary_switch"
    }
  })

  exports["vrp-interact"]:AddPeekEntryByPolyTarget("llibary_switch", {{
    event = "vrp-business:client:changeLLibraryBoard",
    id = "llibary_switch",
    icon = "circle",
    label = "Weird looking button",
    parameters = { }
  }}, {
    distance = { radius = 2.5 },
    isEnabled = function()
      return true
    end
  })
end)

AddEventHandler("vrp-polyzone:enter", function(pZone)
  if pZone ~= "llibrary_office" then return end
  inOffice = true
  TriggerServerEvent("vrp-business:server:requestLLibraryBoard")
end)

AddEventHandler("vrp-polyzone:exit", function(pZone)
  if pZone ~= "llibrary_office" then return end

  if dui ~= nil then
    exports["vrp-lib"]:releaseDui(dui.id)
    dui = nil
  end

  inOffice = false
end)


RegisterUICallback("vrp-business:ui:changeLLibraryBoard", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "" } })
  exports["vrp-ui"]:closeApplication("textbox")
  TriggerServerEvent("vrp-business:server:changeLLibraryBoard", data.values.url)
end)

RegisterNetEvent("vrp-business:client:updateLLibraryBoard")
AddEventHandler("vrp-business:client:updateLLibraryBoard", function(pUrl)
  if not inOffice then return end
  
  currentBoardUrl = pUrl

  if not dui then
    dui = exports["vrp-lib"]:getDui(currentBoardUrl, 512, 512)
    AddReplaceTexture("liquidlibrary", "bounty", dui.dictionary, dui.texture)
  else
    exports["vrp-lib"]:changeDuiUrl(dui.id, currentBoardUrl)
  end
end)

AddEventHandler("vrp-business:client:changeLLibraryBoard", function(pParams)
  local cid = exports["isPed"]:isPed("cid")
  local serverCode = exports["vrp-config"]:GetServerCode()

  if not allowedToChangeBoard[cid] or serverCode ~= 'wl' then
    return TriggerEvent("DoLongHudText", "Seems to be stuck.", 2)
  end
  
  exports["vrp-ui"]:openApplication("textbox", {
    callbackUrl = "vrp-business:ui:changeLLibraryBoard",
    key = 1,
    items = {
      {
        icon = "circle",
        label = "URL",
        name = "url",
      },
    },
    show = true,
  })
end)

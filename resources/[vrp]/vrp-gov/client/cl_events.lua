RegisterNetEvent("vrp-gov:resetLicensesCache")
AddEventHandler("vrp-gov:resetLicensesCache", function(pCharacterId)
  resetLicensesCache(pCharacterId)
end)

local activeUrl = nil
local dui = nil
local inZone = false

CreateThread(function ()
  exports["vrp-polyzone"]:AddBoxZone("court_house", vector3(-525.19, -178.48, 38.22), 21.4, 21.2, {
    name="ch",
    heading=209,
    minZ=37.02,
    maxZ=46.22
  })
end)

AddEventHandler("vrp-polyzone:enter", function(zone)
  if zone ~= "court_house" then return end
  inZone = true
  if not activeUrl then
    local url = RPC.execute("vrp-gov:getScreenUrl")
    if not url then return end
    activeUrl = url
  end

  dui = exports["vrp-lib"]:getDui(activeUrl, 512, 512)
  AddReplaceTexture("np_town_hall_bigscreen", "projector_screen", dui.dictionary, dui.texture)
end)

AddEventHandler("vrp-polyzone:exit", function(zone)
  if zone ~= "court_house" then return end
  inZone = false
  if dui then
    exports["vrp-lib"]:releaseDui(dui.id)
    RemoveReplaceTexture("np_town_hall_bigscreen", "projector_screen")
    dui = nil
  end
end)

RegisterNetEvent("vrp-gov:changeScreenImage")
AddEventHandler("vrp-gov:changeScreenImage", function(pUrl)
  activeUrl = pUrl
  if not inZone then return end
  if pUrl then
    if not dui then
      dui = exports["vrp-lib"]:getDui(pUrl, 512, 512)
      AddReplaceTexture("np_town_hall_bigscreen", "projector_screen", dui.dictionary, dui.texture)
    else
      exports["vrp-lib"]:changeDuiUrl(dui.id, pUrl)
    end
    return
  end
  if not pUrl and dui then
    exports["vrp-lib"]:releaseDui(dui.id)
    RemoveReplaceTexture("np_town_hall_bigscreen", "projector_screen")
    dui = nil
  end
end)

RegisterNetEvent("vrp-gov:newStateAnnouncement", function()
  local context = {}
  for _, aType in pairs(AnnouncementTypes) do
    context[#context + 1] = { title = aType.label, description = "[" .. aType.label .. "]" .. " <text>", icon = aType.icon, action = "vrp-gov:ui:stateAnnouncement", key = aType.name }
  end

  exports["vrp-ui"]:showContextMenu(context)
end)

RegisterUICallback("vrp-gov:ui:stateAnnouncement", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  Wait(0)

  local prompt = exports["vrp-ui"]:OpenInputMenu({ { name = "text", _type = "textarea", label = "Text", icon = "pencil-alt", maxLength = 500, } }, function(values)
    return values and values.text and #values.text > 0
  end)

  if not prompt then return end

  NPX.Procedures.execute("vrp-gov:stateAnnouncement", prompt.text, data.key)
end)

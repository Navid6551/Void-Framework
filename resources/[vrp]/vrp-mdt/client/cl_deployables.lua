local lastPlace = 0
local _isTrusted = nil

function IsTrusted()
  if _isTrusted == nil then
    _isTrusted = NPX.Procedures.execute("vrp-deployables:isTrustedCharacter")
  end
  return _isTrusted
end

AddEventHandler("vrp-spawn:characterSpawned", function()
  _isTrusted = nil
end)

AddEventHandler("vrp-inventory:itemUsed", function(pItem)
  local info = exports["vrp-inventory"]:itemListInfo(pItem)
  info = json.decode(info)

  if not info.deployableObject then return end

  if IsPedInAnyVehicle(PlayerPedId(), false) then 
    return TriggerEvent("DoLongHudText", "You cannot do that.", 2)
  end

  local isTrusted = IsTrusted()
  if not isTrusted then
    local finished = exports["vrp-taskbar"]:taskBar(10000, "Preparing to deploy " .. info.displayname)
    if finished ~= 100 then return end
  end

  local cid = exports["isPed"]:isPed("cid")
  local result = exports['vrp-objects']:PlaceAndSaveObject(
    info.deployableObject,
    { cid = cid, item = pItem, deployable = true },
    { groundSnap = true, allowHousePlacement = true, allowGizmo = isTrusted },
    function(pCoords, pMaterial, pEntity)
      return not IsPedInAnyVehicle(PlayerPedId(), false)
    end,
    "objects",
    info.deployableExpires
  )

  if not result then return end

  local stillhasItem = exports['vrp-inventory']:hasEnoughOfItem(pItem, 1, false, true)

  if not stillhasItem then
    return exports["vrp-objects"]:DeleteObject(result)
  end

  TriggerEvent("inventory:removeItem", pItem, 1)

  lastPlace = GetGameTimer()
end)

AddEventHandler("vrp-deployables:pickup", function(p1, p2, p3)
  local cid = p3.meta.data.metadata.cid
  local myCid = exports["isPed"]:isPed("cid")
  if (cid ~= myCid) and (cid ~= -1) then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  local id = p3.meta.id
  exports["vrp-objects"]:DeleteObject(id)
  TriggerEvent("player:receiveItem", p3.meta.data.metadata.item, 1)
end)

AddEventHandler("vrp-deployables:remove", function(p1, p2, p3)
  local cid = p3.meta.data.metadata.cid
  local myCid = exports["isPed"]:isPed("cid")
  if (cid ~= myCid) and (cid ~= -1) then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  local finished = exports["vrp-taskbar"]:taskBar(5000, "Removing")
  if finished ~= 100 then return end
  local id = p3.meta.id
  exports["vrp-objects"]:DeleteObject(id)
end)

Citizen.CreateThread(function()
  Citizen.Wait(5000)
  local items = exports["vrp-inventory"]:getFullItemList()
  local models = {}
  for _, item in pairs(items) do
    if item.deployableObject then
      models[#models + 1] = GetHashKey(item.deployableObject)
    end
  end
  exports["vrp-interact"]:AddPeekEntryByModel(models, {
    {
      id = "pickupdeployable",
      event = "vrp-deployables:pickup",
      icon = "circle",
      label = "Grab",
    },
  }, {
    distance = { radius = 25.0 },
    -- ns = "vrp-deployables",
    meta = {
      deployable = true,
      cid = function (owner, metadata)
        local myCid = exports["isPed"]:isPed("cid")
        return owner == myCid
      end
    },
    isEnabled = function(p1, p2)
      return ((p2
        and p2.meta
        and p2.meta.data
        and p2.meta.data.metadata
        and p2.meta.data.metadata.item) and (lastPlace + 60000) > GetGameTimer()) and true or false
    end,
  })
  exports["vrp-interact"]:AddPeekEntryByModel(models, {
    {
      id = "removedeployable",
      event = "vrp-deployables:remove",
      icon = "circle",
      label = "Remove",
    },
  }, {
    distance = { radius = 25.0 },
    meta = {
      deployable = true,
      cid = function (owner, metadata)
        local myCid = exports["isPed"]:isPed("cid")
        return owner == myCid
      end
    }
  })
  exports["vrp-interact"]:AddPeekEntryByModel({`gr_prop_gr_bench_02b` }, {
    {
      id = "c2benchinteract",
      event = "vrp-deployables:openC2Bench",
      icon = "circle",
      label = "Craft",
    },
  }, {
    distance = { radius = 2.5 },
    meta = { deployable = true, item = "deploy_bench_c2" },
  })
  exports["vrp-interact"]:AddPeekEntryByModel({ `prop_fib_clipboard` }, {
    {
      id = "receiptsconfigure",
      event = "vrp-deployables:receiptsSetBusiness",
      icon = "circle",
      label = "Set Business",
    },
    {
      id = "receiptsconfiguredistancesm",
      event = "vrp-deployables:receiptsSetDistance",
      icon = "circle",
      label = "Set Distance - Small",
      parameters = { 25 },
    },
    {
      id = "receiptsconfiguredistancemd",
      event = "vrp-deployables:receiptsSetDistance",
      icon = "circle",
      label = "Set Distance - Medium",
      parameters = { 50 },
    },
    {
      id = "receiptsconfiguredistancelg",
      event = "vrp-deployables:receiptsSetDistance",
      icon = "circle",
      label = "Set Distance - Large",
      parameters = { 100 },
    },
    {
      id = "receiptsconfiguredistancemg",
      event = "vrp-deployables:receiptsSetDistance",
      icon = "circle",
      label = "Set Distance - Mega",
      parameters = { 200 },
    },
    {
      id = "receiptsconfiguremaxemp2",
      event = "vrp-deployables:receiptsSetMaxEmployees",
      icon = "circle",
      label = "Set Max Employees (2)",
      parameters = { 2 },
    },
    {
      id = "receiptsconfiguremaxemp5",
      event = "vrp-deployables:receiptsSetMaxEmployees",
      icon = "circle",
      label = "Set Max Employees (5)",
      parameters = { 5 },
    },
    {
      id = "receiptsconfiguremaxemp6",
      event = "vrp-deployables:receiptsSetMaxEmployees",
      icon = "circle",
      label = "Set Max Employees (6)",
      parameters = { 6 },
    },
    {
      id = "receiptsconfiguremaxemp10",
      event = "vrp-deployables:receiptsSetMaxEmployees",
      icon = "circle",
      label = "Set Max Employees (10)",
      parameters = { 10 },
    },
  }, {
    distance = { radius = 2.5 },
    meta = {
      deployable = true,
      item = "deploy_business_receipts",
      cid = function (owner, metadata)
        local myCid = exports["isPed"]:isPed("cid")
        return owner == myCid
      end
    },
  })
  exports["vrp-interact"]:AddPeekEntryByModel({ `prop_fib_clipboard` }, {
    {
      id = "receiptsconfiguresigin",
      event = "vrp-deployables:receiptsSignIn",
      icon = "circle",
      label = "Sign in",
    },
    {
      id = "receiptsconfiguresigout",
      event = "vrp-deployables:receiptsSignOut",
      icon = "circle",
      label = "Sign out",
    },
  }, {
    distance = { radius = 2.5 },
    meta = {
      deployable = true,
      item = "deploy_business_receipts",
    },
  })

  exports["vrp-interact"]:AddPeekEntryByModel({ `v_ind_cs_tray01` }, {
    {
      id = "deployabletrayinteract",
      event = "vrp-deployables:openTray",
      icon = "circle",
      label = "open",
    },
  }, {
    distance = { radius = 2.5 },
    meta = {
      deployable = true,
      item = "deployable_tray",
    },
  })
end)

AddEventHandler("vrp-deployables:openC2Bench", function()
  local progressionData = exports["vrp-progression"]:GetProgression("crafting:guns")
  if progressionData == nil or progressionData < 1 then
    progressionData = 1
  end 
  local index = 1

  if progressionData >= 1 and progressionData <= 2000 then index = 1 end
  if progressionData >= 2001 and progressionData <= 7500 then index = 2 end
  if progressionData >= 7501 and progressionData <= 14000 then index = 3 end
  if progressionData >= 14001 then index = 4 end
  if progressionData >= 50000 then index = 5 end

  local craftingIndex = {
      [1] = "38",
      [2] = "39",
      [3] = "40",
      [4] = "41",
      [5] = "411",
  }

  TriggerEvent("server-inventory-open", craftingIndex[1], "Craft-"..index);
end)

--
function isReceiptClipboard(p2)
  return p2 and p2.meta and p2.meta.data and p2.meta.data.metadata and p2.meta.data.metadata.item == "deploy_business_receipts"
end
AddEventHandler("vrp-deployables:receiptsSetBusiness", function(p1, p2, p3)
  if not isReceiptClipboard(p3) then return end
  local data = p3.meta.data.metadata
  local objectId = p3.meta.id
  local success, businesses = RPC.execute("GetBusinesses")
  if not success then
    return TriggerEvent("DoLongHudText", "Error while fetching businesses", 2)
  end
  local businessOptions = {}
  for _, business in pairs(businesses) do
    businessOptions[#businessOptions+1] = {
      name = business.name,
      id = business.code
    }
  end
  local creationMenu = {
    key = objectId,
    show = true,
    callbackUrl = "vrp-deployables:receiptsSetBusiness",
    items = {
      {
        icon = "id-card",
        _type = "select",
        name = "businessCode",
        label = "Select Business",
        options = businessOptions,
      },
    },
  }
  exports["vrp-ui"]:openApplication("textbox", creationMenu)
end)
RegisterUICallback("vrp-deployables:receiptsSetBusiness", function(pData, pCb) 
  pCb({ data = {}, meta = { ok = true, message = "done" } })
  exports["vrp-ui"]:closeApplication("textbox")

  local objectId = pData.key
  local businessCode = pData.values.businessCode
  if businessCode == nil or businessCode == "" then
    return TriggerEvent("DoLongHudText", "Invalid/No business code", 2)
  end

  RPC.execute('vrp-deployables:changeObjectData', objectId, {
    business = businessCode,
  })
end)
AddEventHandler("vrp-deployables:receiptsSetDistance", function(p1, p2, p3)
  if not isReceiptClipboard(p3) then return end
  local data = p3.meta.data.metadata
  local objectId = p3.meta.id
  local distance = p1[1]
  RPC.execute('vrp-deployables:changeObjectData', objectId, {
    distance = distance,
  })
end)
AddEventHandler("vrp-deployables:receiptsSetMaxEmployees", function(p1, p2, p3)
  if not isReceiptClipboard(p3) then return end
  local data = p3.meta.data.metadata
  local objectId = p3.meta.id
  local maxEmployees = p1[1]
  RPC.execute('vrp-deployables:changeObjectData', objectId, {
    maxEmployees = maxEmployees,
  })
end)

local isSignedIn = false
local signedInBusiness = nil
AddEventHandler("vrp-deployables:receiptsSignIn", function(p1, p2, p3)
  if not isReceiptClipboard(p3) then return end
  if isSignedIn then return end
  local data = p3.meta.data.metadata
  local distance = data.distance or 10
  isSignedIn = true
  signedInBusiness = data.business
  Citizen.CreateThread(function()
    while isSignedIn and (#(GetEntityCoords(PlayerPedId()) - GetEntityCoords(p2)) < distance) do
      Wait(15000)
    end
    if isSignedIn then
      isSignedIn = false
      TriggerEvent("vrp-business:receipts:clockOutAlt", signedInBusiness)
    end
  end)
  local data = p3.meta.data.metadata
  TriggerEvent("vrp-business:receipts:clockInAlt", data.business, data.maxEmployees or 5)
end)
AddEventHandler("vrp-deployables:receiptsSignOut", function(p1, p2, p3)
  if not isReceiptClipboard(p3) then return end
  isSignedIn = false
  local data = p3.meta.data.metadata
  TriggerEvent("vrp-business:receipts:clockOutAlt", data.business)
end)

AddEventHandler('vrp-deployables:openTray', function(pParameters, pEntity, pContext)
  local id = pContext.meta.id
  if not id then return end

  TriggerEvent('server-inventory-open', '1', 'trays_' .. (id):sub(1,6) .. '-tray', 110, 10)
end)

SIGNED_IN = false
CURRENT_RESTAURANT = nil
SERVER_CODE = 'wl'

local activePurchases = {}

local debugMode = GetConvar('sv_environment', 'prod') == 'debug'

function isSignedOn()
    return SIGNED_IN or CURRENT_RESTAURANT == 'prison_cooks'
end

function signOff()
    SIGNED_IN = false
    TriggerEvent("DoLongHudText", _L("restaurant-clocked-out", "Clocked out."))
end

AddEventHandler('vrp-restaurants:signOnPrompt', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    local type = pContext.zones['restaurant_sign_on'].type
    SIGNED_IN, langString, message = RPC.execute("vrp-restaurants:joinJob", biz, type)
    TriggerEvent("DoLongHudText", _L(langString, message))
end)

AddEventHandler('vrp-restaurants:signOffPrompt', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    RPC.execute("vrp-restaurants:leaveJob", biz)
    signOff()
end)

RegisterNetEvent('vrp-restaurants:forceLeaveJob', function()
    signOff()
end)

AddEventHandler('vrp-restaurants:viewActiveEmployees', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    local employees = RPC.execute('vrp-restaurants:getActiveEmployees', biz)

    local mappedEmployees = {}

    for _, employee in pairs(employees) do
        local fancyLocationName = GetBusinessConfig(biz).name
        table.insert(mappedEmployees, {
            title = string.format("%s (%s)", employee.name, employee.cid),
            description = string.format(_L("restaurant-clocked-in-at", "Clocked in at %s"), fancyLocationName),
        })
    end
    if #mappedEmployees == 0 then
        table.insert(mappedEmployees, {
            title = _L("restaurant-no-active-employees", "Nobody is clocked in currently"),
        })
    end

    exports['vrp-ui']:showContextMenu(mappedEmployees)
end)

AddEventHandler('vrp-restaurants:makePayment', function(pParameters, pEntity, pContext)
    local id, biz
    local isNotRestaurant = false

    if pParameters and pParameters.isEditorPeek then
        id = exports["vrp-housing"]:getOwnerOfCurrentProperty()
        biz = exports["vrp-housing"]:getCurrentPropertyID()
        isNotRestaurant = true
    else
        id = pContext.zones['restaurant_registers'].id
        biz = pContext.zones['restaurant_registers'].biz
    end

    if id == nil or biz == nil then return end

    local activeRegisterId = id
    local activeRegister = activePurchases[activeRegisterId]
    if not activeRegister or activeRegister == nil then
        TriggerEvent("DoLongHudText", _L("restaurant-no-active-purchase", "No purchase active."))
        return
    end
    local priceWithTax = RPC.execute("PriceWithTaxString", activeRegister.cost, "Goods")
    local acceptContext = {
        {
            i18nTitle = true,
            title = _L("restaurant-make-payment", "Register Purchase"),
            description = "$" .. priceWithTax.text .. " | " .. activeRegister.comment,
        },
        {
            i18nTitle = true,
            title = _L("restaurant-accept-purchase", "Purchase with Bank"),
            action = "vrp-restaurants:finishPurchasePrompt",
            icon = 'credit-card',
            key = {cost = activeRegister.cost, comment = activeRegister.comment, registerId = id, charger = activeRegister.charger, biz = biz, cash = false, isNotRestaurant = isNotRestaurant},
        },
        {
            i18nTitle = true,
            title = _L("restaurant-cash-purchase", "Purchase with Cash"),
            action = "vrp-restaurants:finishPurchasePrompt",
            icon = 'money-bill',
            key = {cost = activeRegister.cost, comment = activeRegister.comment, registerId = id, charger = activeRegister.charger, biz = biz, cash = true, isNotRestaurant = isNotRestaurant},
        }
    }
    exports['vrp-ui']:showContextMenu(acceptContext)
end)

RegisterUICallback('vrp-restaurants:finishPurchasePrompt', function (data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local success = RPC.execute("vrp-restaurants:completePurchase", data.key)
    if not success then
        TriggerEvent("DoLongHudText", _L("restaurant-could-not-complete-purchase", "The purchase could not be completed."))
    end
end)

AddEventHandler('vrp-restaurants:chargeCustomer', function(pParameters, pEntity, pContext)
    local id, biz

    if pParameters.isEditorPeek then
        id = exports["vrp-housing"]:getOwnerOfCurrentProperty()
        biz = exports["vrp-housing"]:getCurrentPropertyID()
    else
        id = pContext.zones['restaurant_registers'].id
        biz = pContext.zones['restaurant_registers'].biz
    end

    if id == nil or biz == nil then return end

    local elements = {
     {
            icon = "dollar-sign",
            label = _L("restaurant-cost", "Cost"),
            name = "cost",
        },
        {
            icon = "pencil-alt",
            label = _L("restaurant-comment", "Comment"),
            name = "comment",
        },
    }

    local prompt = exports['vrp-ui']:OpenInputMenu(elements)

    if not prompt then return end

    local cost = tonumber(prompt.cost)
    local comment = prompt.comment
    --check if cost is actually a number
    if cost == nil or not cost then return end
    if comment == nil then comment = "" end

    if cost < 5 then cost = 5 end --Minimum $10

    --Send event to everyone indicating a purchase is ready at specified register
    RPC.execute("vrp-restaurants:startPurchase", {cost = cost, comment = comment, registerId = id})
end)

RegisterNetEvent('vrp-restaurants:activePurchase', function(data)
    activePurchases[data.registerId] = data
end)

RegisterNetEvent('vrp-restaurants:closePurchase', function(data)
    activePurchases[data.registerId] = nil
end)

AddEventHandler('vrp-polyzone:enter', function(pZone, pData)
    if pZone == 'restaurant_buff_zone' then
        CURRENT_RESTAURANT = pData.id
        TriggerEvent("vrp-buffs:inDoubleBuffZone", true, pData.id)
        checkForHeadset()
    end

    if pZone == 'restaurant_bs_drivethru' then
        enterDriveThru()
    end
end)

AddEventHandler('vrp-polyzone:exit', function(pZone, pData)
    if pZone == 'restaurant_buff_zone' then
        if SIGNED_IN then
            SIGNED_IN = false
            RPC.execute("vrp-restaurants:leaveJob", CURRENT_RESTAURANT)
            TriggerEvent("DoLongHudText", _L("restaurant-clocked-out-distance", "You went too far away! Clocked out."))
        end
        CURRENT_RESTAURANT = nil
        TriggerEvent("vrp-buffs:inDoubleBuffZone", false)
        turnOffHeadset()
    end

    if pZone == 'restaurant_bs_drivethru' then
        exitDriveThru()
    end
end)

AddEventHandler("vrp-restaurants:silentAlarm", function()
    local finished = exports["vrp-taskbar"]:taskBar(4000, _L("foodchain-pressing-alarm", "Pressing Alarm"))
    if finished ~= 100 then return end
    TriggerServerEvent("vrp-restaurants:triggerSilentAlarm", GetEntityCoords(PlayerPedId()))
end)

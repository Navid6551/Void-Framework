local PendingConfirmations = {}

RegisterUICallback("vrp-ui:genericNotificationResponse", function(data, cb)
    cb({ data = {}, meta = { ok = true, message = 'done' } })

    local response = data._data

    if not PendingConfirmations[response.confirmationId] then return end

    PendingConfirmations[response.confirmationId]:resolve(data.action == "accept")

    PendingConfirmations[response.confirmationId] = nil
end)

function DoPhoneConfirmation(pTitle, pText, pIcon, pCallback)
    local promise = promise:new()

    PendingConfirmations[#PendingConfirmations+1] = promise

    local id = #PendingConfirmations

    SendUIMessage({
        source = "vrp-nui",
        app = "phone",
        data = {
            action = "generic-confirmation",
            appName = "home-screen",
            title = pTitle,
            text = pText,
            icon = { name = pIcon or "home", color = "white" },
            onAccept = { targetEvent = "vrp-ui:genericNotificationResponse" },
            onReject = { targetEvent = "vrp-ui:genericNotificationResponse" },
            _data = { confirmationId =  id }
        }
    })

    Citizen.SetTimeout(30000, function()
        promise:resolve(false)
    end)

    local result = Citizen.Await(promise)

    if (pCallback) then pCallback(result) end

    return result
end

exports('DoPhoneConfirmation', DoPhoneConfirmation)
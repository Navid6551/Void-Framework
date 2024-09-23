local lastMessage = ""
exports("showInteraction", function(message, type, opts)
    if not type then type = "info" end
    if not opts then opts = {} end
    lastMessage = message
    SendUIMessage({
        source = "vrp-nui",
        app = "interactions",
        data = {
            message = message,
            opts = opts,
            show = true,
            type = type,
        }
    })
end)
exports("hideInteraction", function(type)
    type = type and type or "info"
    SendUIMessage({
        source = "vrp-nui",
        app = "interactions",
        data = {
            message = lastMessage,
            show = false,
            type = type,
        }
    })
end)

exports("showContextMenu", function(options, position)
    SendUIMessage({
        source = "vrp-nui",
        app = "contextmenu",
        show = true,
        data = {
            position = position or "right",
            options = options
        }
    })
    SetUIFocus(true, true)
end)

RegisterNUICallback('vrp-ui:context:update', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = "done" } })
    TriggerEvent('vrp-ui:context:update', data)
end)

exports("hideContextMenu", function()
    SendUIMessage({
        source = "vrp-nui",
        app = "contextmenu",
        show = false,
        data = {
            position = "right",
            options = nil
        }
    })
    SetUIFocus(false, false)
end)
LogOutZones = {}

local EVENTS = {
    SWITCHER = 1,
    OUTFITS = 2,
}

local MenuData = {
    {
        title = "Outfits",
        description = "Gotta look fresh",
        action = "vrp-business:sh_handler",
        key = { event = EVENTS.OUTFITS, switchCharacter = true }
    },
    {
        title = "Character switch",
        description = "Go bowling with your cousin",
        children = {
            { title = "Yes", action = "vrp-business:sh_handler", key = { event = EVENTS.SWITCHER, switchCharacter = true } },
            { title = "No", action = "vrp-business:sh_handler", key = { event = EVENTS.SWITCHER, switchCharacter = false } },
        }
    },
}

local listening = false
local function listenForKeypress(pEvent)
    listening = true
    Citizen.CreateThread(function()
        while listening do
            if IsControlJustReleased(0, 38) then
                listening = false
                exports["vrp-ui"]:hideInteraction()
                exports["vrp-ui"]:showContextMenu(MenuData)
            end
            Wait(0)
        end
    end)
end

AddEventHandler("vrp-polyzone:enter", function(zone)
    if zone == "saco_log" or zone == "hades_log" or zone == "saco_beach_log" or zone == "little_moscow_log" or zone == "qm_log" or LogOutZones[zone] then
        exports["vrp-ui"]:showInteraction("[E] Wardrobe")
        listenForKeypress(zone)
    end
end)

AddEventHandler("vrp-polyzone:exit", function(zone)
    if zone == "saco_log" or zone == "hades_log" or zone == "saco_beach_log" or zone == "little_moscow_log" or zone == "qm_log" or LogOutZones[zone] then
        exports["vrp-ui"]:hideInteraction()
        listening = false
    end
end)

function AddLogoutZone(zone, enabled)
    LogOutZones[zone] = enabled == true
end

exports("AddLogoutZone", AddLogoutZone)

RegisterUICallback("vrp-business:sh_handler", function(data, cb)
    local eventData = data.key
    if eventData.event == EVENTS.SWITCHER and eventData.switchCharacter then
        TransitionToBlurred(500)
        DoScreenFadeOut(500)
        Wait(1000)
        TriggerEvent("vrp-base:clearStates")
        exports["vrp-base"]:getModule("SpawnManager"):Initialize()
        Wait(1000)
    elseif eventData.event == EVENTS.OUTFITS then
        TriggerEvent('vrp-clothing:outfits', true)
    end
    cb({ data = {}, meta = { ok = true, message = "done" } })
end)
function hasRadio()
    return exports["vrp-inventory"]:hasEnoughOfItem("radio", 1, false, true) or exports["vrp-inventory"]:hasEnoughOfItem("civradio", 1, false, true)
end

local function formattedChannelNumber(number)
    local power = 10 ^ 1
    return math.floor(number * power) / power
end

function handleConnectionEvent(pChannel)
    local newChannel = formattedChannelNumber(pChannel)

    if type(newChannel) ~= 'number' then return end

    local result = exports['vrp-voice']:SetRadioFrequency(newChannel)
    return result
end

function LoadAnimationDic(dict)
    if not HasAnimDictLoaded(dict) then
        RequestAnimDict(dict)

        while not HasAnimDictLoaded(dict) do
            Citizen.Wait(0)
        end
    end
end
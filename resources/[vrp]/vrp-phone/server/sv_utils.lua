function getCurrentTimestamp()
    -- Get the current time
    local currentTime = os.date("!%Y-%m-%dT%H:%M:%SZ")
    return currentTime
end exports('GetCurrentTimestamp', getCurrentTimestamp)
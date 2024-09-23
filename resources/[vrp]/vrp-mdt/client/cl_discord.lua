local maxPlayers = GetConvarInt('sv_maxclients', 64)

CreateThread(function()
    while true do
        SetDiscordAppId('1259875431566413926')
        SetDiscordRichPresenceAsset('logo')
        local result = RPC.execute('vrp-miscscript:getPlayers')
        SetRichPresence('Players: ' .. 1 .. '/' .. maxPlayers)

        SetDiscordRichPresenceAction(0, 'Discord', 'https://discord.gg/voidcommunity')

        Wait(30000)
    end
end)
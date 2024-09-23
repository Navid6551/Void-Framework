fx_version 'cerulean'
game 'gta5'
lua54 'yes'
version '1.2.6'

--[[=====INFINITY=====]]--
client_script "@vrp-lib/client/cl_infinity.lua"
server_script "@vrp-lib/server/sv_infinity.lua"

shared_scripts {
    'config.lua',
    'shared/locale.lua',
    'locale/en.lua',
    'locale/*.lua',
    'shared/main.lua',
    'shared/items.lua',
    'shared/jobs.lua',
    'shared/vehicles.lua',
    'shared/gangs.lua',
    'shared/weapons.lua',
    'shared/locations.lua'
}

client_scripts {
    'client/main.lua',
    'client/functions.lua',
    'client/loops.lua',
    'client/events.lua',
    'client/spawnmanager.lua',
    'client/drawtext.lua',
    "blipmanager/cl_blipmanager.lua",
    "blipmanager/cl_blips.lua"
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
    'server/functions.lua',
    'server/player.lua',
    'server/events.lua',
    'server/commands.lua',
    'server/exports.lua',
    'server/debug.lua',
    'api/dist/*.js',
}

dependency 'oxmysql'

fx_version 'cerulean'
games {'gta5'}

client_script '@vrp-lib/client/cl_rpc.lua'
client_script 'respawn.lua'
client_script 'cl_health.lua'

server_script '@epx/server/lib.js'
client_script '@epx/client/lib.js'
shared_script '@epx/shared/lib.lua'

server_script 'server.lua'
server_script 'sv_health.lua'
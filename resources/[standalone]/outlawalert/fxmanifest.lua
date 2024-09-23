fx_version 'cerulean'
games {'gta5'}

--resource_type 'gametype' { name = 'Hot Putsuit' }
client_script "@vrp-errorlog/client/cl_errorlog.lua"
client_script "@vrp-locales/client/lib.lua"
client_script "@vrp-lib/client/cl_infinity.lua"
server_script "@vrp-lib/server/sv_infinity.lua"

server_script "server.lua"
client_script "client.lua"

-- Manifest

fx_version 'cerulean'
games {'gta5'}

client_script "@vrp-errorlog/client/cl_errorlog.lua"
client_script "@npx/client/lib.js"
server_script "@npx/server/lib.js"
shared_script "@npx/shared/lib.lua"
client_script "@vrp-lib/client/cl_ui.lua"

client_script "@vrp-lib/client/cl_polyhooks.lua"
--[[ dependencies {
  'vrp-lib'
} ]]--

-- General
client_scripts {
  '@vrp-lib/client/cl_rpc.lua',
  'client.lua',
  'client_trunk.lua',
  'evidence.lua',
  'client/beatmode.lua',
  'client/cl_*.lua'
}


server_scripts {
  "@vrp-lib/server/sv_asyncExports.lua",
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  'server.lua',
  'server/beatmode.lua',
  'server/sv_vehicle.lua'
}

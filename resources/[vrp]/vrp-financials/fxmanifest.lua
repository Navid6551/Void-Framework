fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "vrp-lib",
  "vrp-ui"
} ]]--

server_script "@vpx/server/lib.js"
client_script "@vpx/client/lib.js"
shared_script "@vpx/shared/lib.lua"

client_script "@vrp-lib/client/cl_ui.lua"

client_scripts {
  '@vrp-errorlog/client/cl_errorlog.lua',
  '@vrp-lib/client/cl_rpc.lua',
  '@PolyZone/client.lua',
  '@PolyZone/BoxZone.lua',
  '@PolyZone/ComboZone.lua',
  'client/cl_*.lua',
}

shared_script {
  '@vrp-lib/shared/sh_util.lua',
  'shared/sh_*.*',
}

server_scripts {
  'config.lua',
  '@vrp-lib/server/sv_asyncExports.lua',
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  'server/sv_*.lua',
}
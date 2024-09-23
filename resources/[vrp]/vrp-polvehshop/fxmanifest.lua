fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "vrp-polyzone",
  "vrp-lib",
  "vrp-ui"
} ]]--

shared_script "shared/zones.lua"

client_script "@vrp-lib/client/cl_ui.lua"

client_scripts {
  '@vrp-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
}

server_scripts {
  '@vrp-lib/server/sv_asyncExports.lua',
  '@vrp-lib/server/sv_rpc.lua',
  'server/sv_*.lua',
}

fx_version 'cerulean'
games { 'rdr3', 'gta5' }

-- --[[ dependencies {
--   "vrp-lib",
--   "vrp-ui"
-- } ]]--

client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
shared_script "@vpx/shared/lib.lua"

client_script "@vrp-lib/client/cl_ui.lua"

client_scripts {
  '@vrp-errorlog/client/cl_errorlog.lua',
  '@vrp-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
}

shared_script {
  '@vrp-lib/shared/sh_util.lua',
  'shared/sh_*.*'
}

server_scripts {
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  '@vrp-lib/server/sv_asyncExports.lua',
  'config.lua',
  'server/sv_*.lua',
}

lua54 'yes'
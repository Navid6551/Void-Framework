fx_version 'cerulean'
games { 'gta5' }

shared_script "@vrp-lib/shared/sh_set.lua"

client_script "@vrp-lib/client/cl_ui.lua"
client_script "@vrp-errorlog/client/cl_errorlog.lua"

client_scripts {
  '@vrp-lib/client/cl_rpc.lua',
  'shared/*.lua',
  'client/cl_*.lua'
}

server_scripts {
  '@vrp-lib/server/sv_sql.lua',
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_asyncExports.lua',
  'shared/*.lua',
  'server/sv_*.lua'
}

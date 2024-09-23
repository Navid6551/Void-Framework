fx_version 'cerulean'
games { 'gta5' }

client_script "@vrp-sync/client/lib.lua"
client_script "@vrp-lib/client/cl_ui.lua"

client_scripts {
  '@vrp-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
  "@PolyZone/client.lua",
}

shared_script {
  '@vrp-lib/shared/sh_util.lua',
  'shared/sh_*.*',
}

server_scripts {
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
}
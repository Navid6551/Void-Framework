fx_version 'cerulean'
games { 'gta5' }


client_script "@vrp-sync/client/lib.lua"
client_script "@vrp-lib/client/cl_ui.lua"
client_script "@vrp-lib/client/cl_rpc.lua"

client_scripts {
  'client/cl_*.lua',
  'client/cl_*.js',
}

server_scripts {
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
}

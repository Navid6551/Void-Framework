fx_version 'cerulean'

games { 'gta5' }

shared_script '@vrp-lib/shared/sh_cacheable.lua'

client_script "@vrp-sync/client/lib.lua"
client_script "@vrp-lib/client/cl_ui.lua"

client_script "@npx/client/lib.js"
server_script "@npx/server/lib.js"
shared_script "@npx/shared/lib.lua"

client_scripts {
  '@vrp-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
  "@PolyZone/client.lua",
}

server_script "@vrp-lib/server/sv_npx.js"
server_scripts {
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_rpc.js',
  '@vrp-lib/server/sv_sql.lua',
  '@vrp-lib/server/sv_sql.js',
  "@vrp-lib/server/sv_asyncExports.lua",
  'config.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
  'build-server/sv_*.js',
}


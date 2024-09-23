fx_version 'cerulean'
games { 'gta5' }

client_script "@vrp-lib/client/cl_ui.lua"

shared_script "@vrp-lib/shared/sh_cacheable.lua"

client_script "@npx/client/lib.js"
server_script "@npx/server/lib.js"
shared_script "@npx/shared/lib.lua"

client_scripts {
  '@vrp-errorlog/client/cl_errorlog.lua',
  '@vrp-lib/client/cl_rpc.lua',
  '@vrp-lib/client/cl_animTask.lua',
  'client/cl_*.lua'
}

shared_scripts {
  '@vrp-lib/shared/sh_util.lua',
  'shared/sh_*.*'
}

server_scripts {
  'config.lua',
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  '@vrp-lib/server/sv_sql.js',
  'server/classes/*.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
}


client_script "tests/cl_*.lua"

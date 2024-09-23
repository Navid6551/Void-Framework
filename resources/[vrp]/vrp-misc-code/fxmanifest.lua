fx_version 'cerulean'
games { 'gta5' }

dependencies {
  "mka-lasers"
}

files {
  'shared/*.json',
}

client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
shared_script "@vpx/shared/lib.lua"

client_scripts {
  '@vrp-errorlog/client/cl_errorlog.lua',
  '@vrp-sync/client/lib.lua',
  '@vrp-lib/client/cl_rpc.lua',
  '@vrp-lib/client/cl_ui.lua',
  '@vrp-lib/client/cl_animTask.lua',
  '@PolyZone/client.lua',
  '@PolyZone/BoxZone.lua',
  '@PolyZone/ComboZone.lua',
  '@mka-lasers/client/client.lua',
  '@mka-grapple/client.lua',
  'client/cl_*.lua',
  'client/cl_*.js',
  'client/**/cl_*.lua',
  'client/**/cl_*.js',
}

shared_script {
  '@vrp-lib/shared/sh_util.lua',
  'shared/sh_*.*',
  'shared/**/sh_*.*',
}

server_scripts {
  'config.lua',
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  '@vrp-lib/server/sv_sql.js',
  '@vrp-lib/server/sv_asyncExports.js',
  '@vrp-lib/server/sv_asyncExports.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
  'server/**/sv_*.lua',
  'server/**/sv_*.js',
}

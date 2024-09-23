fx_version 'cerulean'
games { 'gta5' }

dependencies {
  "PolyZone"
}

client_script "@vrp-lib/client/cl_ui.lua"

client_scripts {
  "@PolyZone/client.lua",
  "@PolyZone/BoxZone.lua",
  "@PolyZone/CircleZone.lua",
  "@PolyZone/ComboZone.lua",
  "@PolyZone/EntityZone.lua",
  '@vrp-errorlog/client/cl_errorlog.lua',
  '@vrp-lib/client/cl_rpc.lua',
  "@vrp-locales/client/lib.lua",
  "config.lua",
  'client/cl_*.lua'
}


shared_script 'shared/sh_*.*'

server_scripts {
    '@vrp-lib/server/sv_rpc.lua',
    '@vrp-lib/server/sv_sql.lua',
    'server/sv_*.lua',
}

export "getModule"
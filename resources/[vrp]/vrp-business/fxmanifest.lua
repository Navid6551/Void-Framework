fx_version "cerulean"
games { "gta5" }

lua54 'yes'

client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
shared_script "@vpx/shared/lib.lua"

client_script "@vrp-lib/client/cl_ui.lua"
client_scripts {
    "@vrp-errorlog/client/cl_errorlog.lua",
    '@vrp-sync/client/lib.lua',
    "@vrp-lib/client/cl_rpc.lua",
    "@vrp-locales/client/lib.lua",
    '@mka-lasers/client/client.lua',
    "client/cl_*.lua",
    "business/**/cl_*.lua",
}

shared_script {
    "@vrp-lib/shared/sh_util.lua",
    "shared/sh_*.*",
    "business/**/sh_*.lua",
}

server_scripts {
    "config.lua",
    "@vrp-lib/server/sv_asyncExports.lua",
    "@vrp-lib/server/sv_rpc.lua",
    "@vrp-lib/server/sv_sql.lua",
    "server/sv_*.lua",
    "business/**/sv_*.lua",
}


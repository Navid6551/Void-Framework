fx_version "cerulean"

game { "gta5" }

shared_scripts {
    "shared/config.lua"
}

client_scripts {
    "@vrp-lib/client/cl_ui.lua",
    "@vrp-locales/client/lib.lua",
    "@vrp-lib/client/cl_rpc.lua",
    "client/cl_utils.lua",
    "client/cl_main.lua",
    "client/cl_spawn.lua"
}

server_scripts {
    "@vrp-lib/server/sv_sql.lua",
    "@vrp-lib/shared/sh_util.lua",
    "@vrp-lib/server/sv_rpc.lua",
    "@vrp-lib/server/sv_asyncExports.lua",
    "server/sv_utils.lua",
    "server/sv_main.lua"
}
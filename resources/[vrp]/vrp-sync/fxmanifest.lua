fx_version "cerulean"

games {"gta5"}

description "Sync Native Execution"

version "1.0.0"

server_script '@vrp-lib/server/sv_rpc.lua'
client_script '@vrp-lib/client/cl_rpc.lua'

client_scripts {
    "client/*.lua"
}

server_scripts {
    "server/*.lua"
}

-- server_script "tests/sv_*.lua"
-- client_script "tests/cl_*.lua"

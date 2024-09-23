fx_version "cerulean"

games { "gta5" }

description "NoPixel Character Types"

version "0.1.0"

server_script "@vpx/server/lib.js"
server_script "@vrp-lib/server/sv_rpc.js"
server_script "@vrp-db/server/lib.js"

client_script "@vpx/client/lib.js"
client_script "@vrp-lib/client/cl_ui.js"
client_script "@vrp-lib/client/cl_rpc.js"
client_script "@vrp-locales/client/lib.js"

server_scripts {
    "server/sv_*.js",
}

client_scripts {
    "client/cl_*.js",
}

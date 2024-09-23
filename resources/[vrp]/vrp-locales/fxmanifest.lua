fx_version "cerulean"

games { "gta5" }

description "NoPixel Locale System"

version "0.1.0"

server_script "@vrp-lib/server/sv_sql.js"
server_script "@vrp-lib/server/sv_rpc.js"
server_script "@vrp-lib/server/sv_npx.js"
server_script "@vrp-lib/server/sv_asyncExports.js"

client_script "@vrp-lib/client/cl_ui.js"
client_script "@vrp-lib/client/cl_rpc.js"

server_scripts {
    "server/*.js",
    "server/*.lua",
}

client_scripts {
    "client/*.js",
    "client/*.lua",
}

shared_scripts {
    "shared/*.js"
}

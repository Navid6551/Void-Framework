fx_version "cerulean"

games { "gta5" }

description "Void Job Framework"

version "0.1.0"

shared_script "@vrp-lib/shared/sh_cacheable.js"

server_script "@vrp-lib/server/sv_sql.js"
server_script "@vrp-lib/server/sv_rpc.js"
server_script "@vrp-lib/server/sv_npx.js"

client_script "@vrp-lib/client/cl_ui.js"
client_script "@vrp-lib/client/cl_rpc.js"
client_script "@vrp-lib/client/cl_rpc.lua"

client_scripts {
	"client/*.js",
	"client/*.lua",
}

server_scripts {
	"server/*.js",
	"server/*.lua"
}

client_script "tests/cl_*.js"
server_script "tests/sv_*.js"
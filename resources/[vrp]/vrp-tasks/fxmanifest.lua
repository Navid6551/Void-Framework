fx_version 'cerulean'

games { 'gta5' }

description "Eight Config"

server_script "@vrp-lib/server/sv_rpc.js"
client_script "@vrp-lib/client/cl_rpc.js"

server_scripts { "build/sv_*.js" }
client_scripts { "build/cl_*.js" }
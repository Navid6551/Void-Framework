fx_version "cerulean"

description "Void Object System"
author "cool"
version '0.0.1'

game "gta5"

server_script '@vrp-lib/server/sv_rpc.js'
server_script '@vrp-lib/server/sv_sql.js'
server_script 'server/*.js'

client_script '@vpx/client/lib.js'
client_script '@vrp-lib/client/cl_rpc.js'
client_script '@vrp-lib/client/cl_poly.js'
client_script 'client/*.js'
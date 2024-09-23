fx_version "cerulean"

description "Eight Object System"
author "cool"
version '0.0.1'

game "gta5"

server_script '@8-lib/server/sv_rpc.js'
server_script '@8-lib/server/sv_sql.js'
server_script 'server/*.js'

client_script '@epx/client/lib.js'
client_script '@8-lib/client/cl_rpc.js'
client_script '@8-lib/client/cl_poly.js'
client_script 'client/*.js'
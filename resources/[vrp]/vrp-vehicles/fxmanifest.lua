fx_version "cerulean"

description "Cool - Vehicles"
author "cool"
version '0.0.1'

game "gta5"

shared_script "@vrp-lib/shared/sh_cacheable.js"

client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
server_script '@vrp-lib/server/sv_rpc.js'
server_script '@vrp-lib/server/sv_sql.js'
server_script 'server/*.js'
server_script 'server/sv_*.lua'
client_script '@vrp-lib/client/cl_rpc.js'
client_script '@vrp-lib/client/cl_ui.js'
client_script 'client/*.js'
client_script 'client/*.lua'
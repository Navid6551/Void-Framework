fx_version 'cerulean'
game 'gta5'
version '1.0.0'

client_script "@vpx/client/lib.js"
client_script "@vrp-lib/client/cl_ui.js"
client_script "@vrp-lib/client/cl_rpc.js"
client_script "@vrp-locales/client/lib.js"
client_script "build/client.js"

server_script "@vpx/server/lib.js"
server_script "@vrp-lib/server/sv_rpc.js"
server_script "@vrp-lib/server/sv_sql.js"
server_script "build/server.js"

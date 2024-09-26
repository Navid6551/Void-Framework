fx_version 'cerulean'

games { 'gta5' }

description 'Void Police Script'

version '0.1.0'

client_script '@vrp-lib/client/cl_ui.js'
client_script '@vrp-lib/client/cl_rpc.js'
client_script '@vrp-locales/client/lib.js'
server_script '@vrp-lib/server/sv_rpc.js'

server_scripts { 'build/sv_*.js' }
client_scripts { 'build/cl_*.js' }

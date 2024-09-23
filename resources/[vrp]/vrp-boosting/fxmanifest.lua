fx_version 'cerulean'

games { 'gta5' }

description 'Ahwaz RP Boosting Script'

version '1.0.0'

client_script '@vpx/client/lib.js'
server_script '@vpx/server/lib.js'
shared_script '@vpx/shared/lib.lua'

server_scripts {
	'@vrp-lib/server/sv_sql.js',
	'@vrp-lib/server/sv_rpc.js',
	'@vrp-lib/server/sv_asyncExports.js',
	'@vrp-lib/server/sv_infinity.lua',
	'build/server/*.js',
}

client_scripts {
	'@vrp-sync/client/lib.lua',
	'@vrp-lib/client/cl_ui.js',
	'@vrp-lib/client/cl_rpc.js',
	'build/client/*.js',
}

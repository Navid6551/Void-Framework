fx_version 'cerulean'

games {
    'gta5',
    'rdr3'
}

server_script '@npx/server/lib.js'
client_script '@npx/client/lib.js'
shared_script '@npx/shared/lib.lua'

client_scripts {
  '@vrp-lib/client/cl_rpc.lua',
  '@vrp-lib/client/cl_rpc.lua',
  '@vrp-lib/client/cl_ui.lua',
  '@vrp-lib/client/cl_polyhooks.lua',
  '@vrp-lib/shared/sh_cacheable.lua',
	'client/cl_*.lua'
}

shared_scripts {
  '@vrp-lib/shared/sh_util.lua',
	"shared/*.lua"
}

server_scripts {
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  "@vrp-lib/server/sv_asyncExports.lua",
	'server/*.lua'
}

fx_version 'cerulean'
games {'gta5'}

ui_page "html/index.html"
files({
	"html/*",
	"html/images/*",
	"html/css/*",
	"html/webfonts/*",
	"html/js/*"
})

client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
shared_script "@vpx/shared/lib.lua"

client_script '@vrp-lib/client/cl_rpc.lua'
client_script "@vrp-errorlog/client/cl_errorlog.lua"
client_script "client/*"

shared_script "shared/sh_spawn.lua"
shared_script "@vrp-lib/shared/sh_cache.lua"
server_scripts {
  '@vrp-lib/server/sv_sql.lua',
  '@vrp-lib/server/sv_sql.js',
  '@vrp-lib/server/sv_asyncExports.lua',
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_rpc.js',
}
server_script "server/*"

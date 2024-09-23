fx_version 'cerulean'
games { 'gta5' }

client_script "@vrp-errorlog/client/cl_errorlog.lua"
client_script "@vrp-locales/client/lib.lua"
client_script "@vrp-lib/client/cl_ui.lua"
client_script "@vrp-lib/client/cl_rpc.lua"
server_script "@vrp-lib/server/sv_sql.lua"
client_script "config.lua"

client_scripts {
  "client/cl_*.lua"
}
server_scripts {
  "server/sv_*.lua"
}

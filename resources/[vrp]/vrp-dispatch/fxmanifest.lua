fx_version 'cerulean'
games { 'gta5' }

client_script "@vrp-lib/client/cl_ui.lua"

client_scripts {
  '@vrp-errorlog/client/cl_errorlog.lua',
  '@vrp-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
}

shared_scripts {
  '@vrp-lib/shared/sh_util.lua',
  'shared/sh_*.*'
}

server_scripts {
  'config.lua',
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  'server/sv_*.lua',
}

if GetConvar("sv_environment", "prod") == "debug" then
  client_script "tests/cl_*.lua"
end

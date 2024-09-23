fx_version 'cerulean'
games { 'gta5' }

client_script "@vrp-errorlog/client/cl_errorlog.lua"
client_script "@vrp-lib/client/cl_flags.lua"
client_script "@vrp-sync/client/lib.lua"

client_scripts {
  'client/cl_*.lua',
}

shared_script {
  '@vrp-lib/shared/sh_util.lua',
}

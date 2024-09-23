fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "vrp-lib",
  "vrp-ui"
} ]]--

client_script "@vrp-lib/client/cl_ui.lua"
client_script "@vrp-errorlog/client/cl_errorlog.lua"

client_scripts {
  'client/cl_*.lua'
}

server_scripts {
  'server/sv_*.lua'
}
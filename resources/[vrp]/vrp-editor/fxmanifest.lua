games {'gta5'}

fx_version 'cerulean'

description "FiveM Racing"

client_script "@npx/client/lib.js"
server_script "@npx/server/lib.js"
shared_script "@npx/shared/lib.lua"

client_script "@vrp-lib/client/cl_ui.lua"

client_script {
  "@PolyZone/client.lua",
  "@PolyZone/BoxZone.lua",
  '@vrp-errorlog/client/cl_errorlog.lua',
  '@vrp-lib/client/cl_rpc.lua',
  "@vrp-locales/client/lib.lua",
  'hashes/hash_*',
  'client/**/cl_*.lua',
}

ui_page 'nui/dist/index.html'

files {
  'nui/dist/index.html',
  'nui/dist/js/app.js',
  'nui/dist/css/app.css',
}
games {'gta5'}

fx_version 'cerulean'

description "FiveM Racing"

client_scripts{
  "@vrp-lib/client/cl_rpc.lua",
  "client/config.lua",
  "client/utils.lua",
  "client/api.lua",
  "client/exports.lua",
  "client/commands.lua",
  "client/events.lua",
  "client/nui_cb.lua",
  "client/creation.lua",
  "client/checkpoint_race.lua",
}

server_scripts {
  "@vrp-lib/server/sv_npx.js",
  "@vrp-lib/server/sv_rpc.js",
  "@vrp-lib/server/sv_sql.lua",
  "@vrp-lib/server/sv_sql.js",
  "@vrp-lib/server/sv_rpc.lua",
  "server/config.js",
  "server/queries.js",
  "server/utils.js",
  "server/api.js",
  "server/Race.js",
  "server/Tournament.js",
  "server/events.js",
  "server/server.js",
  "server/creation.lua"
}

ui_page 'nui/dist/index.html'

files {
  'nui/dist/index.html',
  'nui/dist/js/app.js',
  'nui/dist/css/app.css',
  'nui/dist/img/tablet.png'
}
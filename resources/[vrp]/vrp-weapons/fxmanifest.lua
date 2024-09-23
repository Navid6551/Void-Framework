games {"gta5"}

fx_version "cerulean"

description "Weapons"

dependencies  {
  "damage-events"
}

client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
shared_script "@vpx/shared/lib.lua"

client_scripts {
  "@vrp-errorlog/client/cl_errorlog.lua",
  "@vrp-lib/client/cl_rpc.lua",
  "@vrp-lib/client/cl_ui.lua",
 -- "client.lua",
  "modes.lua",
  "melee.lua",
  "pickups.lua",
  "cl_*.lua",
}

shared_script {
  "@vrp-lib/shared/sh_util.lua"
}
server_scripts {
  "@vrp-lib/server/sv_rpc.lua",
  "@vrp-lib/server/sv_sql.lua",
  "server.lua",
  "sv_*.lua"
}

server_export "getWeaponMetaData"
server_export "updateWeaponMetaData"

exports {
  "toName",
  "findModel"
}

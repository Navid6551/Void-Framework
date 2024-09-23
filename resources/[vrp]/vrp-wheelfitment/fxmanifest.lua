fx_version "cerulean"
games {"gta5"}

ui_page "client/ui/html/index.html"

files {
  "client/ui/html/index.html", 
  "client/ui/html/js/ui.js", 
  "client/ui/html/css/menu.css", 
  "client/ui/html/imgs/logo.png",
}

shared_script "@vrp-lib/shared/sh_util.lua"

client_script "@vrp-sync/client/lib.lua"
client_script "@vrp-lib/client/cl_ui.lua"
client_script "@vrp-lib/client/cl_rpc.lua"
client_script "@vrp-lib/client/cl_polyhooks.lua"
client_script "@PolyZone/client.lua"


server_script "@vrp-lib/server/sv_rpc.lua"

shared_script "_configs/cfg_general.lua"

client_scripts {
  "client/cl_*.lua"
}

server_scripts {
  "server/sv_*.lua"
}


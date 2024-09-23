fx_version "cerulean"

games {"gta5"}

description "NPCs Handler"

version "0.1.0"

client_script "@vrp-errorlog/client/cl_errorlog.lua"
client_script "@vrp-lib/client/cl_flags.lua"
client_script "@vrp-lib/client/cl_rpc.lua"
server_script "@vrp-lib/server/sv_rpc.lua"

client_scripts {
  "client/classes/*.lua",
  "client/*.lua"
}

shared_scripts {
  "@vrp-lib/shared/sh_util.lua",
  "shared/sh_*.lua"
}

server_scripts {
  "server/sv_*.lua"
}

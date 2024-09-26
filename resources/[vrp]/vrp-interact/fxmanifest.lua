fx_version "cerulean"

games {"gta5"}

description "NoPixel Peek Interactions"


client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
shared_script "@vpx/shared/lib.lua"

shared_scripts {
	"shared/sh_*.lua",
}

server_scripts {
	"server/sv_*.lua",
}
client_script "@vrp-locales/client/lib.lua"
client_script "@mka-array/Array.lua"
client_script "@vrp-lib/client/cl_ui.lua"

client_scripts {
	"client/cl_*.lua",
	'@vrp-lib/client/cl_rpc.lua',
	"client/entries/cl_*.lua",
}

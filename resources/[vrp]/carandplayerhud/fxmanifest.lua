fx_version 'cerulean'
games {'gta5'}


client_script "@vrp-errorlog/client/cl_errorlog.lua"

shared_script "@mka-array/Array.lua"
shared_script "@vrp-lib/shared/sh_cacheable.lua"

client_script "@vrp-lib/client/cl_infinity.lua"
server_script "@vrp-lib/server/sv_infinity.lua"

client_script 'carhud.lua'
client_script 'cl_playerbuffs.lua'
server_script 'carhud_server.lua'
server_script 'sr_autoKick.lua'
client_script 'newsStands.lua'

-- ui_page('html/index.html')

-- files({
-- 	"html/index.html",
-- 	"html/script.js",
-- 	"html/styles.css",
-- 	"html/img/*.svg",
-- 	"html/img/*.png"
-- })

exports {
	"playerLocation",
	"playerZone"
}


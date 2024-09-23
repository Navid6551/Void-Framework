fx_version "cerulean"

game "gta5"

files {
    'dlc_nikez_misc/*.awc',
    'misc.dat54.rel'
}

client_script "@vrp-sync/client/lib.lua"
client_script "@vrp-lib/client/cl_ui.lua"
client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
shared_script "@vpx/shared/lib.lua"
client_script "@vrp-errorlog/client/cl_errorlog.lua"
server_script "@vrp-lib/server/sv_asyncExports.lua"
server_script "@vrp-lib/server/sv_sql.lua"


client_script {
    "client/cl_*.lua",
    "client/modules/**/cl_*.lua",
    "client/cl_*.js"
}

server_script {
    "server/sv_*.lua",
    "server/modules/**/sv_*.lua",
    "server/sv_*.js"
}

data_file 'AUDIO_WAVEPACK' 'dlc_nikez_misc'
data_file 'AUDIO_SOUNDDATA' 'misc.dat'

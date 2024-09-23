fx_version 'cerulean'

games { 'rdr3', 'gta5' }

version '1.0.0'

ui_page 'build/index.html'

files {
  'build/index.html',
  'build/static/js/*.js',
  'build/static/css/*.css',
  'build/static/media/*.ttf',
  'build/static/media/*.png',
  'build/static/media/*.jpg',
  'build/static/media/*.gif',
  'build/static/media/*.ogg',
}

client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
shared_script "@vpx/shared/lib.lua"

client_scripts {
  '@vrp-lib/client/cl_rpc.lua',
  'client/cl_exports.lua',
  'client/cl_lib.lua',
  'client/model/cl_*.lua'
}

server_scripts {
  '@vrp-lib/server/sv_rpc.lua',
  'server/sv_*.lua',
  'server/sv_*.js'
}

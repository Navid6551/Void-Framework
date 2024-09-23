fx_version 'cerulean'
games { 'rdr3', 'gta5' }

--[[ dependencies {
  "vrp-lib",
  "vrp-ui"
} ]]--

-- ui_page 'ui/index.html'

-- files {
--     "ui/index.html",
--     "ui/scripts.js",
--     "ui/css/style.css"
-- }

client_script "@vrp-lib/client/cl_ui.lua"

client_scripts {
    '@vrp-errorlog/client/cl_errorlog.lua',
    '@vrp-lib/client/cl_rpc.lua',
    'client/cl_*.lua',
}

server_scripts {
  'server/sv_*.lua',
}

-- TODO: Remove before merge
client_script "tests/cl_*.lua"

export "taskBar"
export "closeGuiFail"

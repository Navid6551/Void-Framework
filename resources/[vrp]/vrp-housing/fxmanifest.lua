fx_version 'cerulean'
games { 'gta5' }

client_script "@vrp-lib/client/cl_ui.lua"
client_script "config.lua"

client_scripts {
    '@vrp-lib/client/cl_rpc.lua',
    'client/cl_*.lua',
}

shared_script {
  '@vrp-lib/shared/sh_util.lua',
  'shared/sh_*.*'
}

server_scripts {
  '@vrp-lib/server/sv_rpc.lua',
  '@vrp-lib/server/sv_sql.lua',
  '@vrp-lib/server/sv_asyncExports.lua',
  'server/sv_*.lua',
}

client_script "@vpx/client/lib.js"
server_script "@vpx/server/lib.js"
shared_script "@vpx/shared/lib.lua"
shared_script "@vrp-lib/shared/sh_cache.lua"

export "retriveHousingTable"
export "isNearProperty"
export "isInRobbery"
export "retrieveHousingTableMapped"
export "retrieveHousingZonesConfig"
export "isCurrentPropertyLockdown"

export "hasPermissionInProperty"
export "isPropertyRaidable"
export "getOwnerOfCurrentProperty"
export "getCurrentPropertyID"
export "isOwnerOfCurrentProperty"
export "isPropertyShop"
export "isInsideProperty"

export "getPropertyBuisness"

server_export "getSetOfProperty"
server_export "retrieveHousingTableMapped"
server_export "isCIDOwner"
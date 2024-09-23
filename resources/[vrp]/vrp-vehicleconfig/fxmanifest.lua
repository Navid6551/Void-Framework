fx_version 'cerulean'
games {'gta5'}

data_file 'VEHICLE_LAYOUTS_FILE' 'vehiclelayouts.meta'
data_file 'HANDLING_FILE' 'handling.meta'
data_file 'VEHICLE_METADATA_FILE' 'vehicles.meta'
data_file 'CARCOLS_FILE' 'carcols.meta'
data_file 'VEHICLE_VARIATION_FILE' 'carvariations.meta'

data_file 'HANDLING_FILE' 'aircraft/handling.meta'
data_file 'VEHICLE_METADATA_FILE' 'aircraft/vehicles.meta'
data_file 'CARCOLS_FILE' 'aircraft/carcols.meta'
data_file 'VEHICLE_VARIATION_FILE' 'aircraft/carvariations.meta'
data_file 'WEAPONINFO_FILE' 'aircraft/vehicleweapons_mig29a.meta'
data_file 'WEAPON_METADATA_FILE' 'aircraft/weaponarchetypes.meta'
data_file 'VEHICLE_LAYOUTS_FILE' 'aircraft/vehiclelayouts_f14d.meta'
data_file 'VEHICLE_LAYOUTS_FILE' 'aircraft/vehiclelayouts.meta'
--data_file 'WEAPONINFO_FILE' 'additional/weapon_dish.meta'

files {
  'vehiclelayouts.meta',
  'handling.meta',
  'vehicles.meta',
  'carcols.meta',
  'carvariations.meta',
  'aircraft/handling.meta',
  'aircraft/vehicles.meta',
  'aircraft/carcols.meta',
  'aircraft/carvariations.meta',
  'aircraft/vehicleweapons_mig29a.meta',
  'aircraft/weaponarchetypes.meta',
  'aircraft/vehiclelayouts_f14d.meta',
  'aircraft/vehiclelayouts.meta',
--  'additional/weapon_dish.meta',
}

client_script 'vehicle_names.lua'



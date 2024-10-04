fx_version "cerulean"

game { "gta5" }

data_file 'TIMECYCLEMOD_FILE' 'timecycle/timecycle_mods_1.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/timecycle_mods_2.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/timecycle_mods_3.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/timecycle_mods_4.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_blizzard.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_clear.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_clearing.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_clouds.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_extrasunny.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_foggy.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_halloween.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_neutral.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_overcast.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_rain.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_smog.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_snow.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_snowlight.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_thunder.xml'
data_file 'TIMECYCLEMOD_FILE' 'timecycle/w_xmas.xml'

files {
    "meta/gta5.meta",
    "meta/weather.xml",
	"meta/doortuning.ymt",
	"meta/water.xml",
    "timecycle/timecycle_mods_1.xml",
    "timecycle/timecycle_mods_2.xml",
    "timecycle/timecycle_mods_3.xml",
    "timecycle/timecycle_mods_4.xml",
	"timecycle/w_blizzard.xml",
	"timecycle/w_clear.xml",
	"timecycle/w_clearing.xml",
	"timecycle/w_clouds.xml",
	"timecycle/w_extrasunny.xml",
	"timecycle/w_foggy.xml",
	"timecycle/w_halloween.xml",
	"timecycle/w_neutral.xml",
	"timecycle/w_overcast.xml",
	"timecycle/w_rain.xml",
	"timecycle/w_smog.xml",
	"timecycle/w_snow.xml",
	"timecycle/w_snowlight.xml",
	"timecycle/w_thunder.xml",
	"timecycle/w_xmas.xml",
	"emitters/blizzard_emitter_drop.xml",
	"emitters/blizzard_render_drop.xml",
	"emitters/blizzard_emitter_ground.xml",
	"emitters/blizzard_render_ground.xml",
	"emitters/blizzard_emitter_mist.xml",
	"emitters/blizzard_render_mist.xml",
	"emitters/snowheavy_emitter_ground.xml",
	"emitters/snowheavy_render_drop.xml",
	"emitters/snowheavy_emitter_drop.xml",
	"emitters/snowheavy_render_drop.xml",
	"emitters/snowheavy_emitter_mist.xml",
	"emitters/snowheavy_render_mist.xml",
	"emitters/snowlight_emitter_drop.xml",
	"emitters/snowlight_render_drop.xml",
}

replace_level_meta "meta/gta5"
before_level_meta 'data'
replace_level_meta "meta/gta5"
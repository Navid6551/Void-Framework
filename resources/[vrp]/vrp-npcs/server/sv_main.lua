RegisterServerEvent("vrp-npcs:location:fetch")
AddEventHandler("vrp-npcs:location:fetch",function()
    local src = source

    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "tacoshop",
        name = "tacoshop",
        pedType = 4,
        model = "a_m_y_eastsa_01",
        networked = false,
        distance = 50.0,
        position = {
          coords = vector3(87.94, -1434.8, 28.31),
          heading = 142.09,
          random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            isWean = true
        },
        scenario = "WORLD_HUMAN_CLIPBOARD"
    }
    TriggerClientEvent('vrp-jobs:weed:addManagerLocation', src, {x = 87.94, y = -1434.8, z= 28.31 })

    for k,v in pairs(Generic.ShopKeeperLocations) do
        table.insert( Generic.NPCS, #Generic.NPCS + 1, {
            id = "shopkeeper_"..k,
            name = "Shop Keeper "..k,
            pedType = 4,
            model = "mp_m_shopkeep_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = vector3(v[1], v[2], v[3]),
                heading = v[4],
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isShopKeeper'] = true
            }
        } )
    end
    
    for k,v in pairs(Generic.WeaponShopLocations) do
        table.insert( Generic.NPCS, #Generic.NPCS + 1, {
            id = "weaponShopKeeper_"..k,
            name = "Weapon Shop Keeper "..k,
            pedType = 4,
            model = "s_m_y_ammucity_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = vector3(v[1], v[2], v[3]),
                heading = v[4],
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isWeaponShopKeeper'] = true
            }
        })
    end

    for k,v in pairs(Generic.ToolShopLocations) do
        table.insert( Generic.NPCS, #Generic.NPCS + 1, {
            id = "toolsShopKeeper_"..k,
            name = "Tools Shop Keeper "..k,
            pedType = 4,
            model = "s_m_m_lathandy_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = vector3(v[1], v[2], v[3]),
                heading = v[4],
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isToolShopKeeper'] = true
            }
        })
    end

    -- for k,v in pairs(Generic.ApartmentUpgrade) do
    --     table.insert( Generic.NPCS, #Generic.NPCS + 1, {
    --         id = "apartupgradeKeeper_"..k,
    --         name = "Apart Upgrade Keeper "..k,
    --         pedType = 4,
    --         model = "a_f_y_business_01",
    --         networked = false,
    --         distance = 25.0,
    --         position = {
    --             coords = vector3(v[1], v[2], v[3]),
    --             heading = v[4],
    --             random = false
    --         },
    --         appearance = nil,
    --         settings = {
    --             { mode = "invincible", active = true },
    --             { mode = "ignore", active = true },
    --             { mode = "freeze", active = true },
    --         },
    --         flags = {
    --             ['isNPC'] = true,
    --             ['isApartmentUpgradeKeeper'] = true
    --         }
    --     })
    -- end

    for k,v in pairs(Generic.SportShopLocations) do
        table.insert( Generic.NPCS, #Generic.NPCS + 1, {
            id = "isSportShopKeeper",
            name = "Hunting Shop Keeper "..k,
            pedType = 4,
            model = "csb_cletus",
            networked = false,
            distance = 25.0,
            position = {
                coords = vector3(v[1], v[2], v[3]),
                heading = v[4],
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isHuntingStore'] = true
            }
        })
    end
    GenerateCasinoInteriorSwaps()
    GenerateCasinoMembershipGiver()
    GenerateCasinoRestRoom()
    GenerateCasinoRestRoom2()
    GenerateCasinoJewelStore()
    GenerateCasinoChipSeller()
    GenerateCasinoDrinkGiver()
    IDK()
    TriggerClientEvent("vrp-npcs:set:ped", src, Generic.NPCS)
end)


function GenerateCasinoMembershipGiver()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.CasinoLocations[1].npcId,
        name = "Casino Membership Giver",
        pedType = 4,
        model = "u_f_m_casinoshop_01",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[1].coords.xyz,
            heading = Generic.CasinoLocations[1].coords[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            ['isCasinoMembershipGiver'] = true,
        },
    }
end

function GenerateCasinoInteriorSwaps()
    for _, location in ipairs(Generic.CasinoInteriorSwap) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "casino_interior_swap",
            name = ("Casino Interior Swap %s"):format(_),
            pedType = 4,
            model = "s_m_y_casino_01",
            scenario = "",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = '{ "face":{"params":[0,1,0,2],"mode":"component"}, "hair":{"params":[2,1,0,1],"mode":"component"}, "haircolor":{"params":[1,0],"mode":"haircolor"}, "torso":{"params":[11,2,0,1],"mode":"component"}, "undershirt":{"params":[8,0,0,1],"mode":"component"}, "accesory":{"params":[7,0,2,1],"mode":"component"} }',
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
    for _, location in ipairs(Generic.CasinoHotelVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "casino_hotel_worker",
            name = ("Casino Interior Swap %s"):format(_),
            pedType = 4,
            model = "s_m_y_casino_01",
            scenario = "",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = '{ "face":{"params":[0,1,0,2],"mode":"component"}, "hair":{"params":[2,1,0,1],"mode":"component"}, "haircolor":{"params":[1,0],"mode":"haircolor"}, "torso":{"params":[11,2,0,1],"mode":"component"}, "undershirt":{"params":[8,0,0,1],"mode":"component"}, "accesory":{"params":[7,0,2,1],"mode":"component"} }',
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end


function GenerateCasinoRestRoom()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "casino_rest_room_1",
        name = "Casino Rest Room",
        pedType = 4,
        model = "s_f_y_casino_01",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[2].coords.xyz,
            heading = Generic.CasinoLocations[2].coords[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GenerateCasinoRestRoom2()
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "casino_rest_room_2",
            name = "Casino Rest Room 2",
            pedType = 4,
            model = "s_f_y_casino_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = Generic.CasinoLocations[3].coords.xyz,
                heading = Generic.CasinoLocations[3].coords[4],
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
end

function GenerateCasinoJewelStore()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "casino_jewel_store",
        name = "Casino Jewel Store",
        pedType = 4,
        model = "s_m_y_casino_01",
        scenario = "WORLD_HUMAN_GUARD_STAND",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[4].coords.xyz,
            heading = Generic.CasinoLocations[4].coords[4],
            random = false
        },
        appearance = '{ "face":{"params":[0,2,0,2],"mode":"component"}, "hair":{"params":[2,2,0,1],"mode":"component"}, "haircolor":{"params":[1,0],"mode":"haircolor"}, "torso":{"params":[11,1,0,1],"mode":"component"}, "undershirt":{"params":[8,1,0,1],"mode":"component"}, "accesory":{"params":[7,2,2,1],"mode":"component"} }',
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GenerateCasinoChipSeller()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.CasinoLocations[5].npcId,
        name = "Casino Chip Seller",
        pedType = 4,
        model = "s_f_y_casino_01",
        scenario = "WORLD_HUMAN_STAND_IMPATIENT",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[5].coords.xyz,
            heading = Generic.CasinoLocations[5].coords[4],
            random = false
        },
        appearance = '{ "face":{"params":[0,2,0,2],"mode":"component"}, "hair":{"params":[2,1,0,1],"mode":"component"}, "haircolor":{"params":[1,0],"mode":"haircolor"}, "accesory":{"params":[7,2,2,1],"mode":"component"} }',
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            ['isCasinoChipSeller'] = true,
        },
    }
end


function GenerateCasinoDrinkGiver()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.CasinoLocations[7].npcId,
        name = "Casino Drink Giver",
        pedType = 4,
        model = "s_f_y_casino_01",
        scenario = "WORLD_HUMAN_STAND_IMPATIENT_UPRIGHT",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[7].coords.xyz,
            heading = Generic.CasinoLocations[7].coords[4],
            random = false
        },
        appearance = '{ "undershirt":{"params":[8,1,0,1],"mode":"component"}, "accesory":{"params":[7,2,2,1],"mode":"component"} }',
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            ['isCasinoDrinkGiver'] = true,
        },
    }
end

function IDK()
    for k, v in pairs(Generic.VehicleShopKeepersData) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = v.id,
            name = v.id,
            pedType = 4,
            model =  v.model,
            networked = false,
            distance = 25.0,
            position = {
                coords = v.coords.xyz,
                heading = v.coords[4],
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
            scenario = "WORLD_HUMAN_CLIPBOARD"
        }
    end

    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.PublicLicenseKeepers[2].id,
        name =Generic.PublicLicenseKeepers[2].id,
        pedType = 4,
        model = Generic.PublicLicenseKeepers[2].model,
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.PublicLicenseKeepers[2].coords.xyz,
            heading = Generic.PublicLicenseKeepers[2].coords[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
        scenario = "WORLD_HUMAN_CLIPBOARD"
    }

    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.PublicLicenseKeepers[1].id,
        name =Generic.PublicLicenseKeepers[1].id,
        pedType = 4,
        model = Generic.PublicLicenseKeepers[1].model,
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.PublicLicenseKeepers[1].coords.xyz,
            heading = Generic.PublicLicenseKeepers[1].coords[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
        scenario = "WORLD_HUMAN_CLIPBOARD"
    }

    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "house_robberies",
        name = "house_robberies",
        pedType = 4,
        model = "s_m_y_ammucity_01",
        networked = false,
        distance = 50.0,
        position = {
          coords = vector3(209.5, -1855.9, 26.2),
          heading = 143.48,
          random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }

    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "gun_parts",
        name = "gun_parts",
        pedType = 4,
        model = "a_m_o_tramp_01",
        networked = false,
        distance = 50.0,
        position = {
          coords = vector3(-1121.3156738281, 2713.0981445313, 18.800407409668 - 1),
          heading = 93.405815124512,
          random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
        scenario = "WORLD_HUMAN_CLIPBOARD"
      }

    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "weed_buy",
        name = "weed_buy",
        pedType = 4,
        model = "a_f_y_hippie_01",
        networked = false,
        distance = 50.0,
        position = {
            coords = vector3(1175.49, -437.54, 65.9 - 1),
            heading = 262.06,
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            ['isWeedBuy'] = true
        },
        scenario = "WORLD_HUMAN_AA_SMOKE"
    }

    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "wean_laptop",
        name = "wean_laptop",
        pedType = 4,
        model = "ig_djtalignazio",
        networked = false,
        distance = 50.0,
        position = {
          coords = vector3(-458.5869140625, -422.25811767578, 34.374870300293 - 1),
          heading = 261.7744140625,
          random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            isWean = true
        },
        scenario = "WORLD_HUMAN_CLIPBOARD"
    }


    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "gangspray_1",
        name = "Gang Spray",
        pedType = 4,
        model = "g_m_y_lost_02",
        networked = false,
        distance = 35.0,
        position = {
            coords = vector3(-297.91, -1332.56, 30.3),
            heading = 291.83,
            random = true
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
        scenario = "WORLD_HUMAN_SMOKING_POT"
    }  

    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "oxyrunshit",
        name = "Oxy Ped",
        pedType = 4,
        model = "mp_m_weapexp_01",
        networked = false,
        distance = 50.0,
        position = {
            coords = vector3(-1563.99, -441.06, 35.94),
            heading = 105.42,
            random = true
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }  
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "oxygrabgood",
        name = "Oxy Grab Ped",
        pedType = 4,
        model = "u_m_m_streetart_01",
        networked = false,
        distance = 200.0,
        position = {
            coords = vector3(569.82, -1024.09, 32.58),
            heading = 118.33,
            random = true
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }  

    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "paintball_vendor",
        name ="paintball_vendor",
        pedType = 4,
        model = "a_m_m_socenlat_01",
        networked = false,
        distance = 50.0,
        position = {
            coords = vector3(5519.99, 5996.46, 589.02),
            heading = 5.84,
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
        scenario = "WORLD_HUMAN_CLIPBOARD"
    }
end
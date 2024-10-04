function retriveHousingTable()
	return Housing.info
end

function retrieveHousingTableMapped()
    local mapped = {}
    for id, housing in pairs(Housing.info) do
        if housing.enabled then
            local coords = housing[1]
            table.insert(mapped, {
                id = id,
                coords = {
                    x = housing[1].x,
                    y = housing[1].y,
                    z = housing[1].z
                },
                model = housing.model,
                street = housing.Street
            })
        end
    end
	return mapped
end

function retrieveHousingZonesConfig()
    return Housing.zoningPrices
end

function getHousingCatFromPropertID(propertyID)
    local targetPropertyType = Housing.typeInfo[Housing.info[propertyID].model].cat
    if Housing.info[propertyID] and Housing.info[propertyID].model then 
        
        if Housing.info[propertyID].override then
            targetPropertyType = Housing.info[propertyID].override
        end
    else
        return 'Unk'
    end
    
    return targetPropertyType
end


Housing.zone = {}
Housing.info = {}
Housing.infoSize = 0

function getHousingInfoSize(forced)

    if forced or Housing.infoSize == 0 then
        Housing.infoSize = 0
        for k,v in pairs(Housing.info) do
            Housing.infoSize = Housing.infoSize + 1
        end
        return Housing.infoSize
    else
        if Housing.infoSize <= 0 then
            print("Error: failed to find Housing Info Size")
        else
            return Housing.infoSize
        end
    end
end



-- Any new Static housing can go into here :) , it will get pushed to the DB and given an ID , do not give it an ID since it will be discarded here
-- duplicate street names will not be added
-- removing from this list will not remove them from the game
-- disable them on the DB if they need to be removed
Housing.newStatic = {
    {vector4(60.41, -1579.4, 29.6, 214.56), vector4(0, 0, 0, 0.0),  ['model'] = 'v_int_36', ['Street'] = 'Testing Street', ["enabled"] = true},
    { vector4(-1027.67,-409.52,33.42, 0.0), vector4(0, 0, 0, 0.0),  ['model'] = 'ghost_stash_houses_01', ['Street'] = 'Marathon Avenue 1', ['enabled'] = true },
    { vector4(-1033.98,-394.77,33.42, 0.0), vector4(0, 0, 0, 0.0),  ['model'] = 'ghost_stash_houses_01', ['Street'] = 'Marathon Avenue 2', ['enabled'] = true },

    { vector4(2352.429932, 2523.381836, 47.694416, 154.905457), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 1', ['enabled'] = true },
    { vector4(2359.721924, 2541.626709, 47.701054, 44.631611), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 2', ['enabled'] = true },
    { vector4(2355.842773, 2564.789062, 46.876305, 301.825104), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 3', ['enabled'] = true },
    { vector4(2318.804932, 2553.439453, 47.695518, 113.514565), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 4', ['enabled'] = true },
    { vector4(2321.109619, 2536.211670, 47.273621, 150.219910), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 5', ['enabled'] = true },
    { vector4(2332.918457, 2524.160645, 46.598507, 20.618361), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 6', ['enabled'] = true },
    { vector4(2338.377686, 2570.454102, 47.727375, 169.955444), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 7', ['enabled'] = true },
    { vector4(2334.051514, 2588.956543, 47.488956, 318.072632), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 8', ['enabled'] = true },
    { vector4(2337.727051, 2605.301025, 47.307877, 335.905457), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 9', ['enabled'] = true },
    { vector4(2357.842041, 2609.608643, 47.245907, 34.384319), vector4(0, 0, 0, 0),['model'] = 'nopixel_trailer', ['Street'] = 'Senora Way / Ron Alternates 10', ['enabled'] = true },
    { vector4(320.57, -1260.36, 32.03, 178.677704), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = 'Gulag Street 1', ['enabled'] = true },
    { vector4(315.27, -1260.63, 31.89, 196.080475), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = 'Gulag Street 2', ['enabled'] = true },
    { vector4(309.78, -1260.54, 31.98, 204.535156), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = 'Gulag Street 3', ['enabled'] = true },
    { vector4(309.67, -1274.04, 32.22, 232.384399), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = 'Gulag Street 4', ['enabled'] = true },
    { vector4(314.97, -1274.19, 32.16, 154.115677), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = 'Gulag Street 5', ['enabled'] = true },
    { vector4(320.57, -1274.48, 32.14, 95.126358), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = 'Gulag Street 6', ['enabled'] = true },
    { vector4(327.05, -1274.19, 32.13, 117.391792), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = 'Gulag Street 7', ['enabled'] = true },
    { vector4(307.73, -1270.44, 32.52, 154.727554), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = 'Gulag Street 8', ['enabled'] = true },
    { vector4(307.64, -1263.05, 32.28, 39.122353), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = 'Gulag Street 9', ['enabled'] = true },

    { vector4(3807.93,4478.34,6.37,25.34), vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = 'Backwater Basin 1', ['enabled'] = true, ["cost"] = 750000, ["costOverride"] = 750000 },

    { vector4(-949.5,196.64,67.4,336.22), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = 'West Eclipse Mansion 101', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000 },

    
    {vector4(-1715.564331, -447.156189, 42.649193, 221.013229), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Bay City Incline Apt/ 1', ['enabled'] = true },
    {vector4(-1712.076172, -493.028687, 41.619373, 215.926163), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Bay City Incline Apt/ 2', ['enabled'] = true },
    {vector4(-1710.943237, -494.049835, 41.619263, 269.723694), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Bay City Incline Apt/ 3', ['enabled'] = true },
    {vector4(-1699.799438, -474.736298, 41.649349, 160.222778), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 4', ['enabled'] = true },
    {vector4(-1704.530029, -480.461334, 41.649448, 187.836639), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 5', ['enabled'] = true },
    {vector4(-1709.746704, -481.021088, 41.649506, 144.248428), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 6', ['enabled'] = true },
    {vector4(-1693.066040, -464.846069, 41.649395, 299.328979), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 7', ['enabled'] = true },
    {vector4(-1698.267334, -460.437195, 41.649296, 5.910684), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 8', ['enabled'] = true },
    {vector4(-1706.890259, -453.591034, 42.649193, 36.340042), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 9', ['enabled'] = true },
    {vector4(-1714.223389, -463.602936, 41.649281, 141.944199), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 10', ['enabled'] = true },
    {vector4(-1713.329956, -470.119751, 41.649357, 166.028442), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 11', ['enabled'] = true },
    {vector4(-1712.684448, -477.305664, 41.649429, 204.047318), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 12', ['enabled'] = true },
    {vector4(-1714.062012, -463.576965, 44.616390, 180.716080), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 13', ['enabled'] = true },
    {vector4(-1713.389648, -470.291931, 44.616390, 177.142792), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 14', ['enabled'] = true },
    {vector4(-1712.643066, -477.188416, 44.616390, 180.485718), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 15', ['enabled'] = true },
    {vector4(-1709.651978, -480.970215, 44.616390, 106.924828), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 16', ['enabled'] = true },
    {vector4(-1704.611084, -480.376862, 44.621719, 286.242706), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 17', ['enabled'] = true },
    {vector4(-1700.097290, -474.632721, 44.632347, 318.573425), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 18', ['enabled'] = true },
    {vector4(-1693.054077, -464.829712, 44.649235, 55.887222), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 19', ['enabled'] = true },
    {vector4(-1687.812744, -469.096924, 44.649235, 253.875870), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 20', ['enabled'] = true },
    {vector4(-1698.212036, -460.651306, 44.649235, 66.807083), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 21', ['enabled'] = true },
    {vector4(-1706.840088, -453.554596, 45.648891, 56.148411), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 22', ['enabled'] = true },
    {vector4(-1710.524414, -451.137421, 45.648891, 48.544216), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 23', ['enabled'] = true },
    {vector4(-1687.637695, -469.092926, 47.652119, 246.912872), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 24', ['enabled'] = true },
    {vector4(-1693.213135, -464.858643, 47.652119, 234.920837), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 25', ['enabled'] = true },
    {vector4(-1698.264282, -460.547821, 47.652119, 61.508930), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 26', ['enabled'] = true },
    {vector4(-1706.889160, -453.463562, 48.652020, 43.778938), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 27', ['enabled'] = true },
    {vector4(-1710.211426, -451.380310, 48.652020, 51.418346), vector4(0, 0, 0, 0),['model'] = 'v_int_49_empty', ['Street'] = 'Bay City Incline Apt/ 28', ['enabled'] = true },

    { vector4(-1038.06, 222.2, 64.38, 293.02), vector4(0, 0, 0, 0), ['model'] = 'v_int_44_empty', ['Street'] = 'Steele Way 1', ['enabled'] = true },
    
    { vector4(-888.26, 42.54, 49.15, 66.09), vector4(0, 0, 0, 0), ['model'] = 'v_int_44_empty', ['Street'] = 'Caesars Place 1', ['enabled'] = true },

    { vector4(1400.980469, 2169.864502, 97.858269, 90.791069), vector4(0, 0, 0, 0),['model'] = 'v_int_16_mid_empty', ['Street'] = "Tyr Ddraig Ddu", ['enabled'] = true },

    { vector4(-3089.35,221.16,14.12,126.43), vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = "Inseno Road 1", ['enabled'] = true },
    { vector4(-3105.34,246.65,12.5,107.94),  vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = "Inseno Road 2", ['enabled'] = true },
    { vector4(-3105.87,287.01,8.98,76.84),   vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = "Inseno Road 3", ['enabled'] = true },
    { vector4(-3108.66,303.92,8.39,350.38),  vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = "Inseno Road 4", ['enabled'] = true },
    { vector4(-3093.78,349.34,7.55,83.75),   vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = "Inseno Road 5", ['enabled'] = true },
    { vector4(-3088.88,392.26,11.45,80.16),  vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = "Inseno Road 6", ['enabled'] = true },
    { vector4(-3038.8,492.88,6.78,81.58),    vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = "Inseno Road 7", ['enabled'] = true },
    { vector4(-3029.42,569.06,7.81,114.8),   vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = "Inseno Road 8", ['enabled'] = true },

    -- Little Seoul Compound 3rd Floor
    { vector4(-682.07,-899.37,32.32,95.86), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 21', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-682.06,-903.52,32.32,91.5), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 20', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-682.07,-907.61,32.32,91.0), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 19', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-679.31,-909.33,32.32,179.75), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 18', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-672.16,-907.58,32.31,271.54), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 17', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-672.17,-903.47,32.32,271.36), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 16', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-672.12,-899.31,32.32,269.24), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 15', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},

    -- Little Seoul Compound 2nd Floor
    { vector4(-682.07,-899.42,28.4,92.12), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 14', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-682.07,-903.55,28.4,89.31), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 13', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-682.07,-907.6,28.4,90.71), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 12', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-679.34,-909.17,28.4,181.19), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 11', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-672.12,-907.64,28.4,279.63), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 10', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-672.12,-903.47,28.4,272.59), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 9', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},
    { vector4(-672.19,-899.44,28.4,271.09), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = '3469 Little Seoul Apt 8', ['enabled'] = true, ["cost"] = 2000000, ["costOverride"] = 2000000},

    -- Little Seoul Compound 1st Floor
    { vector4(-682.07,-899.4,24.49,91.16), vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = '3469 Little Seoul Apt 7', ['enabled'] = true},
    { vector4(-682.04,-903.52,24.49,88.36), vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = '3469 Little Seoul Apt 6', ['enabled'] = true},
    { vector4(-682.07,-907.56,24.49,90.26), vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = '3469 Little Seoul Apt 5', ['enabled'] = true},
    { vector4(-679.38,-909.18,24.49,183.72), vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = '3469 Little Seoul Apt 4', ['enabled'] = true},
    { vector4(-673.7,-907.65,24.49,272.13), vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = '3469 Little Seoul Apt 3', ['enabled'] = true},
    { vector4(-673.69,-903.49,24.49,272.4), vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = '3469 Little Seoul Apt 2', ['enabled'] = true},
    { vector4(-673.7,-899.44,24.49,272.08), vector4(0, 0, 0, 0), ['model'] = 'v_int_16_mid_empty', ['Street'] = '3469 Little Seoul Apt 1', ['enabled'] = true},

    -- Ace Jones Drive
    { vector4(-1453.916504, 512.590271, 117.801445, 230.276840), vector4(0, 0, 0, 0),['model'] = 'v_int_24', ['Street'] = 'Ace Jones Drive 5', ['enabled'] = true },
    { vector4(-1500.462646, 522.993896, 118.272171, 30.944901), vector4(0, 0, 0, 0),['model'] = 'v_int_24', ['Street'] = 'Ace Jones Drive 6', ['enabled'] = true },
    { vector4(-1452.632690, 545.545288, 120.799492, 75.951698), vector4(0, 0, 0, 0),['model'] = 'v_int_24', ['Street'] = 'Ace Jones Drive 7', ['enabled'] = true },
    { vector4(-1495.858521, 437.122223, 112.497940, 228.679642), vector4(0, 0, 0, 0),['model'] = 'v_int_24', ['Street'] = 'Ace Jones Drive 8', ['enabled'] = true },
    { vector4(-1540.011841, 420.575775, 110.019051, 184.985382), vector4(0, 0, 0, 0),['model'] = 'v_int_24', ['Street'] = 'Ace Jones Drive 9', ['enabled'] = true },

    -- Strawberry
    { vector4(333.514435, -802.111816, 29.435333, 311.850067), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/1', ['enabled'] = true },
    { vector4(337.236816, -803.531128, 29.435333, 291.918732), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/2', ['enabled'] = true },
    { vector4(341.328735, -804.926697, 29.435333, 278.649658), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/3', ['enabled'] = true },
    { vector4(340.596771, -810.549133, 29.435333, 184.567993), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/4', ['enabled'] = true },
    { vector4(338.426270, -812.432007, 29.435333, 157.489944), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/5', ['enabled'] = true },
    { vector4(334.534454, -811.160217, 29.435333, 102.253571), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/6', ['enabled'] = true },
    { vector4(330.357544, -809.702148, 29.435333, 83.762001), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/7', ['enabled'] = true },
    { vector4(333.972107, -800.713196, 33.342770, 333.113190), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/8', ['enabled'] = true },
    { vector4(337.874329, -801.850281, 33.342770, 276.279236), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/9', ['enabled'] = true },
    { vector4(341.836487, -803.447327, 33.342770, 268.916077), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/10', ['enabled'] = true },
    { vector4(340.582123, -810.607117, 33.342770, 180.487946), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/11', ['enabled'] = true },
    { vector4(338.359406, -812.571045, 33.342770, 152.287628), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/12', ['enabled'] = true },
    { vector4(334.416779, -811.154907, 33.342770, 95.143417), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/13', ['enabled'] = true },
    { vector4(330.664856, -809.747253, 33.342770, 89.800407), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/14', ['enabled'] = true },
    { vector4(334.083923, -800.657349, 37.265854, 336.965424), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/15', ['enabled'] = true },
    { vector4(337.772461, -801.998535, 37.265854, 279.013367), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/16', ['enabled'] = true },
    { vector4(341.706818, -803.365967, 37.265854, 263.910400), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/17', ['enabled'] = true },
    { vector4(340.613647, -810.639709, 37.265854, 174.121674), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/18', ['enabled'] = true },
    { vector4(338.433533, -812.418396, 37.265854, 150.625641), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/19', ['enabled'] = true },
    { vector4(334.635651, -811.106628, 37.265854, 91.579018), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/20', ['enabled'] = true },
    { vector4(330.857666, -809.789612, 37.265854, 85.368805), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Strawberry N Apt/21', ['enabled'] = true },

    -- Spanish
    { vector4(3.639709, 40.996243, 71.532974, 161.599991), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/1', ['enabled'] = true },
    { vector4(4.987756, 44.799355, 71.532974, 13.331496), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/2', ['enabled'] = true },
    { vector4(6.307753, 48.884594, 71.532974, 2.210326), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/3', ['enabled'] = true },
    { vector4(12.012824, 48.244286, 71.532974, 282.198395), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/4', ['enabled'] = true },
    { vector4(13.875312, 46.000385, 71.532974, 248.456207), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/5', ['enabled'] = true },
    { vector4(12.729552, 41.998920, 71.532974, 191.358902), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/6', ['enabled'] = true },
    { vector4(11.253811, 38.430595, 71.532974, 178.270493), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/7', ['enabled'] = true },
    { vector4(2.271692, 41.611862, 75.440414, 156.144241), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/8', ['enabled'] = true },
    { vector4(3.520103, 45.413811, 75.440414, 69.857056), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/9', ['enabled'] = true },
    { vector4(4.861396, 49.353474, 75.440414, 17.819790), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/10', ['enabled'] = true },
    { vector4(11.959670, 48.272594, 75.440414, 269.263062), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/11', ['enabled'] = true },
    { vector4(14.106871, 45.925327, 75.440414, 250.045624), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/12', ['enabled'] = true },
    { vector4(12.647528, 42.181534, 75.440414, 171.588150), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/13', ['enabled'] = true },
    { vector4(11.326159, 38.403831, 75.440414, 175.458725), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/14', ['enabled'] = true },
    { vector4(2.179828, 41.473492, 79.363495, 66.221985), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/15', ['enabled'] = true },
    { vector4(3.434004, 45.334431, 79.363495, 11.760844), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/16', ['enabled'] = true },
    { vector4(4.866132, 49.256943, 79.363495, 354.049255), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/17', ['enabled'] = true },
    { vector4(11.978256, 48.250221, 79.363495, 266.270477), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/18', ['enabled'] = true },
    { vector4(13.879697, 46.062801, 79.363495, 248.271271), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/19', ['enabled'] = true },
    { vector4(12.583226, 42.431107, 79.363495, 184.532730), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/20', ['enabled'] = true },
    { vector4(11.289648, 38.142834, 79.363495, 174.120544), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Spanish Ave 10 Apt/21', ['enabled'] = true },

    -- Eclipse Lodge
    { vector4(-277.948364, 28.457790, 54.747372, 86.864502), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/1', ['enabled'] = true },
    { vector4(-281.736572, 29.786057, 54.747372, 92.446571), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/2', ['enabled'] = true },
    { vector4(-285.569427, 31.239765, 54.747372, 83.500710), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/3', ['enabled'] = true },
    { vector4(-285.127472, 36.854408, 54.747372, 4.769229), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/4', ['enabled'] = true },
    { vector4(-283.046906, 38.638477, 54.747372, 342.142303), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/5', ['enabled'] = true },
    { vector4(-279.187439, 37.502270, 54.747372, 277.313171), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/6', ['enabled'] = true },
    { vector4(-275.250793, 36.113792, 54.747372, 263.182343), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/7', ['enabled'] = true },
    { vector4(-278.566071, 27.139715, 58.654808, 252.717987), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/8', ['enabled'] = true },
    { vector4(-282.373596, 28.516321, 58.654808, 206.760544), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/9', ['enabled'] = true },
    { vector4(-286.158691, 29.842438, 58.654808, 117.001640), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/10', ['enabled'] = true },
    { vector4(-285.301300, 36.803097, 58.654808, 4.608134), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/11', ['enabled'] = true },
    { vector4(-283.002747, 38.591942, 58.654808, 344.314606), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/12', ['enabled'] = true },
    { vector4(-279.108612, 37.469158, 58.654808, 279.712555), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/13', ['enabled'] = true },
    { vector4(-275.529663, 36.092384, 58.654808, 264.102203), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/14', ['enabled'] = true },
    { vector4(-278.424316, 27.229956, 62.577892, 172.962143), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/15', ['enabled'] = true },
    { vector4(-282.332642, 28.361849, 62.577892, 92.269447), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/16', ['enabled'] = true },
    { vector4(-286.285614, 29.698790, 62.577892, 82.062851), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/17', ['enabled'] = true },
    { vector4(-285.227112, 36.860825, 62.577892, 359.689117), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/18', ['enabled'] = true },
    { vector4(-282.990509, 38.802738, 62.577892, 338.314972), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/19', ['enabled'] = true },
    { vector4(-279.045502, 37.488201, 62.577892, 276.594238), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/20', ['enabled'] = true },
    { vector4(-275.422668, 36.002476, 62.577892, 264.286224), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge N Apt/21', ['enabled'] = true },
    { vector4(-315.228241, 0.949532, 48.156273, 338.668884), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/1', ['enabled'] = true },
    { vector4(-313.802826, 4.696585, 48.156273, 13.966106), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/2', ['enabled'] = true },
    { vector4(-312.477875, 8.615007, 48.156273, 0.478981), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/3', ['enabled'] = true },
    { vector4(-306.937592, 8.310759, 48.156273, 288.377502), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/4', ['enabled'] = true },
    { vector4(-305.067230, 5.995192, 48.156273, 248.728500), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/5', ['enabled'] = true },
    { vector4(-306.155823, 2.039150, 48.156273, 181.695236), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/6', ['enabled'] = true },
    { vector4(-307.502686, -1.434136, 48.156273, 173.496338), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/7', ['enabled'] = true },
    { vector4(-316.558990, 1.625047, 52.063709, 152.297668), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/8', ['enabled'] = true },
    { vector4(-315.259552, 5.397307, 52.063709, 81.163704), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/9', ['enabled'] = true },
    { vector4(-313.918549, 8.992450, 52.063709, 19.676912), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/10', ['enabled'] = true },
    { vector4(-307.001038, 8.273922, 52.063709, 271.625153), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/11', ['enabled'] = true },
    { vector4(-305.056671, 6.062513, 52.063709, 251.339233), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/12', ['enabled'] = true },
    { vector4(-306.119049, 2.258680, 52.063709, 173.429504), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/13', ['enabled'] = true },
    { vector4(-307.449585, -1.579673, 52.063709, 178.757263), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/14', ['enabled'] = true },
    { vector4(-316.738922, 1.361244, 55.986794, 94.303299), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/15', ['enabled'] = true },
    { vector4(-315.379700, 5.413875, 55.986794, 10.775039), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/16', ['enabled'] = true },
    { vector4(-313.971558, 9.051517, 55.986794, 1.343470), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/17', ['enabled'] = true },
    { vector4(-306.715088, 8.229988, 55.986794, 264.441589), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/18', ['enabled'] = true },
    { vector4(-305.101227, 6.148968, 55.986794, 241.255371), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/19', ['enabled'] = true },
    { vector4(-306.162994, 2.290120, 55.986794, 191.907303), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/20', ['enabled'] = true },
    { vector4(-307.534546, -1.593078, 55.986794, 171.339035), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eclipse Lodge S Apt/21', ['enabled'] = true },

    -- Abe milton parkway
    { vector4(-414.177704, -184.088531, 37.452374, 296.369507), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/1', ['enabled'] = true },
    { vector4(-410.690277, -182.016602, 37.452374, 338.053101), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/2', ['enabled'] = true },
    { vector4(-407.097839, -180.013153, 37.452374, 317.459351), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/3', ['enabled'] = true },
    { vector4(-403.183472, -183.845062, 37.452374, 242.689728), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/4', ['enabled'] = true },
    { vector4(-402.905243, -186.815048, 37.452374, 209.896027), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/5', ['enabled'] = true },
    { vector4(-406.652161, -188.947861, 37.452374, 139.390076), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/6', ['enabled'] = true },
    { vector4(-410.460052, -190.788177, 37.452374, 104.368103), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/7', ['enabled'] = true },
    { vector4(-414.815399, -182.477081, 41.359810, 77.388321), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/8', ['enabled'] = true },
    { vector4(-411.305267, -180.486282, 41.359810, 297.706665), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/9', ['enabled'] = true },
    { vector4(-407.792603, -178.495529, 41.359810, 302.447083), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/10', ['enabled'] = true },
    { vector4(-403.053345, -183.762009, 41.359810, 237.781647), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/11', ['enabled'] = true },
    { vector4(-402.983551, -186.825119, 41.359810, 214.462082), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/12', ['enabled'] = true },
    { vector4(-406.405853, -188.936874, 41.359810, 122.404648), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/13', ['enabled'] = true },
    { vector4(-410.054993, -190.946671, 41.359810, 116.447205), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/14', ['enabled'] = true },
    { vector4(-414.985565, -182.644180, 45.282894, 14.144583), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/15', ['enabled'] = true },
    { vector4(-411.425354, -180.824265, 45.282894, 358.334198), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/16', ['enabled'] = true },
    { vector4(-407.968384, -178.457123, 45.282894, 322.710846), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/17', ['enabled'] = true },
    { vector4(-403.229675, -183.674210, 45.282894, 232.118103), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/18', ['enabled'] = true },
    { vector4(-402.860474, -186.849670, 45.282894, 207.501953), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/19', ['enabled'] = true },
    { vector4(-406.667572, -188.781128, 45.282894, 131.518890), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/20', ['enabled'] = true },
    { vector4(-410.218933, -190.810150, 45.282894, 119.177559), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 1 Apt/21', ['enabled'] = true },
    { vector4(-445.577209, -129.321869, 39.079971, 329.578918), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/1', ['enabled'] = true },
    { vector4(-442.230347, -127.356583, 39.079971, 323.209412), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/2', ['enabled'] = true },
    { vector4(-438.530823, -125.136803, 39.079971, 314.003387), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/3', ['enabled'] = true },
    { vector4(-434.890625, -129.141861, 39.079971, 228.614105), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/4', ['enabled'] = true },
    { vector4(-434.365295, -131.977905, 39.079971, 201.196182), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/5', ['enabled'] = true },
    { vector4(-438.129608, -134.087067, 39.079971, 176.446411), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/6', ['enabled'] = true },
    { vector4(-441.572876, -136.282944, 39.079971, 136.553650), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/7', ['enabled'] = true },
    { vector4(-446.100555, -127.977837, 42.987408, 106.570152), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/8', ['enabled'] = true },
    { vector4(-442.737457, -126.065094, 42.987408, 15.043472), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/9', ['enabled'] = true },
    { vector4(-439.316650, -123.910362, 42.987408, 340.020508), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/10', ['enabled'] = true },
    { vector4(-434.441681, -129.118256, 42.987408, 233.950775), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/11', ['enabled'] = true },
    { vector4(-434.460480, -132.150269, 42.987408, 204.197952), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/12', ['enabled'] = true },
    { vector4(-437.922394, -134.247696, 42.987408, 151.029861), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/13', ['enabled'] = true },
    { vector4(-441.542450, -136.227448, 42.987408, 128.815308), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/14', ['enabled'] = true },
    { vector4(-446.336731, -128.137009, 46.910492, 25.013924), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/15', ['enabled'] = true },
    { vector4(-442.818329, -126.077316, 46.910492, 327.843109), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/16', ['enabled'] = true },
    { vector4(-439.518188, -124.003326, 46.910492, 323.306793), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/17', ['enabled'] = true },
    { vector4(-434.619202, -129.070648, 46.910492, 230.779495), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/18', ['enabled'] = true },
    { vector4(-434.492828, -131.887680, 46.910492, 204.562393), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/19', ['enabled'] = true },
    { vector4(-437.894806, -134.344238, 46.910492, 155.663712), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/20', ['enabled'] = true },
    { vector4(-441.566223, -136.440369, 46.910492, 138.519226), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Abe Milton Parkway 2 Apt/21', ['enabled'] = true },

    -- Prosperity
    { vector4(-1567.829346, -404.788757, 42.383274, 120.007507), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/1', ['enabled'] = true },
    { vector4(-1571.031494, -402.341980, 42.383274, 81.448914), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/2', ['enabled'] = true },
    { vector4(-1574.331177, -399.607544, 42.383274, 71.042084), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/3', ['enabled'] = true },
    { vector4(-1571.898804, -394.475159, 42.383274, 346.253143), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/4', ['enabled'] = true },
    { vector4(-1569.302002, -393.479462, 42.383274, 313.631714), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/5', ['enabled'] = true },
    { vector4(-1566.156128, -396.000397, 42.383274, 257.528229), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/6', ['enabled'] = true },
    { vector4(-1562.619263, -398.561920, 42.383274, 247.121399), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/7', ['enabled'] = true },
    { vector4(-1568.937622, -405.937805, 46.290710, 217.804504), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/8', ['enabled'] = true },
    { vector4(-1572.165405, -403.388336, 46.290710, 161.700974), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/9', ['enabled'] = true },
    { vector4(-1575.001221, -400.542389, 46.290710, 92.655807), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/10', ['enabled'] = true },
    { vector4(-1572.062012, -394.511017, 46.290710, 343.784332), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/11', ['enabled'] = true },
    { vector4(-1569.202148, -393.411957, 46.290710, 307.560577), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/12', ['enabled'] = true },
    { vector4(-1566.096436, -395.749695, 46.290710, 267.200745), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/13', ['enabled'] = true },
    { vector4(-1562.828857, -398.484009, 46.290710, 253.658539), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/14', ['enabled'] = true },
    { vector4(-1568.785156, -405.836182, 50.213795, 152.658798), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/15', ['enabled'] = true },
    { vector4(-1571.680420, -403.436523, 50.213795, 79.344078), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/16', ['enabled'] = true },
    { vector4(-1575.251831, -400.781677, 50.213795, 63.200146), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/17', ['enabled'] = true },
    { vector4(-1572.031006, -394.856262, 50.213795, 338.211090), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/18', ['enabled'] = true },
    { vector4(-1569.477783, -393.562286, 50.213795, 313.528229), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/19', ['enabled'] = true },
    { vector4(-1566.363770, -395.869843, 50.213795, 255.423431), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/20', ['enabled'] = true },
    { vector4(-1562.779907, -398.512848, 50.213795, 244.015900), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Prosperity St  24 Apt/21', ['enabled'] = true },

    -- Vespucci
    { vector4(-542.263855, -807.885376, 30.746174, 332.764343), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/1', ['enabled'] = true },
    { vector4(-538.347961, -807.817810, 30.746174, 298.541901), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/2', ['enabled'] = true },
    { vector4(-534.353699, -807.799500, 30.746174, 287.401245), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/3', ['enabled'] = true },
    { vector4(-532.582214, -812.944458, 30.746174, 207.949219), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/4', ['enabled'] = true },
    { vector4(-533.851135, -815.578369, 30.746174, 176.862213), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/5', ['enabled'] = true },
    { vector4(-538.140930, -815.981506, 30.746174, 122.359894), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/6', ['enabled'] = true },
    { vector4(-542.386475, -815.954712, 30.746174, 106.482849), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/7', ['enabled'] = true },
    { vector4(-542.184021, -806.337280, 34.653610, 79.834900), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/8', ['enabled'] = true },
    { vector4(-537.963196, -806.391846, 34.653610, 56.552952), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/9', ['enabled'] = true },
    { vector4(-534.029053, -806.348511, 34.653610, 326.026917), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/10', ['enabled'] = true },
    { vector4(-532.624268, -813.025696, 34.653610, 236.368225), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/11', ['enabled'] = true },
    { vector4(-533.827698, -815.919678, 34.653610, 187.135925), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/12', ['enabled'] = true },
    { vector4(-537.789490, -815.616638, 34.653610, 131.165955), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/13', ['enabled'] = true },
    { vector4(-542.140686, -815.860535, 34.653610, 113.954681), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/14', ['enabled'] = true },
    { vector4(-542.123840, -806.537598, 38.576694, 14.155936), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/15', ['enabled'] = true },
    { vector4(-538.336670, -806.610657, 38.576694, 303.242767), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/16', ['enabled'] = true },
    { vector4(-533.755798, -806.474915, 38.576694, 303.909882), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/17', ['enabled'] = true },
    { vector4(-532.584167, -812.942810, 38.576694, 202.710236), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/18', ['enabled'] = true },
    { vector4(-533.979187, -815.531189, 38.576694, 175.225555), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/19', ['enabled'] = true },
    { vector4(-537.747559, -815.703918, 38.576694, 112.184250), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/20', ['enabled'] = true },
    { vector4(-541.927734, -815.876587, 38.576694, 101.910843), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 East Apt/21', ['enabled'] = true },
    { vector4(-560.128906, -810.251038, 30.745274, 159.517853), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/1', ['enabled'] = true },
    { vector4(-564.060364, -810.340393, 30.745274, 119.224869), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/2', ['enabled'] = true },
    { vector4(-568.077087, -810.390564, 30.745274, 109.818703), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/3', ['enabled'] = true },
    { vector4(-569.687866, -805.142395, 30.745274, 28.832245), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/4', ['enabled'] = true },
    { vector4(-568.595825, -802.355347, 30.745274, 357.745178), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/5', ['enabled'] = true },
    { vector4(-564.216858, -802.255798, 30.745274, 309.713684), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/6', ['enabled'] = true },
    { vector4(-560.203064, -802.305969, 30.745274, 289.833984), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/7', ['enabled'] = true },
    { vector4(-560.482727, -811.874146, 34.652710, 257.848907), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/8', ['enabled'] = true },
    { vector4(-564.422546, -811.668823, 34.652710, 245.574127), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/9', ['enabled'] = true },
    { vector4(-568.274780, -811.831360, 34.652710, 174.994431), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/10', ['enabled'] = true },
    { vector4(-569.850159, -805.082520, 34.652710, 24.295614), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/11', ['enabled'] = true },
    { vector4(-568.327759, -802.675110, 34.652710, 4.682750), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/12', ['enabled'] = true },
    { vector4(-564.258423, -802.113403, 34.652710, 298.305908), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/13', ['enabled'] = true },
    { vector4(-559.967651, -802.148926, 34.652710, 284.963806), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/14', ['enabled'] = true },
    { vector4(-560.140747, -811.912292, 38.575794, 192.369690), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/15', ['enabled'] = true },
    { vector4(-564.144104, -812.003235, 38.575794, 119.988861), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/16', ['enabled'] = true },
    { vector4(-568.238037, -811.867676, 38.575794, 104.245216), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/17', ['enabled'] = true },
    { vector4(-569.209534, -804.639526, 38.575794, 108.314590), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/18', ['enabled'] = true },
    { vector4(-568.283752, -802.426025, 38.575794, 85.833168), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/19', ['enabled'] = true },
    { vector4(-564.079285, -802.414124, 38.575794, 72.224236), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/20', ['enabled'] = true },
    { vector4(-560.191650, -802.384644, 38.575794, 7.982110), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Vespucci Blvd 19 West Apt/21', ['enabled'] = true },

    -- Eastbourne Way
    { vector4(-371.306274, 23.230215, 47.859131, 280.481110), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 1', ['enabled'] = true },
    { vector4(-360.491028, 21.257395, 47.859127, 229.678009), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 2', ['enabled'] = true },
    { vector4(-344.940277, 18.255175, 47.859131, 277.627838), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 3', ['enabled'] = true },
    { vector4(-339.296265, 21.357988, 47.859135, 272.418335), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 4', ['enabled'] = true },
    { vector4(-336.433533, 31.008249, 47.859135, 305.541779), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 5', ['enabled'] = true },
    { vector4(-340.823547, 34.788963, 52.110714, 295.420441), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 6', ['enabled'] = true },
    { vector4(-336.356934, 31.101366, 52.109383, 195.843964), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 7', ['enabled'] = true },
    { vector4(-338.989807, 21.568321, 52.110744, 145.395065), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 8', ['enabled'] = true },
    { vector4(-345.058136, 18.217525, 52.110355, 66.116333), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 9', ['enabled'] = true },
    { vector4(-360.358765, 21.032562, 52.114666, 278.902832), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 10', ['enabled'] = true },
    { vector4(-371.284332, 23.145750, 52.118332, 47.680000), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 11', ['enabled'] = true },
    { vector4(-362.146301, 57.522423, 54.429707, 32.003529), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 12', ['enabled'] = true },
    { vector4(-350.877411, 57.410240, 54.435238, 258.701752), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 13', ['enabled'] = true },
    { vector4(-344.641876, 57.404716, 54.434589, 300.738190), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 14', ['enabled'] = true },
    { vector4(-333.393005, 56.719475, 54.429825, 287.619019), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 15', ['enabled'] = true },
    { vector4(-329.682556, 52.210670, 58.747650, 325.837402), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 16', ['enabled'] = true },
    { vector4(-332.781006, 57.024059, 58.746056, 71.213341), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 17', ['enabled'] = true },
    { vector4(-344.594940, 57.473354, 58.746368, 114.925697), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 18', ['enabled'] = true },
    { vector4(-350.478821, 57.322269, 58.746330, 118.536507), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 19', ['enabled'] = true },
    { vector4(-362.326874, 57.442909, 58.746037, 121.215118), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 20', ['enabled'] = true },
    { vector4(-366.414307, 53.100739, 58.747578, 216.594620), vector4(0, 0, 0, 0),['model'] = 'v_int_16_low', ['Street'] = 'Eastbourne Way 1 Apt/ 21', ['enabled'] = true },

    -- Baytree Canyon Road
    { vector4(-43.7469, 1959.992, 190.3533, 210.3544), vector4(0, 0, 0, 0),['model'] = 'v_int_44_empty', ['Street'] = 'Baytree Canyon Road 1', ['enabled'] = true },

    -- Hobo boxes
    { vector4(423.445068, -483.211182, 27.19439, 351.9344), vector4(0, 0, 0, 0),['model'] = 'v_int_49', ['Street'] = 'Del Perro Fwy 1', ['enabled'] = true, ["cost"] = 50000, ["costOverride"] = 50000  },

    -- Steele Way
    { vector4(-997.97, 157.88, 62.32, 207.57), vector4(0, 0, 0, 0), ['model'] = 'v_int_44_empty', ['Street'] = 'Steele Way 2', ['enabled'] = true },
    { vector4(-830.45, 114.96, 56.03, 101.35), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = 'Steele Way 3', ['enabled'] = true, ["cost"] = 4000000, ["costOverride"] = 4000000 },
    { vector4(-896.62, -5.02, 43.8, 307.12), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = 'Steele Way 4', ['enabled'] = true, ["cost"] = 4000000, ["costOverride"] = 4000000 },
    { vector4(-930.16, 19.2, 48.34, 223.31), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = 'Steele Way 5', ['enabled'] = true, ["cost"] = 4000000, ["costOverride"] = 4000000 },
    { vector4(-902.41, 191.66, 69.45, 84.28), vector4(0, 0, 0, 0), ['model'] = 'v_int_24', ['Street'] = 'Steele Way 6', ['enabled'] = true, ["cost"] = 4000000, ["costOverride"] = 4000000 },
}

-- Street name
Housing.robberyDisabled = {
    ["Tyr Ddraig Ddu"] = true
}
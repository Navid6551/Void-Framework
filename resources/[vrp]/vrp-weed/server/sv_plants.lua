QBCore = exports['vrp-core']:GetCoreObject()
GlobalWeedPlants = {}

function DoqualityMaths(pWater)
    if pWater < 50 then
        return math.random(13, 40)
    elseif pWater >= 50 and pWater < 80 then
        return math.random(40, 70)
    elseif pWater >= 80 then
        return math.random(70, 100)
    end
end

function GetPlandById(pId)
    local plant = GlobalWeedPlants[pId]
    if not plant then
        return false
    end

    return plant
end

function UpdatePlantById(pId, pCol, pValue)
    local update = Await(SQL.execute(string.format("UPDATE _weed SET %s = @col WHERE id = @id", pCol), {
        col = pValue,
        id = pId
    }))

    if not update then
        return false
    end

    return true
end

function GetPlantModel(plant)
    if not plant then
        return 'bkr_prop_weed_01_small_01b'
    end
    
    local pPercent = getPlantGrowthPercent(plant, os.time(), true)
    local object = getStageFromPercent(pPercent)

    return PlantConfig.GrowthObjects[object].hash
end

function RetriveWeeds()
    local result =  Await(SQL.execute('SELECT * FROM _weed'))
    
    for k, v in pairs(result) do
        v.public = json.decode(v.public)
        v.coords = json.decode(v.coords)
        v.public.id = v.id

        local pPercent = getPlantGrowthPercent(v, os.time(), true)
        local object = getStageFromPercent(pPercent)
        v.model = PlantConfig.GrowthObjects[object].hash
        GlobalWeedPlants['weed_'..v.id] = v

        exports['vrp-objects']:addObject({
            id = 'weed_'..v.id,
            x = v.coords.x,
            y = v.coords.y,
            z = v.coords.z,
            data = {
                builder = v.public.grower,
                model = v.model,
                rotation = v.coords.h,
                metadata = v.public
            },
            ns = 'weed'
        })

        UpdatePlantById(v.id, 'model', v.model)
    end
end

function weedPlantStatus()
    for pId, plant in pairs(GlobalWeedPlants) do
        local removed = false
        plant.model = GetPlantModel(plant)

        if plant.public.gender == 0 then
            plant.public.water = plant.public.water - 15
        else
            plant.public.water = plant.public.water - 10
        end

        if plant.public.water < 0 then
            plant.public.water = 0
            if not plant.public.withoutWater then
                plant.public.withoutWater = 1
            else
                plant.public.withoutWater = plant.public.withoutWater + 1
            end
            if plant.public.withoutWater >= 3 then
                RemovePlantById(pId)
                removed = true
            end
        end

        if not removed then
            UpdatePlantById(plant.id, 'model', plant.model)
            UpdatePlantById(plant.id, 'public', json.encode(plant.public))
        end
    end
end

function RemovePlantById(pId)
    local plant = GetPlandById(pId)

    if not plant then
        return false
    end

    GlobalWeedPlants[pId] = nil

    exports['vrp-objects']:deleteObject(pId)

    local update = Await(SQL.execute("DELETE FROM _weed WHERE id = @id", {
        id = plant.id
    }))

    if not update then
        return false
    end

    return true
end

RPC.register("vrp-weed:plantSeed", function(pSource,  pCoords, pRot, typeMod)
    local user = QBCore.Functions.GetPlayer(pSource)
    local cid = user.PlayerData.citizenid
    local weedSeedsWithStarin = exports['vrp-inventory']:getItemsOfType(pSource, 'femaleseed', nil, 1, {name = getStrainName(typeMod)})
    local weedSeeds = exports['vrp-inventory']:getItemsOfType(pSource, 'femaleseed', nil, 1)

    if #weedSeedsWithStarin == 0 and not weedSeeds then
        print('no seed')
        return false
    end

    local grower = #weedSeedsWithStarin == 0 and cid or json.decode(weedSeedsWithStarin[1].information).grower

    local coords = {
        x = pCoords.x,
        y = pCoords.y,
        z = pCoords.z,
        h = pRot,
    }

    local metadata = {
        grower = grower,
        gender = 0,
        water = 40,
        lastHarvest = 0,
        createdAt = os.time(),
        n = typeMod.n,
        p = typeMod.p,
        k = typeMod.k,
    }

    local insert = Await(SQL.execute("INSERT INTO _weed (model, coords, public, createdAt) VALUES (@model, @coords, @public, @createdAt)", {
        model = 'bkr_prop_weed_01_small_01b',
        coords = json.encode(coords),
        public = json.encode(metadata),
        createdAt = metadata.createdAt
    }))

    if not insert then
        return false
    end

    local id = insert.insertId

    metadata.id = id

    GlobalWeedPlants['weed_'..id] = {
        id = id,
        model = 'bkr_prop_weed_01_small_01b',
        coords = coords,
        public = metadata,
        createdAt = metadata.createdAt
    }

    exports['vrp-inventory']:RemoveItemById(pSource, #weedSeedsWithStarin == 0 and weedSeeds[1].id or weedSeedsWithStarin[1].id)

    exports['vrp-objects']:addObject({
        id = 'weed_'..id,
        x = coords.x,
        y = coords.y,
        z = coords.z,
        data = {
            builder = metadata.grower,
            model = 'bkr_prop_weed_01_small_01b',
            rotation = coords.h,
            metadata = metadata
        },
        ns = 'weed'
    })

    return true
end)

RPC.register('vrp-weed:addWater', function(pSource, pId)
    local plant = GetPlandById(pId)
    if not plant then
        return false
    end

    plant.public.water = plant.public.water + 30

    local update = UpdatePlantById(plant.id, 'public', json.encode(plant.public))

    if not update then
        return false
    end
    
    exports['vrp-objects']:updateObject({
        id = pId,
        x = plant.coords.x,
        y = plant.coords.y,
        z = plant.coords.z,
        data = {
            builder = plant.public.grower,
            model = plant.model,
            rotation = plant.coords.h,
            metadata = plant.public
        },
        ns = 'weed'
    })

    return true
end)

RPC.register('vrp-weed:addFertilizer', function(pSource, pId, pStarin, pNew)
    local plant = GetPlandById(pId)

    if not plant then
        return false
    end

    if pNew then
        local sucsess, newStarin = AddNewStarin(pSource, pStarin)
        if not sucsess then
            return false
        end

        TriggerClientEvent('vrp-weed:setPlayerStrains', pSource, newStarin)
    end

    plant.public.n = pStarin.n
    plant.public.p = pStarin.p
    plant.public.k = pStarin.k

    local update = UpdatePlantById(plant.id, 'public', json.encode(plant.public))

    if not update then
        return false
    end
    
    exports['vrp-objects']:updateObject({
        id = pId,
        x = plant.coords.x,
        y = plant.coords.y,
        z = plant.coords.z,
        data = {
            builder = plant.public.grower,
            model = plant.model,
            rotation = plant.coords.h,
            metadata = plant.public
        },
        ns = 'weed'
    })

    return true
end)

RPC.register('vrp-weed:addMaleSeed', function(pSource, pId)
    local plant = GetPlandById(pId)

    if not plant then
        return false
    end

    plant.public.gender = 1

    local update = UpdatePlantById(plant.id, 'public', json.encode(plant.public))

    if not update then
        return false
    end

    TriggerClientEvent('inventory:removeItem', pSource, 'maleseed', 1)

    exports['vrp-objects']:updateObject({
        id = pId,
        x = plant.coords.x,
        y = plant.coords.y,
        z = plant.coords.z,
        data = {
            builder = plant.public.grower,
            model = plant.model,
            rotation = plant.coords.h,
            metadata = plant.public
        },
        ns = 'weed'
    })

    return true
end)

RPC.register('vrp-weed:removePlant', function(pSource, pId)
    return RemovePlantById(pId)
end)

RPC.register('vrp-weed:harvestPlant', function(pSource, pId)
    local plant = GetPlandById(pId)
    local shouldRemove = false
    if not plant then
        return false
    end

    if plant.public.gender == 1 then
        local budData = {
            name = getStrainName(plant.public),
            strain = {
                n = plant.public.n,
                p = plant.public.p,
                k = plant.public.k,
            },
            grower = plant.public.grower,
            _hideKeys = { 'strain' },
        }

        TriggerClientEvent('player:receiveItem', pSource, 'femaleseed', math.random(PlantConfig.SeedsFromMale[1], PlantConfig.SeedsFromMale[2]), false, budData, budData)
        TriggerClientEvent('player:receiveItem', pSource, 'maleseed', math.random(1, 3))
        
        if PlantConfig.RemoveMaleOnHarvest then
            shouldRemove = true
        end
    else
        plant.public.lastHarvest = os.time()

        if (not plant.public.harvested) then
            plant.public.harvested = 1
        else
            plant.public.harvested = plant.public.harvested + 1
        end

        if plant.public.harvested >= 3 then
            shouldRemove = true
        end

        local wetbudData = {
            strain = getStrainName(plant.public),
            quality = DoqualityMaths(plant.public.water),
            grower = plant.public.grower,
            id = plant.id,
            _hideKeys = { 'quality', 'grower', 'id', 'drying', 'dryingTime'},
        }

        TriggerClientEvent('player:receiveItem', pSource, 'wetbud', 1, false, wetbudData, wetbudData)
    end

    if shouldRemove then
        return RemovePlantById(pId)
    end

    exports['vrp-objects']:updateObject({
        id = pId,
        x = plant.coords.x,
        y = plant.coords.y,
        z = plant.coords.z,
        data = {
            builder = plant.public.grower,
            model = plant.model,
            rotation = plant.coords.h,
            metadata = plant.public
        },
        ns = 'weed'
    })

    return true
end)

AddEventHandler('onResourceStart', function(resource)
	if resource == GetCurrentResourceName() then
		RetriveWeeds()
	end
end)

RegisterCommand('weedPlantStatus', weedPlantStatus)

-- CreateThread(function()
--     while true do
--         Wait(1000 * 60)
--         weedPlantStatus()
--     end
-- end)
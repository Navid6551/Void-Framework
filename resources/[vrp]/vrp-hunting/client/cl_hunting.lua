local validHuntingZones = nil
local animals = nil
local baitDistanceInUnits = nil
local spawnDistanceRadius = nil
local targetedEntity = nil

local animalList = {
    { name = "Boar", hash = `a_c_boar` },
    { name = "Cat", hash = `a_c_cat_01` },
    { name = "Chicken", hash = `a_c_chickenhawk` },
    { name = "Chimp", hash = `a_c_chimp` },
    { name = "Chop", hash = `a_c_chop` },
    { name = "Cormorant", hash = `a_c_cormorant` },
    { name = "Cow", hash = `a_c_cow` },
    { name = "Coyote", hash = `a_c_coyote` },
    { name = "Crow", hash = `a_c_crow` },
    { name = "Deer", hash = `a_c_deer` },
    { name = "Hen", hash = `a_c_hen` },
    { name = "Husky", hash = `a_c_husky` },
    { name = "Mountain-Lion", hash = `a_c_mtlion` },
    { name = "Pig", hash = `a_c_pig` },
    { name = "Pigeon", hash = `a_c_pigeon` },
    { name = "Poodle", hash = `a_c_poodle` },
    { name = "Pug", hash = `a_c_pug` },
    { name = "Rabbit", hash = `a_c_rabbit_01` },
    { name = "Rat", hash = `a_c_rat` },
    { name = "Retriever", hash = `a_c_retriever` },
    { name = "Chimp", hash = `a_c_rhesus` },
    { name = "Rottweiler", hash = `a_c_rottweiler` },
    { name = "Seagull", hash = `a_c_seagull` },
    { name = "Shepherd", hash = `a_c_shepherd` },
    { name = "Westy", hash = `a_c_westy` },
    { name = "Panther", hash = `a_c_panther` },
}

Citizen.CreateThread(function()
    local result = RPC.execute("vrp-hunting:getSettings")
    animals = result.animals
    baitDistanceInUnits = result.baitDistanceInUnits
    spawnDistanceRadius = result.spawnDistanceRadius
    validHuntingZones = result.validHuntingZones
end)

AddEventHandler("vrp:target:changed", function(pEntity)
    targetedEntity = pEntity
end)

local function isValidZone()
    return validHuntingZones[GetLabelText(GetNameOfZone(GetEntityCoords(PlayerPedId())))] == true
end

AddEventHandler("vrp-inventory:itemUsed", function(item)
    if item == "huntingknife" then
        if GetPedType(targetedEntity) ~= 28 or not IsPedDeadOrDying(targetedEntity) then
            TriggerEvent("DoLongHudText", "No animal found", 2)
            return
        end
        local myAnimal = targetedEntity
        TaskTurnPedToFaceEntity(PlayerPedId(), myAnimal, -1)
        Citizen.Wait(1500)
        ClearPedTasksImmediately(PlayerPedId())
        TaskStartScenarioInPlace(PlayerPedId(), "WORLD_HUMAN_GARDENER_PLANT", 0, true)
        local finished = exports["vrp-taskbar"]:taskBar(30000, "Preparing Animal", false, true, false, false, nil, 5.0, targetedEntity)
        if finished ~= 100 then
            ClearPedTasksImmediately(PlayerPedId())
            TriggerEvent("DoLongHudText", "Preparing Cancelled", 2)
            return
        end
        local animalName = GetAnimalName(myAnimal)
        TriggerEvent("Evidence:StateSet",28,1200)
        TriggerEvent("evidence:dna",animalName)
        ClearPedTasks(PlayerPedId())
        ClearPedSecondaryTask(PlayerPedId())
        RPC.execute("vrp-hunting:getSkinnedItem", NetworkGetNetworkIdFromEntity(myAnimal), animalName)
        TriggerEvent("client:newStress", true, 150)
    end
end)

function GetAnimalName(myAnimal)
    local animalHash = GetEntityModel(myAnimal)
    local animalDNA = "Unknown-Animal"
    for i,v in ipairs(animalList) do
        if v.hash == animalHash then
            animalDNA = v.name
        end
    end
    return animalDNA
end

RegisterNetEvent('hunting:PurchaseHuntingEquipment')
AddEventHandler('hunting:PurchaseHuntingEquipment', function()
	TriggerEvent("server-inventory-open", "198", "Shop");
	Wait(1000)
end)
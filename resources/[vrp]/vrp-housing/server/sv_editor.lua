defaultInformation = {
    ["origin_offset"] = vector3(0.0, 0.0, 0.0),
    ["backdoor_coordinates"] = {
        ["internal"] = vector3(0.0, 0.0, 0.0),
        ["external"] = vector3(0.0, 0.0, 0.0),
    },
    ["garage_coordinates"] = vector4(0.0, 0.0, 0.0, 0.0),
    ["charChanger_offset"] = vector3(0.0, 0.0, 0.0),
    ["inventory_offset"] = vector3(0.0, 0.0, 0.0),
}
local housingEditing = {}

function checkAndInsert(pSource, pData)
    exports['vrp-build']:TriggerEventForHouse(pSource, 'vrp-editor:buildName', pData.name)
    return pData
end

RPC.register('objects:saveObjects', function(pSource, pData)
    return checkAndInsert(pSource, pData)
end)

RPC.register('objects:getObjects', function(pSource, pName)
    return {
        name = pName,
        objects = {}
    }
end)

RegisterNetEvent("CheckFurniture")
AddEventHandler("CheckFurniture", function(pData, pPropertyId)
    local src = source

    if housingEditing[pPropertyId] ~= nil then
        TriggerClientEvent("DoLongHudText", src, "Someone is already editing this house!", 2)
    else
        housingEditing[pPropertyId] = src
        TriggerClientEvent("vrp-editor:loadEditor", src, pData)
    end
end)

RegisterNetEvent("exitFurniture")
AddEventHandler("exitFurniture", function(pPropertyId)
    if housingEditing[pPropertyId] ~= nil then
        housingEditing[pPropertyId] = nil
    end
end)
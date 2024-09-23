local QBCore = exports['vrp-core']:GetCoreObject()

RPC.register('weapons:getAmmo', function(pSource)
    print('weapons:getAmmo', pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)
    print(json.encode(Player.PlayerData.metadata.ammo))
    return Player.PlayerData.metadata.ammo
end)

RegisterNetEvent('vrp-weapons:updateAmmo', function(pAmmo, pType)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local ammo = Player.PlayerData.metadata.ammo
    ammo["" .. pType .. ""] = {
        ammo = pAmmo,
        type = pType
    }
    Player.Functions.SetMetaData('ammo', ammo)
end)
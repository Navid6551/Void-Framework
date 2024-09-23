QBCore = exports['vrp-core']:GetCoreObject()

RPC.register("vrp-racing:setAlias", function(pSource, pUsedItemId, pUsedItemSlot, pUsedItemMetaData, pAlias)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then return false end

    local aliasExists = Await(SQL.execute("SELECT * FROM _racing_alias WHERE alias = @alias", {
        alias = pAlias
    }))

    if not aliasExists then return false end
    if #aliasExists > 0 then return false, "Alias already taken!" end

    local name = "ply-" .. Player.PlayerData.citizenid
    local usedItemMetadata = pUsedItemMetaData

    usedItemMetadata.Alias = pAlias

    local result = Await(SQL.execute("UPDATE inventory SET information = @information WHERE item_id = @item_id AND name = @name AND slot = @slot", {
        information = json.encode(usedItemMetadata),
        item_id = pUsedItemId,
        name = name,
        slot = pUsedItemSlot
    }))

    if not result then return false end

    local insertAlias = Await(SQL.execute("INSERT INTO _racing_alias (citizenid, alias) VALUES (@citizenid, @alias)", {
        citizenid = Player.PlayerData.citizenid,
        alias  = pAlias
    }))

    if not insertAlias then return false end

    return true
end)


RegisterNetEvent('vrp-racing:getCreateRaceDongle', function(pCid)
    local src = source
    local metaInfo = {
        characterId = tonumber(pCid),
    }
    TriggerClientEvent("player:receiveItem", src, 'racingusb0', 1, false, metaInfo, metaInfo)
end)

RegisterNetEvent('vrp-racing:getRaceDongle', function(pCid)
    local src = source
    local metaInfo = {
        characterId = tonumber(pCid),
    }
    TriggerClientEvent("player:receiveItem", src, 'racingusb2', 1, false, metaInfo, metaInfo)
end)
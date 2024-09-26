QBCore = exports['vrp-core']:GetCoreObject()

function getPlayerInventory(pCid)
    local result =  Await(SQL.execute('SELECT * FROM inventory WHERE name = @name', {
        name = 'ply-'..pCid
    }))

    return result
end

function getQuantity(pCid, itemid, checkQuality, metaInformation)
    local amount = 0
    local clientInventory = getPlayerInventory(pCid)
    for i,v in pairs(clientInventory) do
        local qCheck = not checkQuality or v.quality > 0
        if v.item_id == itemid and qCheck then
            if metaInformation then
                local totalMetaKeys = 0
                local metaFoundCount = 0
                local itemMeta = json.decode(v.information)
                for metaKey, metaValue in pairs(metaInformation) do
                    totalMetaKeys = totalMetaKeys + 1
                    if itemMeta[metaKey] and itemMeta[metaKey] == metaValue then
                        metaFoundCount = metaFoundCount + 1
                    end
                end
                if totalMetaKeys <= metaFoundCount then
                    amount = amount + v.amount
                end
            else
                amount = amount + v.amount
            end
        end
    end
    return amount
end

function hasEnoughOfItem(pSource, itemid, amount, shouldReturnText, checkQuality, metaInformation)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if shouldReturnText == nil then shouldReturnText = true end
    if itemid == nil or itemid == 0 or amount == nil or amount == 0 then
        if shouldReturnText then
            TriggerClientEvent("DoLongHudText", pSource, "I dont seem to have this in my pockets.", 2)
        end
        return false
    end

    amount = tonumber(amount)

  
    if getQuantity(Player.PlayerData.citizenid, itemid, checkQuality, metaInformation) >= amount then
        return true
    end

    if (shouldReturnText) then
        TriggerClientEvent("DoLongHudText", pSource, "I dont have enough of that item...", 2)
    end

    return false
end exports('hasEnoughOfItem', hasEnoughOfItem)

function getItemsOfType(pSource, itemid, limitAmount, checkQuality, metaInformation)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if itemid == nil then
        return nil
    end

    local minQuality = type(checkQuality) == "number" and checkQuality or 0
    local itemsFound = {}
    local amount = tonumber(limitAmount)
    local clientInventory = getPlayerInventory(Player.PlayerData.citizenid)

    for i,v in pairs(clientInventory) do
        if amount and #itemsFound >= amount then
            -- print('brak')
            break
        end

        local qCheck = not checkQuality or v.quality > minQuality
        if v.item_id == itemid and qCheck then
          if metaInformation then
              local totalMetaKeys = 0
              local metaFoundCount = 0
              local itemMeta = json.decode(v.information)
              for metaKey, metaValue in pairs(metaInformation) do
                -- print(metaKey, json.encode(itemMeta))
                  totalMetaKeys = totalMetaKeys + 1
                  if itemMeta[metaKey] and itemMeta[metaKey] == metaValue then
                      metaFoundCount = metaFoundCount + 1
                  end
              end
              if totalMetaKeys <= metaFoundCount then
                  itemsFound[#itemsFound+1] = v
              end
          else
              itemsFound[#itemsFound+1] = v
          end
      end
  end

  return itemsFound
end exports('getItemsOfType', getItemsOfType)
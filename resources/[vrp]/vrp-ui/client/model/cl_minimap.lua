local MinimapStyle = "atlas"

local MinimapTypes = {
  default = {
    ["minimap_0_0"] = { txd = "default_minimap_sea_0_0", txn = "minimap_sea_0_0" },
    ["minimap_0_1"] = { txd = "default_minimap_sea_0_1", txn = "minimap_sea_0_1" },
    ["minimap_1_0"] = { txd = "default_minimap_sea_1_0", txn = "minimap_sea_1_0" },
    ["minimap_1_1"] = { txd = "default_minimap_sea_1_1", txn = "minimap_sea_1_1" },
    ["minimap_2_0"] = { txd = "default_minimap_sea_2_0", txn = "minimap_sea_2_0" },
    ["minimap_2_1"] = { txd = "default_minimap_sea_2_1", txn = "minimap_sea_2_1" },
    ["minimap_sea_0_0"] = { txd = "default_minimap_sea_0_0", txn = "minimap_sea_0_0" },
    ["minimap_sea_0_1"] = { txd = "default_minimap_sea_0_1", txn = "minimap_sea_0_1" },
    ["minimap_sea_1_0"] = { txd = "default_minimap_sea_1_0", txn = "minimap_sea_1_0" },
    ["minimap_sea_1_1"] = { txd = "default_minimap_sea_1_1", txn = "minimap_sea_1_1" },
    ["minimap_sea_2_0"] = { txd = "default_minimap_sea_2_0", txn = "minimap_sea_2_0" },
    ["minimap_sea_2_1"] = { txd = "default_minimap_sea_2_1", txn = "minimap_sea_2_1" },
  },
  atlas = {
    ["minimap_0_0"] = { txd = "minimap_sea_0_0", txn = "minimap_sea_0_0" },
    ["minimap_0_1"] = { txd = "minimap_sea_0_1", txn = "minimap_sea_0_1" },
    ["minimap_1_0"] = { txd = "minimap_sea_1_0", txn = "minimap_sea_1_0" },
    ["minimap_1_1"] = { txd = "minimap_sea_1_1", txn = "minimap_sea_1_1" },
    ["minimap_2_0"] = { txd = "minimap_sea_2_0", txn = "minimap_sea_2_0" },
    ["minimap_2_1"] = { txd = "minimap_sea_2_1", txn = "minimap_sea_2_1" },
    ["minimap_sea_0_0"] = { txd = "minimap_sea_0_0", txn = "minimap_sea_0_0" },
    ["minimap_sea_0_1"] = { txd = "minimap_sea_0_1", txn = "minimap_sea_0_1" },
    ["minimap_sea_1_0"] = { txd = "minimap_sea_1_0", txn = "minimap_sea_1_0" },
    ["minimap_sea_1_1"] = { txd = "minimap_sea_1_1", txn = "minimap_sea_1_1" },
    ["minimap_sea_2_0"] = { txd = "minimap_sea_2_0", txn = "minimap_sea_2_0" },
    ["minimap_sea_2_1"] = { txd = "minimap_sea_2_1", txn = "minimap_sea_2_1" },
  },
}

local statsToResetForSweatyFuckers = {
  "DB_HEADSHOTS",
  "DB_HITS_PEDS_VEHICLES",
  "DB_HITS",
  "DB_KILLS",
  "DB_PLAYER_KILLS",
  "DB_SHOTS",
  "DB_SHOTTIME",
  "DEATHS_PLAYER",
  "DEATHS",
  "EXPLOSIVE_DAMAGE_HITS_ANY",
  "EXPLOSIVE_DAMAGE_HITS",
  "EXPLOSIVES_USED",
  "HEADSHOTS",
  "HITS_PEDS_VEHICLES",
  "HITS",
  "KILLS_ARMED",
  "KILLS_IN_FREE_AIM",
  "KILLS",
  "PASS_DB_HEADSHOTS",
  "PASS_DB_HITS_PEDS_VEHICLES",
  "PASS_DB_HITS",
  "PASS_DB_KILLS",
  "PASS_DB_PLAYER_KILLS",
  "PASS_DB_SHOTS",
  "PASS_DB_SHOTTIME",
  "PISTOL_KILLS",
  "PLAYER_HEADSHOTS",
  "SHOTS"
}

AddEventHandler("vrp-ui:pauseMenuActive", function(active)
  for i=0,1 do
    for _, key in pairs(statsToResetForSweatyFuckers) do
      StatSetInt(GetHashKey(("MP%d_%s"):format(i, key)), 69, true)
    end
  end

  StatSetFloat(`MP0_WEAPON_ACCURACY`, 69.69, true)
  StatSetFloat(`MP1_WEAPON_ACCURACY`, 69.69, true)

  if MinimapStyle ~= "atlas" and active then
    -- Wait for pause map to load
    while not HasStreamedTextureDictLoaded("minimap_sea_2_1") do
      Citizen.Wait(0)
    end
    for txd, replace in pairs(MinimapTypes[MinimapStyle]) do
      RequestStreamedTextureDict(replace.txd, false)
      while not HasStreamedTextureDictLoaded(replace.txd) do
        Citizen.Wait(0)
      end
      AddReplaceTexture(txd, replace.txn, replace.txd, replace.txn)
    end
  end
end)

AddEventHandler("vrp-preferences:setPreferences", function(pData)
  local PrevMiniMapStyle = MinimapStyle or "atlas"
  MinimapStyle = pData["hud.minimap.style"] or "atlas"

  if MinimapTypes[MinimapStyle] and MinimapStyle ~= "atlas" then
    for txd, replace in pairs(MinimapTypes[MinimapStyle]) do
      RequestStreamedTextureDict(replace.txd, false)
      while not HasStreamedTextureDictLoaded(replace.txd) do
        Citizen.Wait(0)
      end
      AddReplaceTexture(txd, replace.txn, replace.txd, replace.txn)
    end
  end

  if PrevMiniMapStyle ~= "atlas" then
    for txd, replace in pairs(MinimapTypes[PrevMiniMapStyle]) do
      SetStreamedTextureDictAsNoLongerNeeded(replace.txd)
    end

    if MinimapStyle == "atlas" then
        for txd, replace in pairs(MinimapTypes[MinimapStyle]) do
          RemoveReplaceTexture(txd, replace.txn)
        end
      end
  end
end)

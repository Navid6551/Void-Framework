local PlayerList = {}
local RecentPlayers = {}

local function SortByKey(list, key, reverse)
  local sorted = {}
  for k, v in pairs(list) do
    table.insert(sorted, v)
  end
  table.sort(sorted, function(a, b)
    if reverse then
      return a[key] > b[key]
    else
      return a[key] < b[key]
    end
  end)
  return sorted
end

local function ContiguousIndex(pTable)
  local newPlayerList = {}
  local index = 0
  for k, v in pairs(pTable) do
    index = index + 1
    newPlayerList[index] = v
  end
  return newPlayerList
end

RegisterNUICallback('getPlayerData', function(data, cb)
  local data = {}
  
  local IndexedPlayerList = ContiguousIndex(PlayerList)

  if #IndexedPlayerList > 0 then
    data.players = SortByKey(IndexedPlayerList, "src")
  end

  local IndexedRecentPlayers = ContiguousIndex(RecentPlayers)

  if #IndexedRecentPlayers > 0 then
    data.recentPlayers = SortByKey(IndexedRecentPlayers, "timeadded", true)
  end

  local PlayersInScope = #GetActivePlayers()

  data.playersInScope = PlayersInScope or 0

  cb(data)
end)

local listeningForKeys = false
local function KeyListener()
  if not listeningForKeys then
    listeningForKeys = true
    Citizen.CreateThread(function()
      while listeningForKeys do
        if IsControlJustPressed(0, 173) then
          SendNUIMessage({action = 'downarrow'})
          PlaySoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
        end
        if IsControlJustPressed(0, 172) then
          SendNUIMessage({action = 'uparrow'})
          PlaySoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
        end
        if IsControlJustPressed(0, 174) then
          SendNUIMessage({action = 'leftarrow'})
          PlaySoundFrontend(-1, "NAV_LEFT_RIGHT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
        end
        if IsControlJustPressed(0, 175) then
          SendNUIMessage({action = 'rightarrow'})
          PlaySoundFrontend(-1, "NAV_LEFT_RIGHT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
        end
        if IsControlJustPressed(0, 11) then
          SendNUIMessage({action = 'pgdown'})
          PlaySoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
        end
        if IsControlJustPressed(0, 10) then
          SendNUIMessage({action = 'pgup'})
          PlaySoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
        end
        Citizen.Wait(0)
      end
    end)
  end
end

local function ShowUI()
  SendNUIMessage({action = "show"})
  KeyListener()
  TriggerEvent("vrp-police:blockInput", true)
end

local function HideUI()
  SendNUIMessage({action = "hide"})
  listeningForKeys = false
  TriggerEvent("vrp-police:blockInput", false)
end

local function AddPlayer(pData)
  PlayerList[pData.src] = pData
end

local function RemovePlayer(pData)
  PlayerList[pData.src] = nil
  RecentPlayers[pData.src] = pData
end

local function RemoveRecent(pSrc)
  RecentPlayers[pSrc] = nil
end

local function AddAllPlayers(pData, pRecentData)
  PlayerList = pData
  RecentPlayers = pRecentData
end

RegisterNetEvent('vrp-binds:keyEvent')
AddEventHandler('vrp-binds:keyEvent', function(name,onDown)
  if name ~= "PlayerList" then return end
  if onDown then ShowUI() else HideUI() end
end)

RegisterNetEvent("vrp-playerlist:AddPlayer")
AddEventHandler("vrp-playerlist:AddPlayer", function(pData)
  AddPlayer(pData)
end)

RegisterNetEvent("vrp-playerlist:RemovePlayer")
AddEventHandler("vrp-playerlist:RemovePlayer", function(pData)
  RemovePlayer(pData)
end)

RegisterNetEvent("vrp-playerlist:RemoveRecent")
AddEventHandler("vrp-playerlist:RemoveRecent", function(pSrc)
  RemoveRecent(pSrc)
end)

RegisterNetEvent("vrp-playerlist:AddAllPlayers")
AddEventHandler("vrp-playerlist:AddAllPlayers", function(pData, pRecentData)
  AddAllPlayers(pData, pRecentData)
end)
QBCore = exports['vrp-core']:GetCoreObject()

local function patrolArea(entity, waypoints)
  local currentWaypoint = 1

  Citizen.CreateThread(function()
    while true do
      if currentWaypoint > #waypoints then
        currentWaypoint = 1
      end

      TaskGoStraightToCoord(entity, waypoints[currentWaypoint].x, waypoints[currentWaypoint].y, waypoints[currentWaypoint].z, 1.0, -1, 0.0, 0.0)
      Citizen.Wait(15000)
      currentWaypoint = currentWaypoint + 1
    end
  end)
end

local function spawnAnimal(loc)
  local chance = math.random()
  for _, animal in pairs(Config.Hunting.animals) do
    if not foundAnimal and animal.chance > chance then
        foundAnimal = animal
    end
  end
  if not foundAnimal then return end

  local modelName = foundAnimal.model
  local spawnedAnimal = CreatePed(28, foundAnimal.hash, loc.x, loc.y, loc.z, true, true, true)

  local waypoints = {
    { x = loc.x + math.random(10, 50), y = loc.y, z = loc.z },
    { x = loc.x + math.random(50, 100), y = loc.y, z = loc.z },
    { x = loc.x, y = loc.y + math.random(10, 100), z = loc.z },
  }

  patrolArea(spawnedAnimal, waypoints)
end

function getRandomCoordsInRadius(centerX, centerY, centerZ, heading, radius)
  -- Generate a random angle
  local angle = math.random() * math.pi * 2
  
  -- Generate a random distance from the center within the radius
  local distance = math.random() * radius
  
  -- Calculate the offset coordinates using trigonometry
  local offsetX = math.cos(angle) * distance
  local offsetY = math.sin(angle) * distance
  
  -- Return the new coordinates
  return vector4(centerX + offsetX, centerY + offsetY, centerZ, heading)
end

local function baitDown()
  local locations = {
    {
      x =-1396.76,
      y = 4482.65,
      z = 24.08,
      h = 70.14,
      radius = 50,
      amount = 2
    },
    {
      x = -1355.24,
      y = 4431.67,
      z = 28.86,
      h = 16.41,
      radius = 50,
      amount = 4
    },
    {
      x  = -1216.62,
      y = 4457.79,
      z = 30.55,
      h = 191.93,
      radius = 50,
      amount = 3
    }
  }
  for k, v in pairs(locations) do
    for i = 1, v.amount do
      spawnAnimal(getRandomCoordsInRadius(v.x, v.y, v.z, v.h, v.radius))
    end
  end
end

RPC.register("givePlayerJobPay",function(pSource,pCash)
  local Player = QBCore.Functions.GetPlayer(pSource)

  Player.Functions.AddMoney('cash', pCash, "Hunting sale")

  return true
end)

RPC.register("vrp-hunting:getSettings",function()
  return Config.Hunting
end)

RPC.register("vrp-hunting:getSkinnedItem",function(pSource, pNetId, pAnimalName)
  DeleteEntity(NetworkGetEntityFromNetworkId(pNetId))
  local randomAmount = math.random(1,30)
  if randomAmount > 1 and randomAmount < 15 then
    TriggerClientEvent('player:receiveItem', pSource, 'huntingcarcass1', 1)
  elseif randomAmount > 15 and randomAmount < 23 then
    TriggerClientEvent('player:receiveItem', pSource, 'huntingcarcass2', 1)
  elseif randomAmount > 23 and randomAmount < 29 then
    TriggerClientEvent('player:receiveItem', pSource, 'huntingcarcass3', 1)
  else 
    TriggerClientEvent('player:receiveItem', pSource, "huntingcarcass4", 1)
  end
end)

RegisterServerEvent('vrp-hunting:skinReward')
AddEventHandler('vrp-hunting:skinReward', function()
  local _source = source
  local randomAmount = math.random(1,30)
  if randomAmount > 1 and randomAmount < 15 then
    TriggerClientEvent('player:receiveItem', _source, 'huntingcarcass1', 1)
  elseif randomAmount > 15 and randomAmount < 23 then
    TriggerClientEvent('player:receiveItem', _source, 'huntingcarcass2', 1)
  elseif randomAmount > 23 and randomAmount < 29 then
    TriggerClientEvent('player:receiveItem', _source, 'huntingcarcass3', 1)
  else 
    TriggerClientEvent('player:receiveItem', _source, "huntingcarcass4", 1)
  end
end)

Citizen.CreateThread(function()
  while true do
    baitDown()
    Citizen.Wait((1000 * 60) * 10)
  end
end)
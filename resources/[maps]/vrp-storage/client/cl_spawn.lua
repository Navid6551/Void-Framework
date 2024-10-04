isSelecting = nil
isPlacing = false
local _isTrusted = nil

function IsTrusted()
  if _isTrusted == nil then
    _isTrusted = RPC.execute("vrp-deployables:isTrustedCharacter")
  end
  return _isTrusted
end

AddEventHandler("vrp-spawn:characterSpawned", function()
  _isTrusted = nil
end)

AddEventHandler("vrp-inventory:itemUsed", function (itemId, itemInfo)
    if not Config.crates[itemId] then return end
    if isSelecting or isPlacing then return end
    isSelecting = itemId

    local isTrusted = IsTrusted()
    local result = exports["vrp-objects"]:PlaceObject(Config.crates[itemId].model, { adjustZ = true, groundSnap = true, allowGizmo = isTrusted })
    if not result then
        isSelecting = nil
        return
    end
    local success, data = result[1], result[2]
    if not success or not data then
        isSelecting = nil
        return
    end
    local coords = data.coords
    local rotation = data.rotation
    local quat = data.quaternion
    if not coords or not rotation or not quat then
        isSelecting = nil
        return
    end
    placeContainer(coords, rotation, quat)
end)


function placeContainer(selection, rotation, quat)
    local coordinates = vector3(
        selection.x,
        selection.y,
        selection.z
    )

    local dist = #(GetEntityCoords(PlayerPedId())-coordinates)
    if dist > 50 then
        isSelecting = nil
        return TriggerEvent("DoLongHudText", _L("storage-too-far", "You cannot place the container this far away"), 2)
    end

    if getClosestStash(5, coordinates) ~= nil then
        isSelecting = nil
        return TriggerEvent("DoLongHudText", _L("storage-too-close", "You are too close to another container, give it some room"), 2)
    end

    isPlacing = true

    if dist > 3 then
        TriggerEvent("DoLongHudText", _L("storage-placing-down", "Go to the location to place it down!"))
        CreateThread(function ()
            while #(GetEntityCoords(PlayerPedId())-coordinates) > 3 do
                Wait(100)
            end
            spawn(coordinates, rotation, quat)
        end)
        return
    end
    spawn(coordinates, rotation, quat)
end

function spawn(coordinates, rotation, quat)
    local location = exports["vrp-housing"]:getCurrentLocation()
    if location then
        local canPlace = canPlaceInHouse(location)
        if not canPlace then
            return TriggerEvent("DoLongHudText", _L("storage-cannot-place", "You cannot place the container here"), 2)
        end
        local x,y,z,w = quat.x, quat.y, quat.z, quat.w
        local data = {
            model = GetHashKey(Config.crates[isSelecting].model),
            coords = json.encode({ x = coordinates.x, y = coordinates.y, z = coordinates.z }),
            quat = json.encode({ x = x, y = y, z = z, w = w }),
            realName = Config.crates[isSelecting].model
        }
        TriggerServerEvent('objects:insertObject', location, data)
    end
    loadAnimDict(Config.anims.create.dict)
    TaskPlayAnim(PlayerPedId(), Config.anims.create.dict, Config.anims.create.name, 8.0, -8.0, 1000, 51, 1.0, false, false, false)
    local cid = exports["isPed"]:isPed("cid")
    TriggerServerEvent("vrp-storage:prepareStorage", isSelecting, cid, coordinates, rotation)
    TriggerServerEvent('server-remove-item', cid, isSelecting, 1)
    isSelecting = nil
    isPlacing = false
end

function canPlaceInHouse (location)
    local data = RPC.execute("objects:getObjects", location)
    local count = 0
    local crates = {}
    for _, crate in pairs(Config.crates) do
        crates[crate.model] = true
    end
    for _, obj in pairs(data.objects) do
        if crates[obj.realName] then
            count = count + 1
        end
    end
    return count <= Config.houseLimit
end

RegisterNetEvent("mkr_racing:recieveCreateData")
AddEventHandler("mkr_racing:recieveCreateData", function(pRaceName, pRaceType, pRaceCategory, pRaceThumbnail, pRaceMinLaps, pCheckpoints)
    local src = source

    local user = QBCore.Functions.GetPlayer(src)
    if not user then return end

    local hexId = user.PlayerData.citizenid

    local raceId = exports["vrp-mkr-racing"]:uuid()

    local length = 0.0
    for i, v in ipairs(pCheckpoints) do
        if i == #pCheckpoints and pRaceType == "Lap" then
            length = #(vector3(v["pos"]["x"],v["pos"]["y"],v["pos"]["z"]) - vector3(pCheckpoints[1]["pos"]["x"],pCheckpoints[1]["pos"]["y"],pCheckpoints[1]["pos"]["z"])) + length
        elseif i ~= #pCheckpoints then
            length = #(vector3(v["pos"]["x"],v["pos"]["y"],v["pos"]["z"]) - vector3(pCheckpoints[i+1]["pos"]["x"],pCheckpoints[i+1]["pos"]["y"],pCheckpoints[i+1]["pos"]["z"])) + length
        end
    end
    length = math.ceil(length)

    local result = Await(SQL.execute("INSERT INTO _race_track (id, name, author, length, type, minLaps, thumbnail, checkpoints, category) VALUES (@id, @name, @author, @length, @type, @minLaps, @thumbnail, @checkpoints, @category)", {
        id = raceId,
        name = pRaceName,
        author = hexId,
        length = length,
        type = pRaceType,
        minLaps = pRaceMinLaps,
        thumbnail = pRaceThumbnail,
        checkpoints = json.encode(pCheckpoints),
        category = pRaceCategory
    }))

    if not result then return end

    exports["vrp-mkr-racing"]:loadRace(src, {
        id = raceId,
        name = pRaceName,
        author = hexId,
        length = length,
        type = pRaceType,
        minLaps = pRaceMinLaps,
        thumbnail = pRaceThumbnail,
        checkpoints = pCheckpoints,
        category = pRaceCategory
    })
end)

-- RPC.register("mkr_racing:isRaceNameTaken", function(pSource, pRaceName)
--     local raceName = pRaceName.param

--     local result = Await(SQL.execute("SELECT * FROM _race_track WHERE name = @name", {
--         name = raceName
--     }))

--     if not result then return false end
--     if #result == 0 then return false end

--     return true
-- end)
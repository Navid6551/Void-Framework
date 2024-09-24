
RPC.register('vrp:vehicles:getPlayerVehiclesWithCoordinates', function(pSource, pCid)
    local vehicles = {}

    local data = Await(SQL.execute("SELECT * FROM _vehicle WHERE cid = @cid", {
        ["cid"] = pCid
    }))

    if not data[1] then
        return {}
    end

    for k, v in pairs(data) do
        local damage = json.decode(v.damage) or {
            engine = 1000,
            body = 1000
        }
        local location = v.location and json.decode(v.location) or{
            x = 1,
            y = 1,
            z = 1
        }

        table.insert(vehicles, {
            model = v.model,
            name = v.name or v.model,
            parking_state = v.state,
            parking_garage = v.garage,
            plate = v.plate,
            stats_body = damage.body / 1,
            stats_engine = damage.engine / 1,
            location = location
        })
    end

    return vehicles
end)
RPC.register('vrp-car-clothing:saveCurrentOutfit', function(pSource, pNetId, pInputs)
    local vin = exports['vrp-vehicles']:GetVehicleIdentifier(pNetId)
    if not vin then
        return false
    end

    local appearance = RPC.execute('GetVehicleAppearance', pSource, pNetId)
    local mods = RPC.execute('GetVehicleMods', pSource, pNetId)

    local insert = Await(SQL.execute("INSERT INTO _vehicle_clothing (vin, slot, app, mods) VALUES (@vin, @slot, @app, @mods)", {
        vin = vin,
        slot = pInputs.slot,
        app = json.encode(appearance),
        mods = json.encode(mods),
    }))

    if not insert then
        return false
    end
    TriggerClientEvent('DoLongHudText', 'Vehicle Outfit Saved.')
    return true
end)

    local vin = exports['vrp-vehicles']:GetVehicleIdentifier(pNetId)
    if not vin then
        TriggerClientEvent('DoLongHudText', pSource, 'This vehicle does not exist!', 2)
        return false
    end

    local data = Await(SQL.execute("SELECT * FROM _vehicle_clothing WHERE vin = @vin AND slot = @slot", {
        vin = vin,
        slot = pInputs.slot,
    }))

    if not data[1] then
        TriggerClientEvent('DoLongHudText', pSource, 'Failed to get the outfit!', 2)
        return false
    end

    return {
        app = json.decode(data[1].app),
        mods = json.decode(data[1].mods)
    }
end)
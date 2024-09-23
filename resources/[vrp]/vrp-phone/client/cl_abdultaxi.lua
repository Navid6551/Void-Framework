RegisterUICallback("vrp-ui:abdultaxi:getDrivers", function(data, cb)
    local success, drivers = RPC.execute("vrp-ui:abdultaxi:fetchDrivers")
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)

RegisterUICallback("vrp-ui:abdultaxi:signOnDuty", function(data, cb)
    local success, drivers = RPC.execute("vrp-ui:abdultaxi:addCharOnDuty")
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)

RegisterUICallback("vrp-ui:abdultaxi:signOffDuty", function(data, cb)
    local success, drivers = RPC.execute("vrp-ui:abdultaxi:removeCharFromDuty")
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)

RegisterUICallback("vrp-ui:abdultaxi:callDriver", function(data, cb)
    cb({data = {}, meta = { ok = true, message = "done" }})
    local myNumber = exports["isPed"]:isPed("phone_number")
    local driverNumber = data.driver.number

    if (tostring(myNumber) == tostring(driverNumber)) then
        return
    end
    
    -- If for some reason the driver number is null do nothing
    if driverNumber == nil then return end
    RPC.execute("phone:callStart", tostring(driverNumber))
end)


RegisterUICallback("vrp-ui:abdultaxi:updateStatus", function(data, cb)
    local success, drivers = RPC.execute("vrp-ui:abdultaxi:updateDriverStatus", data.status)
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)
RegisterUICallback("vrp-ui:nlts:getDrivers", function(data, cb)
    local success, drivers = RPC.execute("vrp-ui:nlts:fetchDrivers")
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)

RegisterUICallback("vrp-ui:nlts:signOnDuty", function(data, cb)
    local success, drivers = RPC.execute("vrp-ui:nlts:addCharOnDuty")
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)

RegisterUICallback("vrp-ui:nlts:signOffDuty", function(data, cb)
    local success, drivers = RPC.execute("vrp-ui:nlts:removeCharFromDuty")
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)

RegisterUICallback("vrp-ui:nlts:callDriver", function(data, cb)
    cb({data = {}, meta = { ok = true, message = "done" }})
    local driverNumber = data.driver.number

    if (tostring(myNumber) == tostring(driverNumber)) then
        return
    end
    
    -- If for some reason the driver number is null do nothing
    if driverNumber == nil then return end
    RPC.execute("phone:callStart", tostring(driverNumber))
end)


RegisterUICallback("vrp-ui:nlts:updateStatus", function(data, cb)
    local success, drivers = RPC.execute("vrp-ui:nlts:updateDriverStatus", data.status)
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)
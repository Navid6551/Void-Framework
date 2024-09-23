RegisterServerEvent("transfer:attempt:send")
AddEventHandler("transfer:attempt:send", function(plate, target)
    local pSrc = source
    local pUser = exports["vrp-base"]:getModule("Player"):GetUser(pSrc)
    local pChar = pUser:getCurrentCharacter().id
    local pSteam = GetPlayerIdentifiers(pSrc)[1]

    -- target shit
    local tUser = exports["vrp-base"]:getModule("Player"):GetUser(target)
    local tChar = tUser:getCurrentCharacter().id

    exports.oxmysql:execute("SELECT * FROM _vehicle WHERE cid = ? AND plate = ?",{pChar, plate}, function(data)
        if data[1] then
            exports.oxmysql:execute("UPDATE _vehicle SET `cid` = @cid, `cid` = @cid WHERE plate = @plate", {
                ['cid'] = tChar, 
                ['plate'] = plate
            })
            TriggerClientEvent("DoLongHudText", pSrc, "You have successfully transfered this vehicle!")
            TriggerClientEvent("DoLongHudText", target, "You have successfully received keys to your new ride!")
            TriggerClientEvent("keys:addNew", target ,plate)
        else
            TriggerClientEvent("DoLongHudText", pSrc, "You dont own this vehicle", 2)
        end

    end)
end)

RegisterNetEvent("vehicle:flip")
AddEventHandler("vehicle:flip", function(pTarget, pVehicle, pPitch, pVRoll, pVYaw)
	TriggerClientEvent("vehicle:flip", pTarget, pVehicle, pPitch, pVRoll, pVYaw)
end)
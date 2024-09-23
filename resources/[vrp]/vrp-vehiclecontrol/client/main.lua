HasControlOverVehicle, PlayerControlling, VehicleControlled = true

DecorRegister("forwardspeed", 1)
DecorRegister("steeringangle", 1)

RegisterNetEvent("vrp:vehicle:transfer:control")
AddEventHandler("vrp:vehicle:transfer:control", function(pServerID, vNetID)
	local playerID, vehicle = GetPlayerFromServerId(pServerID), NetToVeh(vNetID)

	if not HasControlOverVehicle and not DoesEntityExist(vehicle) then return end

	local playerPed, targetPed = GetPlayerPed(-1), GetPlayerPed(playerID)

	if vehicle == GetVehiclePedIsIn(playerPed) then
		PlayerControlling, VehicleControlled = serverID, vNetID

		HasControlOverVehicle = false


		Citizen.CreateThread(function()
			Debug("[Vehicle] Transfered Controls | Player: %s | Veh: %s |", pServerID, vNetID)

			while not HasControlOverVehicle do
				local canMove, forwardSpeed, steeringAngle = IsVehicleOnAllWheels(vehicle), DecorGetFloat(targetPed, "forwardspeed"), DecorGetFloat(targetPed, "steeringangle")

				if canMove and forwardSpeed ~= 0.0 then
					SetVehicleForwardSpeed(vehicle, forwardSpeed)
				end

				if steeringAngle ~= 0.0 then
					SetVehicleSteerBias(vehicle, steeringAngle)
				end

				Citizen.Wait(0)
			end

			Debug("[Vehicle] Restored Controls | Player: %s | Veh: %s |", pServerID, vNetID)
		end)

		Citizen.CreateThread(function()
			while not HasControlOverVehicle do
				if vehicle ~= GetVehiclePedIsIn(playerPed) then
					HasControlOverVehicle = true
				end

				Citizen.Wait(400)
			end
		end)
	end
end)

RegisterNetEvent("vrp:vehicle:recover:control")
AddEventHandler("vrp:vehicle:recover:control", function(pServerID, vNetID)
	if not HasControlOverVehicle and PlayerControlling == pServerID or VehicleControlled == vNetID then
		HasControlOverVehicle = true
	end
end)

function RequestVehicleControl(playerPed, vehicle)
	if DoesEntityExist(playerPed) and IsPedAPlayer(playerPed) then
		local serverID = GetPlayerServerId(NetworkGetPlayerIndexFromPed(playerPed))
		local netID = VehToNet(vehicle)
		TriggerServerEvent("vrp:vehicle:request:control", serverID, netID)
	end
end

function RestoreVehicleControl(playerPed, vehicle)
	if DoesEntityExist(playerPed) and IsPedAPlayer(playerPed) then
		local serverID = GetPlayerServerId(NetworkGetPlayerIndexFromPed(playerPed))
		local netID = VehToNet(vehicle)
		TriggerServerEvent("vrp:vehicle:restore:control", serverID, netID)
	end
end

RegisterNetEvent("vrp:vehicle:wheelchair:control")
AddEventHandler("vrp:vehicle:wheelchair:control", function(pArgs, pEntity)
	ToggleWheelchairControl(pEntity)
end)
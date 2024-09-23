local inUseStations = {}

VPX.Procedures.register('vrp-wheelfitment_sv:saveWheelfitment', function(pSource, pNetId, pFit)
    return exports['vrp-vehicles']:SaveVehicleWheelFitment(pNetId, pFit)
end)

VPX.Procedures.register('vrp-wheelfitment_sv:getIsWheelFitmentInUse', function(pSource, pZone)
    return inUseStations[pZone] ~= nil
end)

VPX.Procedures.register('vrp-wheelfitment_sv:setIsWheelFitmentInUse', function(pSource, pZone, pState)
    inUseStations[pZone] = pState and true or nil
end)
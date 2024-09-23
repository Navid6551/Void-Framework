DroppedEvidence, IsAccumulating, EvidenceDisabled = {}, false, false

AddEventHandler('vrp-evidence:disable', function (pDisable)
    EvidenceDisabled = pDisable
end)

AddEventHandler('vrp-evidence:dropEvidence', function (pCoords, pMeta, pSuffix)
    local uid = pCoords.x .. '-' .. pCoords.y .. '-' .. pCoords.z

    if pSuffix then uid = uid .. '-' .. pSuffix end

    DroppedEvidence[uid] = {
        ['x'] = pCoords.x,
        ['y'] = pCoords.y,
        ['z'] = pCoords.z,
        ['meta'] = pMeta
    }

    if IsAccumulating or EvidenceDisabled then return end

    IsAccumulating = true

    Citizen.SetTimeout(5000, function ()
        local dropped = DroppedEvidence

        DroppedEvidence = {}

        IsAccumulating = false

        RPC.execute('vrp-evidence:addEvidence', dropped)
    end)
end)
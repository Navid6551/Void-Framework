const QBCore = globalThis.exports['vrp-core'].GetCoreObject()

RPC.register('vrp-companions:getClosestPlayer', async(pSource, pCoords, pIgnor) => {
    const players = globalThis.exports['vrp-infinity'].GetNearbyPlayers(pCoords, 10)

    return players[0]
})

RPC.register('vrp-companions:getPetInProtectedInventory', async(pSource) => {
    const cid = QBCore.Functions.GetPlayer(pSource)?.PlayerData?.citizenid
    if (!cid) {
        return null
    }

    const result = await SQL.execute("SELECT * FROM inventory WHERE name = @name", {
        name: `container-protected:${cid}-Protected-protected`
    });
    
    for (const [k, v] of Object.entries(result)) {
        if (v.item_id === 'summonablepet') {
            return v
        }
    }

    return null
})
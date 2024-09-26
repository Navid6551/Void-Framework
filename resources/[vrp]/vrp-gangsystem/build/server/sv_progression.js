RPC.register('vrp-gangsystem:fetchGangProgression', async(pSource, pGang) => {
    const objects = globalThis.exports['vrp-objects'].GetObjectsByNamespace('graffiti').filter((pItem) => pItem.data.metadata.gangId === pGang)
    const config = exports["vrp-config"].GetModuleConfig("vrp-gangsystem")
    const progression = await Promise.all(config.gangProggression.map((pItem) => {
        return {
            unlocked: objects.length >= pItem.graffitiNeeded,
            ...pItem,
        }
    }))

    return {
        currentGraffitis: objects.length,
        progression: progression
    }
})

RPC.register('vrp-gangsystem:getFoundGraffiti', async(pSource, pIsDev) => {
    const objects = globalThis.exports['vrp-objects'].GetObjectsByNamespace('graffiti')
    const graffitis = []
    const myGang = GetCurrentGang(pSource)

    if (!myGang) {
        return []
    }
    
    for (const [k, v] of Object.entries(objects)) {
        if (v.data.metadata.gangsDiscovered.includes(myGang.id)) {
            graffitis.push({
                id: v.id,
                coords: v.coords,
                color: 5
            })
        }
    }

    return graffitis
})

RPC.register('vrp-gangs:addFlag', async(pSource, pEntity, pGang, pUpgrade) => {
    const objects = globalThis.exports['vrp-objects'].GetObjectsByNamespace('gang-flags')
    for (const [k, v] of Object.entries(objects)) {
        if (v.data.gangId === pGang) {
            return [false, 'You already have a flag!']
        }
    }

    const [success, message] = await AddLogForGang(pSource, pGang, `${FetchPlayerFullName(pSource)} Placed A Gang Flag`)
    if (!success) {
        return [false, message]
    }

    return [true, 'Placed gang flag.']
})

RPC.register('vrp-gangsystem:getGangFlagLocation', async() => {
    const objects = globalThis.exports['vrp-objects'].GetObjectsByNamespace('gang-flags')
    for (const [k, v] of Object.entries(objects)) {
        if (v.data.gangId === pGang) {
            return v
        }
    }

    return false
})

RPC.register('vrp-gangsystem:getCostOfSpray', async(pSource, pGang) => {
    return 5000
})

onNet('vrp-gangsystem:purchaseGangSpray', async(pSpray, pCost) => {
    const src = source
    const [success] = await AddLogForGang(src, pSpray, `Purchased a gang spray, Cost: ${pCost} `, true)
    if (!success) {
        return false
    }

    globalThis.exports['vrp-graffiti'].CreateSpray(src, pSpray)
})
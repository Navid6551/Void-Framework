const CreateSpray = (pSource, pSpray) => {
    const config = exports["vrp-config"].GetModuleConfig("vrp-graffiti:sprays")
    if (!config[pSpray]) {
        return
    }
    const spray = config[pSpray]
    let sparyData = {
        model: spray.model,
        sprayId: pSpray,
        _hideKeys: ["sprayId", "model", "gangId", "_image_url"]
    }
    if (spray.isGang) {
        sparyData.gangId = pSpray
    }

    if (spray.image) {
        sparyData._image_url = spray.image
    }
    
    TriggerClientEvent('player:receiveItem', pSource, 'spraycan', 1, false, sparyData, sparyData)
}

RPC.register('vrp-graffiti:spray', async(pSource, pModel, pCoords, pRotation, pGang) => {
    let meta = {}
    if (pGang) {
        const config = exports["vrp-config"].GetModuleConfig("vrp-graffiti:sprays")[pGang]
        meta.gangId = pGang
        meta.gangsDiscovered = [pGang]
        if (config?.color) {
            meta.color = config.color
        }
        const [success] = await globalThis.exports['vrp-gangsystem'].AddLogForGang(pSource, pGang, `Sprayed at ${JSON.stringify(pCoords)}`, true)
        if (!success) {
            return false
        }
    }
    
    return await globalThis.exports['vrp-objects'].addObjectAndSave(pSource, 'graffiti', pModel, pCoords, pRotation, meta)
})

onNet('vrp-graffiti:completePurchase', async(pSpray) => {
    const src = source
    CreateSpray(src, pSpray)
})

globalThis.exports('CreateSpray', CreateSpray)
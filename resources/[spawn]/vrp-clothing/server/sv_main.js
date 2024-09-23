const QBCore = exports['vrp-core'].GetCoreObject()

RPC.register('vrp-clothing:getTattoos', async(pSource) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    const result = await SQL.execute('SELECT * FROM player_clothes WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })
    if (!result[0]) {
        return {}
    }
    return JSON.parse(result[0].tattoos) ?? {}
})

RPC.register('vrp-clothing:savePedData', async(pSource, pModel, pHeadBlend, pFeaturs, pOverlays, pEyeColor) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    const result = await SQL.execute('SELECT * FROM player_face WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })
    if (!pCid || pModel === 0 || pModel === '0') {
        return false
    }
    if (result === null || !result[0]) {
        const insert = await SQL.execute('INSERT INTO player_face (citizenid, model, headblend, features, overlays, eyeColor) VALUES (@citizenid, @model, @headblend, @features, @overlays, @eyeColor)',
            {
                citizenid: pCid,
                model: pModel,
                headblend: JSON.stringify(pHeadBlend),
                features: JSON.stringify(pFeaturs),
                overlays: JSON.stringify(pOverlays),
                eyeColor: pEyeColor
            }
        )
        return true
    }
    const update = await SQL.execute('UPDATE player_face SET model = @model, headblend = @headblend, features = @features, overlays = @overlays, eyeColor = @eyeColor WHERE citizenid = @citizenid', {
        ["model"]: pModel,
        ["headblend"]: JSON.stringify(pHeadBlend),
        ["features"]: JSON.stringify(pFeaturs),
        ["overlays"]: JSON.stringify(pOverlays),
        ["eyeColor"]: pEyeColor,
        ["citizenid"]: pCid,
    })

    return true
})

async function getPedData(pCid) {
    const result = await SQL.execute('SELECT * FROM player_face WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })
    if (result === null || !result[0]) {
        return {
            model: 0,
            headblend: {},
            features: {},
            overlays: {},
            eyeColor: -1,
        }
    }
    return {
        model: Number(result[0].model),
        headblend: JSON.parse(result[0].headblend),
        features: JSON.parse(result[0].features),
        overlays: JSON.parse(result[0].overlays),
        eyeColor: result[0].eyeColor
    }
} exports('getPedData', getPedData)

async function getDecorations(pCid) {
    const result = await SQL.execute('SELECT * FROM player_clothes WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })
    if (result === null || !result[0]) {
        return {
            model: 0,
            tattoos: {},
            fade: {},
        }
    }
    return {
        model: Number(result[0].model),
        tattoos: JSON.parse(result[0].tattoos) ?? {},
        fade: JSON.parse(result[0].fade) ?? {},
    }
} exports('getDecorations', getDecorations)

RPC.register('vrp-clothing:getPedData', async(pSource, pModel) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    return await getPedData(pCid)
})

RPC.register('vrp-clothing:saveCurrentClothing', async(pSource, pModel, pDrawables, pProps, pHair, pFade, pCustomModel) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    if (!pCid || pModel === 0 || pModel === '0') {
        return false
    }
    const result = await SQL.execute('SELECT * FROM player_clothes WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })
    if (result === null || !result[0]) {
        const insert = await SQL.execute('INSERT INTO player_clothes (citizenid, model, drawables, props, hairColor, fadeLayer, customHeadModel) VALUES (@citizenid, @model, @drawables, @props, @hairColor, @fadeLayer, @customHeadModel)',
            {
                citizenid: pCid,
                model: pModel,
                drawables: JSON.stringify(pDrawables),
                props: JSON.stringify(pProps),
                hairColor: JSON.stringify(pHair),
                fadeLayer: pFade,
                customHeadModel: false
            }
        )
        return true
    }
    const update = await SQL.execute('UPDATE player_clothes SET model = @model, drawables = @drawables, props = @props, hairColor = @hairColor, fadeLayer = @fadeLayer, customHeadModel = @customHeadModel WHERE citizenid = @citizenid', {
        ["model"]: pModel,
        ["drawables"]: JSON.stringify(pDrawables),
        ["props"]: JSON.stringify(pProps),
        ["hairColor"]: JSON.stringify(pHair),
        ["fadeLayer"]: pFade,
        ["customHeadModel"]: pCustomModel,
        ["citizenid"]: pCid,
    })

    return true
})

async function getCurrentClothing(pCid) {
    const result = await SQL.execute('SELECT * FROM player_clothes WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })
    if (result === null || !result[0]) {
        return {
            model: 0,
            drawables: {},
            props: {},
            hairColor: [0, 0],
            // customHeadModel: false,
        }
    }
    const pHair = JSON.parse(result[0].hairColor)
    return {
        model: Number(result[0].model),
        drawables: JSON.parse(result[0].drawables),
        props: JSON.parse(result[0].props),
        hairColor: pHair,
        fadeLayer: result[0].fadeLayer,
        // customHeadModel: result[0].customHeadModel
    }
}

RPC.register('vrp-clothing:getCurrentClothing', async(pSource) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    return await getCurrentClothing(pCid) 
})

exports('getCurrentClothing', getCurrentClothing)

RPC.register('vrp-clothing:getOutfits', async(pSource) => {
    const playerOutfits = []
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    const result = await SQL.execute('SELECT * FROM player_outfits WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })

    if (result[0]) {
        for (const [k, v] of Object.entries(result)) {
            playerOutfits.push({
                id: v.id,
                name: v.name,
                tags: v.tags,
                slot: Number(v.slot),
                model: v.model,
                drawables: JSON.parse(v.drawables),
                props: JSON.parse(v.props),
                hairColor: JSON.parse(v.hairColor),
                // fadeLayer: false,
                customHeadModel: false,
            })
        }
    }

    return playerOutfits
})

RPC.register('vrp-clothing:saveOutfit', async(pSource, pSlot, pName, pTags, pModel, pDrawables, pProps, pHair) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    const insert = await SQL.execute('INSERT INTO player_outfits (citizenid, slot, name, tags, model, drawables, props, hairColor, fadeLayer, customHeadModel) VALUES (@citizenid, @slot, @name, @tags, @model, @drawables, @props, @hairColor, @fadeLayer, @customHeadModel)',
        {
            citizenid: pCid,
            slot: pSlot,
            name: pName,
            tags: pTags,
            model: pModel,
            drawables: JSON.stringify(pDrawables),
            props: JSON.stringify(pProps),
            hairColor: JSON.stringify(pHair),
            fadeLayer: false,
            customHeadModel: false
        }
    )

    return true
})

RPC.register('vrp-clothing:deleteOutfit', async(pSource, pNumber) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    const update = await SQL.execute('DELETE FROM player_outfits WHERE citizenid = @citizenid AND slot = @slot', {
        ["slot"]: pNumber,
        ["citizenid"]: pCid,
    })
    return true
})

RPC.register('vrp-clothing:fetchClothingData', async(pSource, pData) => {
    const shitBrp = []
    const pCid = Array.isArray(pData) ? pData : [pData]
    for (const [k, v] of Object.entries(pCid)) {
        const clothing = await getCurrentClothing(v)
        const pedData = await getPedData(v)
        const dec = await getDecorations(v)
        shitBrp.push({
            characterId: v,
            clothing: clothing,
            pedData: pedData,
            decorations: dec,
        })
    }
    return shitBrp
})

RPC.register('vrp-clothing:fetchBlockedTattoosForCharacter', async() => {
    return false
})

RPC.register('vrp-clothing:fetchBlockedClothingForCharacter', async() => {
    return false
})

RPC.register('vrp-clothing:purchaseClothing', async(pSource, pAction, pIdk) => {
    return true
})

RPC.register('clothing:getDlcNames', async() => {
    return []
})

RPC.register('vrp-admin:isRanks', async() => {
    return false
})

RPC.register('vrp-clothing:getAllowedPeds', async() => {
    return []
})

RPC.register('vrp-clothing:saveFade', async(pSource, pModel, pFade) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    const update = await SQL.execute('UPDATE player_clothes SET fade = @fade WHERE citizenid = @citizenid', {
        ["fade"]: JSON.stringify(pFade),
        ["citizenid"]: pCid,
    })
    return true
})

RPC.register('vrp-clothing:saveTattoos', async(pSource, pModel, pTattoos) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    const update = await SQL.execute('UPDATE player_clothes SET tattoos = @tattoos WHERE citizenid = @citizenid', {
        ["tattoos"]: JSON.stringify(pTattoos),
        ["citizenid"]: pCid,
    })
    return true
})

RPC.register('vrp-clothing:getFade', async(pSource, pModel, pFade) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    const result = await SQL.execute('SELECT * FROM player_clothes WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })
    if (!result[0]) {
        return {}
    }
    return JSON.parse(result[0].fade) ?? {}
})

RPC.register('vrp-clothing:getNextFadeLayerId', async(pSource, pModel) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    const pCid = Player.PlayerData.citizenid
    const result = await SQL.execute('SELECT * FROM player_clothes WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })
    if (!result[0]) {
        return 1
    }
    return Number(result[0].fadeLayer) + 1
})
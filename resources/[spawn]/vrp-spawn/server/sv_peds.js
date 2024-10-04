const QBCore = exports['vrp-core'].GetCoreObject()

RPC.register('vrp-character:fetchCharacterData', async(pSource) => {
    const PlayerChats = []
    const license = QBCore.Functions.GetIdentifier(pSource, 'license')
    const result = await SQL.execute('SELECT * FROM players WHERE license = @license', {
        ["license"]: license
    })

    for (const [k, v] of Object.entries(result)) {
        const char = JSON.parse(v.charinfo)
        PlayerChats.push({
            id: Number(v.citizenid),
            first_name: char.firstname,
            last_name: char.lastname,
            gender: char.gender,
            dob: char.birthdate,
        })
    }
    return PlayerChats
})

RPC.register('vrp-character:createCharacter', async(pSource, pData) => {
    const cid = await exports['vrp-core'].CreateCitizenId()
    const pCharData = {
        citizenid: cid,
        charinfo: {
            firstname: pData.firstname,
            lastname: pData.lastname,
            birthdate: pData.dob,
            gender: pData.gender,
        }
    }

    if  (!QBCore.Player.Login(pSource, false, pCharData)) {
        return {
            success: false,
            message: "Could't save your character please try agin if same happend please contact an administrator",
            cid: cid
        }
    }
    
    QBCore.Commands.Refresh(pSource)

    return {
        success: true,
        message: "",
        cid: cid
    }
})

RPC.register('vrp-base:selectCharacter', async(pSource, pCid) => {
    
    if (QBCore.Player.Login(pSource, pCid)) {

        QBCore.Commands.Refresh(pSource)

        const result = await SQL.execute('SELECT * FROM players WHERE citizenid = @citizenid', {
            ["citizenid"]: pCid
        })    
        
        return {
            loggedin: true,
            selectcharacter: pCid,
            chardata: JSON.parse(result[0].charinfo)
        }

    }

    return {
        loggedin: false,
        selectcharacter: pCid
    }
})

onNet('character:loadspawns', async() => {
    const src = source
    const pChar = QBCore.Functions.GetPlayer(src).PlayerData
    const pCid = pChar.citizenid
    const houses = await globalThis.exports['vrp-housing'].GetCurrentOwned(src)
    const keys = await globalThis.exports['vrp-housing'].GetCurrentKeys(src, false)
    let spawnData = {}

    const hasMotel = await SQL.execute('SELECT * FROM player_motel WHERE citizenid = @citizenid', {
        ["citizenid"]: pCid
    })

    if (!hasMotel[0]) {
        await SQL.execute('INSERT INTO player_motel (citizenid, building_type) VALUES (@citizenid, @building_type)', {
            citizenid: pCid,
            building_type: 3,
        })

        spawnData = {
            overwrites: 'new',
            hospital: {
                illness: 'none'
            },
            motelRoom: {
                roomType: 3,
            },
            houses: houses,
            keys: keys
        }

    } else {
        
        spawnData = {
            hospital: {
                illness: 'none'
            },
            motelRoom: {
                roomType: 3,
            },
            houses: houses,
            keys: keys,
            crash: {
                position: pChar.position
            }
        }
    }

    emitNet('spawn:clientSpawnData', src, spawnData)
})
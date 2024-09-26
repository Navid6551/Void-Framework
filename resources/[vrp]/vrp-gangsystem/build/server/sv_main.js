const QBCore = exports['vrp-core'].GetCoreObject()
const GlobalGangs = []

const GetCurrentGang = (pSource) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    if (!Player) {
        return false
    }
    const pCid = Player.PlayerData.citizenid

    for (const [k, v] of Object.entries(GlobalGangs)) {
        if (v.leader === Number(pCid)) {
            return {
                isLeader: true,
                salesToday: 0,
                moneyCollected: 0,
                ...v,
            }
        }

        for (const [x, z] of Object.entries(v.members)) {
            if (z.cid === Number(pCid)) {
                return {
                    salesToday: 0,
                    moneyCollected: 0,
                    ...v,
                }
            }
        }
    }

    return false
}

const GetGangByCode = (pCode) => {
    for (const [k, v] of Object.entries(GlobalGangs)) {
        if (v.id === pCode) {
            return [v, k]
        }
    }

    return [false, 0]
}

const RefreshOnlineMembers = async(pGang) => {
    const [gang, index] = GetGangByCode(pGang)
    if (!gang) {
        return [false, 0]
    }
    const allMembers = await Promise.all(gang.members.map((pItem) => {
        const Player =  QBCore.Functions.GetPlayerByCitizenId(String(pItem.cid))
        return {
            isOnline: Player ? true : false,
            ...pItem
        }
    }))

    return [true, allMembers.filter((pItem) => pItem.isOnline).length]
}

const UpdateGangById = async(pId, pType, pValue) => {
    const update = await SQL.execute(`UPDATE _player_gangs SET ${pType} = @newValue  WHERE id = @id`, {
        newValue: pValue,
        id: pId
    });

    if (!update) {
        return false
    }

    return true
}

const AddLogForGang = async(pSource, pGang, pLog, fetchName) => {
    const [gang] = GetGangByCode(pGang)
    if (!gang) {
        return [false, 'Failed to get the gang!']
    }

    const logs = gang.logs
    logs.push({
        log: fetchName ? `${FetchPlayerFullName(pSource)} ${pLog}` : pLog,
        date: Date.now()
    })

    const update = await UpdateGangById(gang.dbId, 'logs', JSON.stringify(logs))
    if (!update) {
        return [false, 'Falied to update gang logs']
    }

    return [true, '']
}

const CreateNewGang = async(pData) => {
    const Player = QBCore.Functions.GetPlayer(Number(pData.leader))
    const members = [
        {
            cid: Number(Player.PlayerData.citizenid),
            name: `${Player.PlayerData.charinfo.firstname} ${Player.PlayerData.charinfo.lastname}`
        }
    ]

    const results = await SQL.execute('INSERT INTO _player_gangs (leader, code, gangName, members) VALUES (@leader, @code, @gangName, @members)', {
        leader: members[0].cid,
        code: pData.code,
        gangName: pData.gangName,
        members: JSON.stringify(members),
    });

    if (!results) {
        return [false, 'Failed to insert into database']
    }

    GlobalGangs.push({
        id: pData.code,
        name: pData.gangName,
        dbId: results.insertId,
        leader: members[0].cid,
        gangName: pData.gangName,
        members: members,
        maxMembers: 5,
        logs: [],
    })

    return [true, '']
}

RPC.register('vrp-gangsystem:getCurrentGang', async(pSource) => {
    const myGang = GetCurrentGang(pSource)
    if (!myGang) {
        return false
    }
    
    return myGang.id
})

RPC.register('vrp-gangsystem:getGanginfo', async(pSource) => {
    return GetCurrentGang(pSource)
})

RPC.register('vrp-gangsystem:hasEnoughMembersAround', async(pSource, pGang, pMembers) => {
    const [gang] = GetGangByCode(pGang)
    if (!gang) {
        return false
    }

    const [, members] = await RefreshOnlineMembers(pGang)

    return Number(members) >= pMembers
})

on('onResourceStart', async(pResource) => {
    if (pResource !== GetCurrentResourceName()) {
        return
    }
    const result = await SQL.execute('SELECT * FROM _player_gangs', {})
    for (const [k, v] of Object.entries(result)) {
        const members = JSON.parse(v.members)

        GlobalGangs.push({
            id: v.code,
            name: v.gangName,
            dbId: v.id,
            leader: v.leader,
            gangName: v.gangName,
            members: members,
            maxMembers: v.maxMembers,
            logs: JSON.parse(v.logs),
        })
    }
})

globalThis.exports('GetCurrentGang', GetCurrentGang)
globalThis.exports('CreateNewGang', CreateNewGang)
globalThis.exports('AddLogForGang', AddLogForGang)
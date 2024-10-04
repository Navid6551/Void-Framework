RPC.register('vrp-gangsystem:fetchIsStaff', async(pSource) => {
    const [isAdmin] = await globalThis.exports['vrp-admin'].isAdmin(pSource)
    return isAdmin
})

RPC.register('vrp-gangsystem:fetchStaffInformation', async() => {
    let members = 0
    for (const [k, v] of Object.entries(GlobalGangs)) {
        members = members + v.members.length
    }

    return {
        totalGroups: GlobalGangs.length,
        totalMembersInGroups: members,
        groups: GlobalGangs
    }
})

RPC.register('vrp-gangsystem:staffFetchGangLogs', async(pSource, pGang) => {
    let logs = []

    if (pGang) {
        const [gang] = GetGangByCode(pGang)
        if (!gang) {
            return []
        } 

        return gang.logs
    }
    
    for (const [k, v] of Object.entries(GlobalGangs)) {
        logs = [
            ...logs,
            ...v.logs
        ]
    }
    
    return logs
})

RPC.register('vrp-gangsystem:staffRemoveMember', async(pSource, pGang, pMember) => {
    const [gang] = GetGangByCode(pGang)
    if (!gang) {
        return [false, 'Gang dont exist!']
    } 
    const memberIndex = gang.members.findIndex((pItem) => {
        return pItem.cid === pMember
    })

    if (memberIndex === -1) {
        return [false, 'Failed to find member in this group']
    }

    gang.members.splice(memberIndex, 1)
    const update = await UpdateGangById(gang.dbId, 'members', JSON.stringify(gang.members))
    if (!update) {
        return [false, 'Falied to update gang members']
    }

    return [true, 'Removed member from the group']
})
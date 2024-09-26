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
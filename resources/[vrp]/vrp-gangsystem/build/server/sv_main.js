RPC.register('vrp-gangsystem:getGangsPedModels', async() => {
    return {}
})

RPC.register('vrp-gangsystem:getCurrentGang', async() => {
    return 'vagos'
})

RPC.register('vrp-gangsystem:getGanginfo', async() => {
    return{
        isLeader: true,
        gangName: 'vagos',
        members: [
            {
                name: 'Suck',
                cid: 1
            },
            {
                name: 'Your',
                cid: 2
            },
            {
                name: 'Mumzy',
                cid: 2
            },
        ],
        maxMembers: 5,
        salesToday: 0,
        moneyCollected: 0
    }
})

RPC.register('vrp-gangsystem:fetchIsStaff', async() => {
    return true
})

RPC.register('vrp-gangsystem:fetchGangProgression', async() => {
    return {
        currentGraffitis: 10,
        progression: [
            {
                name: "Tier 1",
                unlocked: true,
                graffitiNeeded: 5
            },
            {
                name: "Tier 2",
                unlocked: true,
                graffitiNeeded: 10
            },
            {
                name: "Tier 3",
                unlocked: false,
                graffitiNeeded: 15
            },
            {
                name: "Tier 4",
                unlocked: false,
                graffitiNeeded: 25
            },
        ]
    }
      
})

RPC.register('vrp-gangsystem:fetchStaffInformation', async() => {
    return {
        totalGroups: 20,
        totalMembersInGroups: 20,
        groups: [
            {
                id: "vagos",
                name: "Vagos"
            },
            {
                id: "gsf",
                name: "GSF"
            }
        ]
    }
})

RPC.register('vrp-gangsystem:staffFetchGangLogs', async() => {
    return {
        logs: [
            {
                log: "my log",
                date: 1324171354
            }, 
            {
                log: "my log ya allah",
                date: 1324171354
            }
        ]
    }
})
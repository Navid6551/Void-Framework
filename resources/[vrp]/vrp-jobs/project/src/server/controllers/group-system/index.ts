const QBCore = globalThis.exports['vrp-core'].GetCoreObject()
const PublicJobs = [
    {
        id: 1,
        jobId: 'postop',
        icon: 'store-alt',
        name: 'Postop',
        capacity: 2,
        groups: 0,
        vpn: false,
        pay_grade: 5,
        givecontract: true,
        headquarters: [
            -429.63,
            -2785.98,
            6.0
        ],
        timeout: [5000, 7000]
    },
    {
        id: 2,
        jobId: 'fishing',
        icon: 'fish',
        name: 'Fishing',
        capacity: 2,
        groups: 0,
        vpn: false,
        pay_grade: 5,
        givecontract: true,
        headquarters: [
            -335.41,
            6105.5,
            31.45
        ],
        timeout: [5000, 7000]
    },
    {
        id: 3,
        jobId: 'sanitation_worker',
        icon: 'trash-alt',
        name: 'Sanitation',
        capacity: 4,
        groups: 0,
        vpn: false,
        pay_grade: 5,
        givecontract: true,
        headquarters: [
            -355.13,
            -1547.42,
            27.72
        ],
        timeout: [5000, 7000]
    },
    {
        id: 4,
        jobId: 'boosting',
        icon: 'trash-alt',
        name: 'Boosting',
        capacity: 4,
        groups: 0,
        hidden: true,
        pay_grade: 5,
        givecontract: false,
        headquarters: [
            -355.13,
            -1547.42,
            27.72
        ],
        timeout: [5000, 7000]
    },
]
const jobNpcs = {
    postop: {
        id: 'postop',
        name: "Postop Worker",
        pedType: 4,
        model: "a_m_y_stbla_02",
        networked: false,
        position: {
            coords: {
                x: -430.02,
                y: -2785.82,
                z: 6.0,
            },
            heading: 42.47
        },
        distance: 50.0,
        settings: [
            { mode: "invincible", active: true },
            { mode: "ignore", active: true },
            { mode: "freeze", active: true },
        ],
        flags: {
            isNPC: true,
            isJobEmployer: true
        }
    },
    fishing: {
        id: 'fishing',
        name: "Fishing Worker",
        pedType: 4,
        model: "a_m_y_soucent_01",
        networked: false,
        position: {
            coords: {
                x: -335.41,
                y: 6105.5,
                z: 31.45
            },
            heading: 217.78
        },
        distance: 50.0,
        settings: [
            { mode: "invincible", active: true },
            { mode: "ignore", active: true },
            { mode: "freeze", active: true },
        ],
        flags: {
            isNPC: true,
            isJobEmployer: true
        }
    },
    sanitation_worker: {
        id: 'sanitation_worker',
        name: "Sanitation Worker",
        pedType: 4,
        model: "s_m_y_garbage",
        networked: false,
        position: {
            coords: {
                x: -355.13,
                y: -1547.42,
                z: 27.72
            },
            heading: 268.91
        },
        distance: 50.0,
        settings: [
            { mode: "invincible", active: true },
            { mode: "ignore", active: true },
            { mode: "freeze", active: true },
        ],
        flags: {
            isNPC: true,
            isJobEmployer: true
        }
    }
}
const PublicGroups: any = []
const playersCheckedin: any = []

export const triggerEventForMemers = (pGroup: any, pEvent: any, ...args: any) => {
    for (const [k, v] of Object.entries(pGroup.members) as any) {
        emitNet(pEvent, v.src, ...args)
    }
}

export const refreshGroups = () => {
    emitNet('vrp-ui:updateJobState', -1, {
        groups: PublicGroups
    })
}

export const getRandomNumber = (pMin: any, pMax: any) => {
    return pMax ? Math.floor(Math.random() * (pMax - pMin + 1) + pMin) : Math.floor(Math.random() * pMin);
}

export const GetGroupByPlayer = (pSource: any) => {
    for (let i = 0; i < PublicGroups.length; i++) {
        const group = PublicGroups[i];
        const memberIndex = group.members.findIndex((member: any) => member.src === pSource);
        if (memberIndex !== -1) {
            return group;
        }
    }
    return false;
}

export const GetGroupByCid = (pCid: any) => {
    for (let i = 0; i < PublicGroups.length; i++) {
        const group = PublicGroups[i];
        const memberIndex = group.members.findIndex((member: any) => member.id === pCid);
        if (memberIndex !== -1) {
            return group;
        }
    }
    return false;
}

export const UpdateGroupState = (pSource: any, pData: any) => {
    const group = GetGroupByPlayer(pSource)
    for (const [k, v] of Object.entries(pData)) {
        group[k] = v
    }

    triggerEventForMemers(group, 'vrp-ui:updateJobState', pData)
}

export const TriggerEventForGroup = (pSource: any, pEvent: any, ...args: any) => {
    const group = GetGroupByPlayer(pSource)
    triggerEventForMemers(group, pEvent, ...args)
}

export const DoActionForThisJob = (pSource: any, activityId: any) => {
    const group = GetGroupByPlayer(pSource)
    if (!group) {
        return [false, 'You are not in a group']
    }
    const activity = group.activity
    if (!activity) {
        return [false, 'Your group is not doing any activity at the moment']
    }
    if (group.jobId !== activityId) {
        return [false, 'I dont think u should be doing this']
    }

    return [true, '']
}

export const StartActivity = (pSource: any, pData: any) => {
    const group = GetGroupByPlayer(pSource)
    if (!group) {
        return [false, 'You not in a group']
    }

    if (!group.ready) {
        return [false, 'Your group is not ready for jobs']
    }
    
    UpdateGroupState(pSource, {
        activity: pData,
        status: "busy",
    })

    if (pData.updateEvent) {
        triggerEventForMemers(group, pData.updateEvent, pData)
    }

    if (pData.onStart) {
        triggerEventForMemers(group, pData.onStart, pData)
    }

    RefreshActiveTask(pSource)

    return [true, group]
}

export const CompleteActivity = (pSource: any) => {
    const group = GetGroupByPlayer(pSource)
    if (!group) {
        return
    }
    triggerEventForMemers(group, 'vrp:jobs:activityCompleted', group.activity?.activityId, group)
    emit('vrp:jobs:activityCompleted', pSource, group)

    setTimeout(() => {
        triggerEventForMemers(group, 'vrp-ui:jobs:sendNotification', 'Job Center', 'The offer was completed successfully.')
        UpdateGroupState(pSource, {
            activity: false,
            status: "idle",
        })
    }, 1000)
}

export const AbandonActivity = (pSource: any) => {
    const group = GetGroupByPlayer(pSource)
    if (!group) {
        return
    }
    triggerEventForMemers(group, 'vrp:jobs:activityCompleted', group.activity?.activityId, group)
    emit('vrp:jobs:activityAbandoned', pSource, group)

    setTimeout(() => {
        triggerEventForMemers(group, 'vrp-ui:jobs:sendNotification', 'Job Center', 'The offer was not completed.')
        UpdateGroupState(pSource, {
            activity: false,
            status: "idle",
        })
    }, 1000)
}

export const SendPaycheckToMembers = (pSource: any, pTitle: any, pAmount: any) => {
    const group = GetGroupByPlayer(pSource)
    for (const [k, v] of Object.entries(group.members) as any) {
        const Player = QBCore.Functions.GetPlayer(v.src)
        if (Player) {
            emitNet('vrp-ui:jobs:sendNotification', v.src, `${pTitle} Paycheck`, `$${pAmount} transferred to your bank.`)
            Player.Functions.AddMoney('bank', pAmount, `${pTitle} Paycheck`)
        }
    }
}

export const RefreshActiveTask = (pSource: any) => {
    const group = GetGroupByPlayer(pSource)
    if (!group) {
        return
    }

    const activity = group.activity
    if (!activity) {
        return
    }
    const activeTask = activity.tasks.find((pFound: any) => pFound.count < pFound.wanted);
    if (!activeTask) {
        return
    }
    triggerEventForMemers(group, 'vrp:jobs:startTask', activeTask)
    emit('vrp-jobs:onTaskStart', pSource, activeTask, group)

    if (activeTask.onStart && activeTask.count < 1) {
        triggerEventForMemers(group, activeTask.onStart, activity.activityId, activeTask)
    }

    if (activity.updateEvent) {
        triggerEventForMemers(group, activity.updateEvent, activity)
    }
}

export const ResumeActiveJob = (pSource: any) => {
    const pCid = QBCore.Functions.GetPlayer(pSource).PlayerData.citizenid
    if (!pCid) {
        return false
    }
    
    if (!playersCheckedin[pCid]) {
        return false
    }

    emitNet('vrp-ui:updateJobState', pSource, {
        job: playersCheckedin[pCid],
    })
    
    const group = GetGroupByCid(pCid)

    if (!group) {
        return false
    }

    emitNet('vrp-ui:updateJobState', pSource, {
        group: group,
    })

    if (group.activity) {
        emitNet('vrp-ui:updateJobState', pSource, {
            activity: group.activity,
        })

        emitNet(group.activity.updateEvent, pSource, group.activity)
    }

    return true
}

export const objectiveCompleted = (pSource: any, pTaskId: any) => {
    const group = GetGroupByPlayer(pSource)

    if (!group) {
        return
    }

    const activity = group.activity
    if (!activity) {
        return
    }

    const activeTask = activity.tasks.find((pFound: any) => pFound.count < pFound.wanted);
    const activeTaskIdx = activity.tasks.findIndex((pFound: any) => pFound.count < pFound.wanted);

    if (activeTask.id !== pTaskId) {
        return
    }

    activeTask.count = activeTask.wanted
    if (activity.tasks[activeTaskIdx + 1]) {
        activity.stage = activity.tasks[activeTaskIdx + 1].id
    }
    
    UpdateGroupState(pSource, {
        activity: activity
    })

    RefreshActiveTask(pSource)
}

export const updateObjective = (pSource: any, pTaskId: any, pAmount: any) => {
    const group = GetGroupByPlayer(pSource)

    if (!group) {
        return
    }

    const activity = group.activity
    if (!activity) {
        return
    }

    const activeTask = activity.tasks.find((pFound: any) => pFound.count < pFound.wanted);

    if (activeTask.id !== pTaskId) {
        return
    }

    activeTask.count = pAmount

    if (activity.cargo !== undefined) {
        activity.cargo = pAmount
    }

    if (activity.vaultBags !== undefined) {
        activity.vaultBags = pAmount
    }

    if (activeTask.count >= activeTask.wanted) {
        emit('vrp-jobs:onTaskFinished', pSource, activeTask, group)
    }

    UpdateGroupState(pSource, {
        activity: activity
    })
    
    RefreshActiveTask(pSource)
}

export const getObjective = (pSource: any) => {
    const group = GetGroupByPlayer(pSource)

    if (!group) {
        return false
    }

    const activity = group.activity
    if (!activity) {
        return false
    }

    const activeTask = activity.tasks.find((pFound: any) => pFound.count < pFound.wanted);

    if (!activeTask) {
        return false
    }

    return activeTask
}

onNet('vrp:jobs:objectiveCompleted', async(pTaskId: any) => {
    const src = source
    objectiveCompleted(src, pTaskId)
})

onNet('vrp:jobs:updateObjective', async(pTaskId: any, pAmount: any) => {
    const src = source
    updateObjective(src, pTaskId, pAmount)
})

RPC.register('phone:jobCenterActivityAbandon', AbandonActivity)

export const GroupSystem = async() => {
    RPC.register('vrp-jobs:getJobCenterJobs', async(pSource: any) => {
        return PublicJobs
    })
    
    RPC.register('vrp:jobs:checkIn', async(pSource: any, pJobid: any) => {
        const Player = QBCore.Functions.GetPlayer(pSource)
        const pJob = PublicJobs.find(function(pItem) {
            return pItem.jobId === pJobid
        })
    
        playersCheckedin[Player.PlayerData.citizenid] = pJob
        emitNet('vrp-jobs:jobChanged', pSource, pJobid)
        emitNet('vrp-jobs:playerBecame', pSource, pJob)
        
        return {
            job: pJob,
            groups: PublicGroups
        }
    })

    RPC.register('vrp:jobs:checkOut', async (pSource: any) => {
        const Player = QBCore.Functions.GetPlayer(pSource)
        playersCheckedin.splice(Player.PlayerData.citizenid, 1)
        emitNet('vrp-jobs:playerBecame', pSource, 'unemployed')
        return {
            job: false,
            groups: [],
            activity: false
        }
    })

    RPC.register('phone:createJobCenterGroup', async (pSource: any, pId: any, pForce = false) => {
        const Player = QBCore.Functions.GetPlayer(pSource)
        const pCid = Player.PlayerData.citizenid
        const playerJob = playersCheckedin[pCid]
        const data = {
            id: PublicGroups.length + 1,
            jobId: playerJob.jobId,
            leader: {
                src: pSource,
                id: Number(pCid),
                is_online: true,
                first_name: Player.PlayerData.charinfo.firstname,
                last_name: Player.PlayerData.charinfo.lastname
            },
            status: "idle",
            public: true,
            capacity: playerJob.capacity,
            size: 1,
            ready: false,
            members: [
                {
                    src: pSource,
                    is_leader: true,
                    is_online: true,
                    id: Number(pCid),
                    first_name: Player.PlayerData.charinfo.firstname,
                    last_name: Player.PlayerData.charinfo.lastname,
                }
            ]
        }
    
        setTimeout(() => {
            PublicGroups.push(data)
            emitNet('vrp-ui:updateJobState', pSource, {
                group: data,
            })
            if (pForce) {
                emitNet('vrp-ui:updateJobState', pSource, {
                    job: playerJob,
                })
            }
            refreshGroups()
            emitNet('vrp-ui:jobs:groupInviteCompleted', pSource, pId, true)
        }, 1000)
    })

    RPC.register('phone:requestToJoinJobCenterGroup', async(pSource: any, pREq: any, pGroupID: any) => {
        const Player = QBCore.Functions.GetPlayer(pSource)
        const pIndex = PublicGroups.findIndex(function(pItem: any) {
            return pItem.id === pGroupID
        })
        if (pIndex === -1) {
            console.log('Group Was Not Found ', pIndex, pGroupID)
            return
        }
        const pData = PublicGroups[pIndex]
        const member = {
            src: pSource,
            is_online: true,
            id: Player.PlayerData.citizenid,
            first_name: Player.PlayerData.charinfo.firstname,
            last_name: Player.PlayerData.charinfo.lastname,
        }
        emitNet("vrp-ui:jobs:groupInviteRequest", pData.leader.src, pREq, pGroupID, member)
    })
    
    RPC.register("phone:requestToJoinJobCenterGroupAccept", async(pSource: any, pReq: any, pTarget: any) => {
        const Player = QBCore.Functions.GetPlayerByCitizenId(pTarget)
        const pInGroup = GetGroupByPlayer(Player.PlayerData.source)
        if (pInGroup) {
            return
        }
        const pData = GetGroupByPlayer(pSource)
        const member = {
            src: Player.PlayerData.source,
            is_online: true,
            id: Player.PlayerData.citizenid,
            first_name: Player.PlayerData.charinfo.firstname,
            last_name: Player.PlayerData.charinfo.lastname,
        }
    
        pData.members.push(member)
        pData.size = pData.size + 1
    
        triggerEventForMemers(pData, 'vrp-ui:updateJobState', {
            group: pData,
        })
    
        refreshGroups()
    
        emitNet('vrp-ui:jobs:groupInviteCompleted', member.src, pReq, true)
    })
    
    RPC.register('phone:jobCenterGroupDisband', async(pSource: any, pGroupID: any) => {
        const pIndex = PublicGroups.findIndex(function(pItem: any) {
            return pItem.id === pGroupID
        })
    
        if (pIndex === -1) {
            return
        }
    
        triggerEventForMemers(PublicGroups[pIndex], 'vrp-ui:updateJobState', {
            activity: false,
            group: false,
        })
    
        setTimeout(() =>{
            PublicGroups.splice(pIndex, 1)
            refreshGroups()
        }, 200)
    })
    
    RPC.register('phone:jobCenterGroupLeave', async(pSource: any) => {
        const group = GetGroupByPlayer(pSource)
        if (!group) {
            return
        }
    
        const findMember = group.members.findIndex((pItem: any) => {
            return pItem.src == pSource
        })
    
        if (findMember === -1) {
            return
        }
        group.members.splice(findMember, 1)
        group.size = group.size - 1
    
        triggerEventForMemers(group, 'vrp-ui:updateJobState', {
            group: group,
        })
        emitNet('vrp-ui:updateJobState', pSource, {
            group: false,
        })
    
        refreshGroups()
    })

    RPC.register('phone:jobCenterGroupReady', async(pSource: any) => {
        const group = GetGroupByPlayer(pSource)
        group.ready = true
        triggerEventForMemers(group, 'vrp-ui:updateJobState', {
            group: group
        })
    })
    
    RPC.register('phone:jobCenterGroupNotReady', async(pSource: any) => {
        const group = GetGroupByPlayer(pSource)
        group.ready = false
        triggerEventForMemers(group, 'vrp-ui:updateJobState', {
            group: group
        })
    })

    RPC.register('vrp-jobs:npc:getNPCs', async() => {
        return jobNpcs
    })

    on('onResourceStart', (pResource: any) => {
        if (pResource !== GetCurrentResourceName()) {
            return
        }
        for (const [k, v] of Object.entries(PublicJobs) as any) {
            if (v.givecontract) {
                let interval = setInterval(() => {
                    const groups = PublicGroups.filter((pItem: any) => {
                        return pItem.jobId == v.jobId && pItem.status === 'idle' && pItem.ready
                    })
                    for (const [z, x] of Object.entries(groups) as any) {
                        PublicGroups[z].status = 'wating'
                        emit('vrp-jobs:giveContract', x.leader.src, v.jobId)
                    }
                }, getRandomNumber(v.timeout[0], v.timeout[1]))
            }
        }
    })

    ////Exports
    globalThis.exports('UpdateGroupState', UpdateGroupState)
    globalThis.exports('ResumeActiveJob', ResumeActiveJob)
    globalThis.exports('GetGroupByPlayer', GetGroupByPlayer)
    globalThis.exports('GetGroupByCid', GetGroupByCid)
    globalThis.exports('TriggerEventForGroup', TriggerEventForGroup)
    globalThis.exports('StartActivity', StartActivity)
    globalThis.exports('RefreshActiveTask', RefreshActiveTask)
    globalThis.exports('DoActionForThisJob', DoActionForThisJob)
    globalThis.exports('CompleteActivity', CompleteActivity)
    globalThis.exports('SendPaycheckToMembers', SendPaycheckToMembers)
    globalThis.exports('ObjectiveCompleted', objectiveCompleted)
    globalThis.exports('GetObjective', getObjective)
}
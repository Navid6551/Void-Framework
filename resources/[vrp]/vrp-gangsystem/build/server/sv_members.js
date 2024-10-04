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

RPC.register('vrp-gangsystem:hasEnoughMembersAround', async(pSource, pGang, pMembers) => {
    const [gang] = GetGangByCode(pGang)
    if (!gang) {
        return false
    }

    const [, members] = await RefreshOnlineMembers(pGang)

    return Number(members) >= pMembers
})

RPC.register('vrp-gangsystem:addGangMember', async(pSource, pGang, pStateId) => {
    const [gang] = GetGangByCode(pGang)
    if (!gang) {
        return [false, 'Failed to get gang!']
    }
    const Target =  QBCore.Functions.GetPlayerByCitizenId(String(pStateId))
    if (!Target) {
        return [false, 'Person is not available!']
    }
    const [success] = await AddLogForGang(pSource, pGang, `Invited ${FetchPlayerFullName(Target.PlayerData.source)} To Group`, true)
    if (!success) {
        return [false, 'Failed to add log']
    }

    emitNet('vrp-gangsystem:incomingInvite', Target.PlayerData.source, pGang, pSource, FetchPlayerFullName(pSource))

    return [true, 'Invite sent!']
})

RPC.register('vrp-gangsystem:acceptGangInvite', async(pSource, pGang, pFrom) => {
    const [gang] = GetGangByCode(pGang)
    if (!gang) {
        return [false, 'Failed to get gang!']
    }

    gang.members.push({
        name: FetchPlayerFullName(pSource),
        cid: GetPlayerCid(pSource)
    })

    const update = await UpdateGangById(gang.dbId, 'members', JSON.stringify(gang.members))
    if (!update) {
        return [false, 'Falied to update gang members']
    }

    const [success] = await AddLogForGang(pSource, pGang, `Joined Group, Invite From: ${FetchPlayerFullName(pFrom)}`, true)
    if (!success) {
        return [false, 'Failed to add log']
    }

    return [true, `You joined ${gang.name}`]
})

RPC.register('vrp-gangsystem:removeGangMember', async(pSource, pGang, pMember) => {
    const [gang] = GetGangByCode(pGang)
    if (!gang) {
        return [false, 'Failed to get gang!']
    }

    const memberIndex = gang.members.findIndex((pItem) => {
        return pItem.cid === pMember
    })

    if (memberIndex === -1) {
        return [false, 'Failed to find member in this group']
    }

    const [success] = await AddLogForGang(pSource, pGang, `Removed ${gang.members[memberIndex].name} from the group`, true)
    if (!success) {
        return [false, 'Failed to add log']
    }

    gang.members.splice(memberIndex, 1)

    const update = await UpdateGangById(gang.dbId, 'members', JSON.stringify(gang.members))
    if (!update) {
        return [false, 'Falied to update gang members']
    }

    return [true, `You joined ${gang.name}`]
})
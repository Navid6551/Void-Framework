const QBCore = exports['vrp-core'].GetCoreObject()
const PlayersInQueue = []
const ActiveContafcts = []
let isQueueEnabled = true

const GetClassConfig = (pClass) => {

}

const isPlayerBlocked = (pCid) => {
    return false
}

RPC.register('vrp-boosting:getBoostingInbox', async(pSource) => {
    return [
        {
            uuid: '1345',
            contractBuyIn: 5,
            contractVehicleClass: 'D',
            contractVehicleInfo: {
                gnePurchaseCost: 5,
                name: 'club'
            },
            vehiclePlate: '12HG5S',
            expiresAt: Date.now() + 240000
        }
    ]
})

RPC.register('vrp-boosting:server:isCharInQueue', async(pSource) => {
    return PlayersInQueue.find((pItem) => pItem.src === pSource) ?? false
})

RPC.register('vrp-boosting:server:joinQueue', async(pSource) => {
    if (!isQueueEnabled) {
        return {
            success: false,
            message: 'Queue is disabled!'
        }
    }

    if (isPlayerBlocked('cid')) {
        return {
            success: false,
            message: 'You are blocked from boosting queue!'
        }
    }

    if (PlayersInQueue.find((pItem) => pItem.src === pSource)) {
        return {
            success: false,
            message: 'You are already in queue!'
        }
    }

    PlayersInQueue.push({
        src: pSource
    })

    return {
        success: true,
        message: 'Joined queue!'
    }
})

RPC.register('vrp-boosting:server:leaveQueue', async(pSource) => {
    const index = PlayersInQueue.findIndex((pItem) => pItem.src === pSource)
    if (index === -1) {
        return {
            success: false,
            message: 'You are not in queue!'
        }
    }
    PlayersInQueue.splice(index, 1)
    return {
        success: true,
        message: 'Left the queue!'
    }
})

RPC.register('vrp-boosting:server:isCharPuppet', async() => {
    return true
})

RPC.register('vrp-boosting:server:fetchPuppetAccessInfo', async() => {
    return {
        success: true,
        message: '',
        info : {
            'playersInQueue': PlayersInQueue.length,
            'activeContracts': ActiveContafcts.length,
            'pendingContracts': 0,
            'isQueueEnabled': isQueueEnabled
        }
    }
})

RPC.register('vrp-boosting:server:togglePuppetQueue', async(pSource, pCid, pToggle) => {
    isQueueEnabled = pToggle
    return {
        success: true,
        message: ''
    }
})
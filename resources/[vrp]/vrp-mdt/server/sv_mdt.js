const QBCore = exports['vrp-core'].GetCoreObject()

const mdtActions = {
    'getBusinessEmploymentHistory': async(pSource, pData) => {
        return {
            history: [
                {
                    id: 1,
                    event_time: 1607877868,
                    event: 'Kick',
                    invoker: 'Andre Fleming',
                    role: 'Owner'
                },
                {
                    id: 1,
                    event_time: 1607877868,
                    event: 'Pay',
                    invoker: 'Andre Fleming',
                    role: 'Owner'
                },
                {
                    id: 1,
                    event_time: 1607877868,
                    event: 'Hire',
                    invoker: 'Andre Fleming',
                    role: 'Owner'
                },
            ]
        }
    },
    'addInvItem': async(pSource, pData) => {
        TriggerClientEvent("player:receiveItem", pSource, pData.data.item, 1, false, pData.data.information, pData.data.information)
        return true
    }
}

RPC.register('vrp-ui:mdtApiRequest', async(pSource, pData) => {
    if (!mdtActions[pData.action]) {
        return {
            success: false,
            message: 'No action with this id'
        }
    }
    const action = await mdtActions[pData.action](pSource, pData)
    return {
        success: true,
        message: action
    }
})

RPC.register('vrp-miscscript:getPlayers', async() => {
    const players = QBCore.Functions.GetPlayers()
    return players.length
})
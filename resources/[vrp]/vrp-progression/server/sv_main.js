const QBCore = exports['vrp-core'].GetCoreObject()

RPC.register('vrp:progression:character:init', async(pSource) => {
    const Player = QBCore.Functions.GetPlayer(pSource)

    return Player.PlayerData.metadata.rep ?? []
})
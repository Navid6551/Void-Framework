const FetchPlayerFullName = (pSource) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    return `${Player.PlayerData.charinfo.firstname} ${Player.PlayerData.charinfo.lastname}`
}

const GetPlayerCid = (pSource) => {
    const Player = QBCore.Functions.GetPlayer(pSource)
    return Number(Player.PlayerData.citizenid)
}
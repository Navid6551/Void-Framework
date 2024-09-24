RPC.register('IsEmployedAtBusiness', async(pSource, pData) => {
    const bizData = await globalThis.exports['vrp-business'].GetPlayerBusinessesById(pData.character.id, pData.business.id)
    if (!bizData) {
        return false
    }

    return true
})
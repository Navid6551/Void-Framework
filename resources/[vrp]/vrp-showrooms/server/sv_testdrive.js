const TestDriveVehicles = []

RPC.register('showroom:testDriveVehicle', async(pSource, pModel, pCoords) => {
    const vehicle = await globalThis.exports['vrp-vehicles'].BasicSpawn(pSource, pModel, pCoords, pCoords.w)
    TestDriveVehicles.push({
        src: pSource,
        netId: vehicle.netId,
        model: pModel
    })
    return vehicle.netId
})

RPC.register('showroom:returnCurrentVehicle', async(pSource, pNetId) => {
    const index = TestDriveVehicles.findIndex((pItem) => pItem.netId === pNetId)
    if (index === -1) {
        return false
    }

    DeleteEntity(NetworkGetEntityFromNetworkId(pNetId))
    TestDriveVehicles.splice(index, 1)
    
    return true
})

RPC.register('showroom:isTestDriveVehicle', async(pSource, pNetId) => {
    const find = TestDriveVehicles.find((pItem) => pItem.netId === pNetId)
    if (!find) {
        return false
    }
    return true
})

RPC.register('showroom:getTestDriveVehicleModelName', async(pSource, pNetId) => {
    const find = TestDriveVehicles.find((pItem) => pItem.netId === pNetId)
    if (!find) {
        return false
    }
    return find.model
})
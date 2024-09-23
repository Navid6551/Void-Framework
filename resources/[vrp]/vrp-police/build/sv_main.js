const QBCore = exports['vrp-core'].GetCoreObject();
const placedBarrier = []

onNet('vrp-police:server:placedBarrier', (pObject, pDate) => {
    console.log(pObject, pDate);
});

const escprtes = [];
onNet('vrp-police:drag:ask', (pTarget, pIsCarry) => {
    const src = source;
    escprtes[src] = pTarget;
    console.log("[vrp-police] Ask To Drag", pTarget, pIsCarry);
    emitNet('vrp-police:drag:escort', src, pTarget, pIsCarry);
    emitNet('vrp-police:drag:start', pTarget, src, pIsCarry);
});

onNet('vrp-police:drag:disable', (pTarget) => {
    const src = source;
    const target = !pTarget ? escprtes[src] : pTarget;
    console.log("[vrp-police] Ask To Stop", src, target, !pTarget);
    escprtes.splice(src, 1);
    emitNet('vrp-police:drag:stopped', target, src);
    emitNet('vrp-police:drag:releaseEscort', src);
});

onNet('vrp-police:cuffs:granted', (pTarget, pIsSoft) => {
    const src = source

    emitNet('vrp-police:cuffs:cuffed', pTarget, src)
    emitNet('vrp-police:cuffs:cuffingAnimation', src, pTarget)
})

onNet('vrp-police:vehicle:svUnseat', (pTarget, pNetid) => {
    emitNet('vrp-police:vehicle:leaveSeat', pTarget, pNetid)
})

onNet('vrp-police:server:pickedUpBarrier', (pId, pData, pDate, pNowDate) => {
    if (pDate > pNowDate) {
        return
    }
    globalThis.exports['vrp-objects'].deleteObject(pData)
    emitNet('player:receiveItem', source, pData.data.metadata.barrierType, 1)
})

onNet('vrp-police:vehicle:svSeat', (pTarget, pVeh, pSeat) => {
    const src = source;
    const target = !pTarget ? escprtes[src] : pTarget;
    escprtes.splice(src, 1);
    emitNet('vrp-police:drag:stopped', target, src);
    emitNet('vrp-police:drag:releaseEscort', src);
    emitNet('vrp-police:vehicle:enterSeat', pTarget, pVeh, pSeat)
})

onNet('vrp-police:cuffs:uncuff', (pTarget) => {
    emitNet('vrp-police:cuffs:reset', pTarget)
})

onNet('vrp-police:tackle:server', (pTarget) => {
    emitNet('vrp-police:tackle:tackled', pTarget);
});

onNet('vrp-police:server:fingerPrint', (pTarget) => {
    const src = source
    const Player = QBCore.Functions.GetPlayer(pTarget)
    if (!Player) {
        return
    }
    emitNet('chatMessage', src, "FINGERPRINT", 2, `Fingerprint collected: ${Player.PlayerData.metadata.fingerprint}`);
})

onNet('police:gsrGranted', async(pTarget) => {
    const src = source
    const shotRecently = await RPC.execute('inventory:getGSR', pTarget)
    emitNet('chatMessage', src, "GSR", 2, shotRecently ? "We found gunpowder residue" : "We did not find any powder residue.");
})

onNet('police:targetCheckBank', (pTarget) => {
    const src = source
    const Player = QBCore.Functions.GetPlayer(pTarget)
    if (!Player) {
        return
    }
    emitNet("DoLongHudText", src, `Bank: ${Player.PlayerData.money.bank}`)
})
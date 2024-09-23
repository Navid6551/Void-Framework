import { Delay } from "@shared/utils/tools"
import { Hud } from "client/tools/hud"

export const GarbageJob = async() => {
    let blip: any = undefined
    let geeky: any = undefined
    let dumpsters = new Map()

    onNet('vrp:jobs:startTask', (pTask: any) => {
        if (pTask.id === 'head_to_location') {
            const coords = pTask.settings.location
            blip = Hud.createBlip('radius', coords.x, coords.y, coords.z, pTask.settings.distance)
            Hud.applyBlipSettings(blip, 'Location', 9, 3, 80, 1, false, false)  
        }
    })

    on('vrp-jobs:sanitationWorker:pickupTrash', async(pArgs: any, pEntity: any) => {
        const playerPed = PlayerPedId()
        const boneindex = GetPedBoneIndex(playerPed, 57005)
        const trashModel = "hei_prop_heist_binbag"

        if (dumpsters.get(pEntity)) {
            emit('DoLongHudText', 'This dumpster is empty', 2)
            return
        }

        RequestAnimDict("anim@heists@narcotics@trash")
        RequestModel(trashModel)

        while (!HasAnimDictLoaded("anim@heists@narcotics@trash") || !HasModelLoaded(trashModel)) {
            await Delay(500)
        }

        geeky = CreateObject(GetHashKey(trashModel), 0, 0, 0, true, true, true)
        AttachEntityToEntity(geeky, playerPed, boneindex, 0.12, 0.0, 0.00, 25.0, 270.0, 180.0, true, true, false, true, 1, true)
        TaskPlayAnim(PlayerPedId(), 'anim@heists@narcotics@trash', 'walk', 1.0, -1.0, -1, 49, 0, false, false, false)
        dumpsters.set(pEntity, true)
    })

    on('vrp-jobs:sanitationWorker:vehicleTrash', async(pArgs: any, pEntity: any) => {
        if (!geeky) {
            emit('DoLongHudText', "You got no trash in your had", 2)
            return
        }
        RequestAnimDict("anim@heists@narcotics@trash")
        while (!HasAnimDictLoaded("anim@heists@narcotics@trash")) {
            await Delay(500)
        }

        ClearPedTasksImmediately(PlayerPedId())
        TaskPlayAnim(PlayerPedId(), 'anim@heists@narcotics@trash', 'throw_b', 1.0, -1.0, -1,2, 0, false, false, false)

        await Delay(1100)
        DeleteObject(geeky)
        RPC.execute('vrp-jobs:sanitationWorker:dropTrash')
        geeky = undefined
        ClearPedTasksImmediately(PlayerPedId())
    })
}
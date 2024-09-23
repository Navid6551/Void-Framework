import { Vector3 } from "@shared/classes/vector"
import { Delay, getRandom, loopSkill } from "@shared/utils/tools"

export const FinishJob = async() => {
    let blip: any = undefined
    let fishingRod: any = undefined
    let canFish = false
    let fishing = false
    let activeLocation: any = undefined

    const reelInFish = async() => {
        emit("DoLongHudText", "A little nibble...")
        const success = await loopSkill(getRandom(1, 7))
        if (!success) {
            emit("DoLongHudText", "The fish got away", 2)
        } else {
            emitNet('vrp-jobs:fishing:gotFish')
        }
        if (fishingRod) {
            DeleteObject(fishingRod)
            fishingRod = undefined
        }
        ClearPedTasks(GetPlayerPed(-1))
    }

    const startFishing = async() => {
        let rodModel = "prop_fishing_rod_01"
        if (fishing) {
            return
        }
        fishing = true
        RequestAnimDict("amb@world_human_stand_fishing@idle_a")
        RequestModel(rodModel)
        while (!HasAnimDictLoaded("amb@world_human_stand_fishing@idle_a") || !HasModelLoaded(rodModel)) {
            await Delay(500)
        }
        SetCurrentPedWeapon(PlayerPedId(), 0xA2719263, false) 
        let bone = GetPedBoneIndex(PlayerPedId(), 60309)
        if (fishingRod) {
            DeleteObject(fishingRod)
            fishingRod = undefined
        }
        fishingRod = CreateObject(rodModel, 1.0, 1.0, 1.0, true, true, false)

        ClearPedTasksImmediately(PlayerPedId())

        AttachEntityToEntity(fishingRod, PlayerPedId(), bone, 0, 0, 0, 0, 0, 0, true, true, false, false, 2, true)
        await Delay(0)
        TaskPlayAnim(PlayerPedId(), "amb@world_human_stand_fishing@idle_a", "idle_c", 20.0, -8, -1, 49, 0, false, false, false)
        let seconds = 0

        let interval = setInterval(() => {
            if (!fishing) {
                clearInterval(interval)
                return
            }
            seconds += 5
            let chance = Math.random() * 100
            if (chance + seconds > 100) {
                fishing = false
                reelInFish()
            }
        }, 5000)

        let interval2 = setInterval(() => {
            if (!fishing) {
                clearInterval(interval2)
                return
            }
            if (!IsEntityPlayingAnim(PlayerPedId(), "amb@world_human_stand_fishing@idle_a", "idle_c", 3)) {
                TaskPlayAnim(PlayerPedId(), "amb@world_human_stand_fishing@idle_a", "idle_c", 20.0, -8, -1, 49, 0, false, false, false)
            }
        }, 250)
    }
    
    onNet('vrp:jobs:startTask', (pTask: any) => {
        if (pTask.id === 'get_fishes') {
            canFish = true
            activeLocation = pTask.settings.location
        }
    })

    onNet('vrp:jobs:activityCompleted', () => {
        canFish = false
        activeLocation= undefined
        // if (!blip) {
        //     return
        // }
        // RemoveBlip(blip)
        // blip = undefined
    })

    onNet('vrp-inventory:itemUsed', (pItem: any) => {
        const ped =  PlayerPedId()
        const myCoords = GetEntityCoords(ped)
        if (pItem === 'fishingrod' && canFish && activeLocation) {
            const distance = new Vector3(activeLocation).getDistance(myCoords)
            if (distance > 50) {
                emit('DoLongHudText', 'Get closer to the spot! dick head', 2)
                return
            }
            startFishing()
        }
    })
}
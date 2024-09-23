import { Vector3 } from "../../shared/classes/vector";
import { Logger } from "../../shared/logger";
import { Hud } from "../modules/hud";

let activeTask = undefined
let currentVehicle = undefined
let keyThread = undefined
let askManThread = undefined
let taskBlip = undefined

export async function Init(): Promise<void> {

    const DestenationThread = (pCustomEvent = undefined) => {
        // Logger.log('[vrp-jobs] Destination Task Was Started')
        const coords = activeTask.settings.location
        const blip = activeTask?.settings?.blip
        const blipType = blip?.type ?? 'coord'
        const delBlip = blip?.delete ?? true
        if (blip) {
            taskBlip = Hud.createBlip(blipType, coords.x, coords.y, coords.z, coords.r)
            
            setTimeout(() => {
                Hud.applyBlipSettings(taskBlip, blip.text ?? 'Location', blip.sprite ?? 1, blip.color ?? 1,  blip.alpha ?? 255, blip.scale ?? undefined, true, false)
            }, 1000)
        }
        let thread = setInterval(() => {
            if (!activeTask || !activeTask?.settings) {
                clearInterval(thread)
                return
            }
            const PlayerCoords = GetEntityCoords(PlayerPedId())
            const distance = new Vector3(PlayerCoords).getDistance(coords)
            // Logger.log('[vrp-jobs] Distance with destination', distance, activeTask.settings.distance, distance <= activeTask.settings.distance)
            if (distance <= activeTask.settings.distance) {
                emitNet('vrp:jobs:objectiveCompleted', activeTask.id)
                if (delBlip) {
                    RemoveBlip(taskBlip)
                    taskBlip = undefined
                }
                if (pCustomEvent) {
                    emitNet(pCustomEvent, activeTask)
                }
                clearInterval(thread)
                activeTask = undefined
            }
        }, 250)
    }

    const keyPressThread = (pClear: boolean) => {
        if (pClear) {
            clearTick(keyThread)
            keyThread = undefined
        } else {
            if (keyThread !== undefined) {
                return
            }
            keyThread = setTick(() => {
                DisableControlAction(0, activeTask.settings.key, true);
                if (IsDisabledControlJustPressed(0, activeTask.settings.key)) {
                    emitNet('vrp:jobs:objectiveCompleted', activeTask.id)
                    if (activeTask.settings.event) {
                        emitNet(activeTask.settings.event, activeTask)
                    }
                    clearTick(keyThread)
                    clearInterval(askManThread)
                    keyThread = undefined
                    askManThread = undefined
                    globalThis.exports['vrp-ui'].hideInteraction()
                    activeTask = undefined
                }
            })
        }
        
    }

    const askForemanTask = () => {
        askManThread = setInterval(() => {
            const PlayerCoords = GetEntityCoords(PlayerPedId())
            const distance = new Vector3(PlayerCoords).getDistance(activeTask.settings.location)
            // Logger.log('[vrp-jobs] Distance with destination', distance, activeTask.settings.distance, distance <= activeTask.settings.distance)
            if (distance <= activeTask.settings.distance) {
                globalThis.exports['vrp-ui'].showInteraction(activeTask.settings.text)
                keyPressThread(false)
            } else {
                globalThis.exports['vrp-ui'].hideInteraction()
                keyPressThread(true)
            }
        }, 250)
    }

    onNet('vrp:jobs:startTask', (pTask: any) => {
        if (!pTask.type) {
            return
        }
        activeTask = pTask
        if (pTask?.type === 'destination') {
            DestenationThread()
        } 
        if (pTask?.type === 'customEvent') {
            DestenationThread(pTask.settings.event)
        } 
        if (pTask?.type === 'askForeman') {
            askForemanTask()
        }
    })

    onNet('vrp:jobs:activityCompleted', () => {
        RemoveBlip(taskBlip)
        clearTick(keyThread)
        clearInterval(askManThread)
        keyThread = undefined
        askManThread = undefined
        activeTask = undefined
        taskBlip= undefined
    })

    on('baseevents:enteredVehicle', (pVehicle: any) => {
        Logger.debug('enteredVehicle')
        currentVehicle = pVehicle
        const model = GetDisplayNameFromVehicleModel(GetEntityModel(pVehicle))
        if (activeTask?.type !== 'getVehicle') {
            return
        }
        Logger.debug('[vrp-jobs] Get Vehicle Task', model, activeTask.settings.model)
        if (model.toLowerCase() !== activeTask.settings.model) {
            return
        }
        Logger.debug('[vrp-jobs] Get Vehicle Task Compeleted. Cleaning Up!!!')
        emitNet('vrp:jobs:objectiveCompleted', activeTask.id, activeTask)
        activeTask = undefined
    })

    on('baseevents:leftVehicle', () => {
        const model = GetDisplayNameFromVehicleModel(GetEntityModel(currentVehicle))
        if (activeTask?.type !== 'leaveVehicle') {
            return
        }
        if (model.toLowerCase() !== activeTask.settings.model) {
            return
        }
        emitNet('vrp:jobs:objectiveCompleted', activeTask.id, activeTask)
        if (activeTask.settings.event) {
            emitNet(activeTask.settings.event, activeTask, NetworkGetNetworkIdFromEntity(currentVehicle))
        }
    })

    onNet('inventory:playerInventoryChanged', async(pToInv: any, pFromInv: any, pItem: any) => {
        if (activeTask?.type !== 'loadCargo') {
            return
        }
        if (pToInv !== activeTask.settings.toInvnetory || activeTask.settings.itemId !== pItem.itemId) {
            Logger.debug('[vrp-jobs] The Inventory Name Or Item Name Dose Not Match', activeTask.settings.toInvnetory, pToInv, activeTask.settings.itemId, pItem.itemId)
            return
        }
        const [hasItem, total] = await RPC.execute('inventory:hasItemInInventory', [`${activeTask.settings.toInvnetory}`], {
            itemId: activeTask.settings.itemId
        })
        if (!hasItem) {
            Logger.debug('[vrp-jobs] This Inventory Dont Have This Item')
            return
        }
        Logger.debug('[vrp-jobs] Total Item In Inventory', total)
        if (total >= activeTask.settings.cargo) {
            emitNet('vrp:jobs:objectiveCompleted', activeTask.id)
            activeTask = undefined
            return
        }
        emitNet('vrp:jobs:updateObjective', activeTask.id, total)
    })
}

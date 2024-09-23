import { getDistance } from "server/controllers"
import { CompleteActivity, GetGroupByPlayer, SendPaycheckToMembers, StartActivity, TriggerEventForGroup, UpdateGroupState, getObjective, getRandomNumber, updateObjective } from "server/controllers/group-system"

const base = {
    x: -446.41,
    y: -2789.31,
    z: 6.01
}

export const DodoJobServer = async() => {
    const dodoLocations = [
        {
            x: 26.84, 
            y: -1347.17, 
            z: 29.5,
        },
        {
            x: -707.92, 
            y: -914.62, 
            z: 19.21
        },
        {
            x: 1135.51, 
            y: -981.97, 
            z: 46.42
        },
        {
            x: -1223.63,
            y: -906.77,
            z: 12.33
        },
        {
            x: 374.67, 
            y: 326.53, 
            z: 103.57
        },
        {
            x: 1163.25, 
            y: -323.73,
            z: 69.21
        },
        {
            x: -2968.29, 
            y: 390.6, 
            z: 15.04
        },
        {
            x: -3242.55, 
            y: 1001.8, 
            z: 12.83
        },
        {
            x: -1820.99,
            y: 792.54,
            z: 138.12
        },
        {
            x: 2556.94,
            y: 382.22,
            z: 108.62
        },
        {
            x: 2678.28,
            y: 3280.74,
            z: 55.24
        },
        {
            x: 1961.51,
            y: 3740.87, 
            z: 32.34
        },
        {
            x: 1392.09,
            y: 3604.82,
            z: 34.98
        },
        {
            x: 1698.2,
            y: 4924.39,
            z: 42.06
        },
        {
            x: 1729.16,
            y: 6414.98, 
            z: 35.04
        },
        {
            x: 1165.86, 
            y: 2708.76, 
            z: 38.16
        },
        {
            x: 547.48, 
            y: 2671.19, 
            z: 42.16
        },
    ]

    on('vrp-jobs:giveContract', async(pSource: any, pJob: any) => {
        const group = GetGroupByPlayer(pSource)
        const random = dodoLocations[getRandomNumber(0, dodoLocations.length)]
        const random2 = dodoLocations[getRandomNumber(0, dodoLocations.length)]
        const random3 = dodoLocations[getRandomNumber(0, dodoLocations.length)]
        if (pJob !== 'postop') {
            return
        }
        const result = await RPC.execute('vrp-jobs:phone:giveContract', pSource, 'Post OP')
        if (!result) {
            return
        }
        const box = 3 * group.members.length
        const tasks = [
            {
                id: 'ask_foremn',
                description: 'Go to the foreman',
                type: 'askForeman',
                settings: {
                    event: 'vrp-jobs:dodo:getVehicle',
                    text: '[E] Ask the foreman for a vehicle',
                    key: 38,
                    location: {
                        x: -430.48, 
                        y: -2785.32, 
                        z: 6.0
                    },
                    distance: 2.0
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
            {
                id: 'get_in_vehicle',
                description: 'Get in the vehicle',
                type: 'getVehicle',
                settings: {
                    model: 'boxville',
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
            {
                id: 'head_to_location',
                description: 'Go to the store location',
                type: 'destination',
                settings: {
                    blip: {
                        sprite: 1,
                        color: 2
                    },
                    location: {
                        x: random.x,
                        y: random.y,
                        z: random.z,
                    },
                    distance: 20.0
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
            {
                id: 'dropoff',
                description: 'Drop off the packages',
                count: 0,
                wanted: box,
                settings: {
                    location: {
                        x: random.x,
                        y: random.y,
                        z: random.z,
                    },
                },
                tracked: []
            },
            {
                id: 'head_to_location2',
                description: 'Go to the second store location',
                type: 'destination',
                settings: {
                    blip: {
                        sprite: 1,
                        color: 2
                    },
                    location: {
                        x: random2.x,
                        y: random2.y,
                        z: random2.z,
                    },
                    distance: 20.0
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
            {
                id: 'dropoff2',
                description: 'Drop off the packages',
                count: 0,
                wanted: box,
                settings: {
                    location: {
                        x: random2.x,
                        y: random2.y,
                        z: random2.z,
                    },
                },
                tracked: []
            },
            {
                id: 'head_to_location3',
                description: 'Go to the third store location',
                type: 'destination',
                settings: {
                    blip: {
                        sprite: 1,
                        color: 2
                    },
                    location: {
                        x: random3.x,
                        y: random3.y,
                        z: random3.z,
                    },
                    distance: 20.0
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
            {
                id: 'dropoff3',
                description: 'Drop off the packages',
                count: 0,
                wanted: box,
                settings: {
                    location: {
                        x: random3.x,
                        y: random3.y,
                        z: random3.z,
                    },
                },
                tracked: []
            },
            {
                id: 'go_back',
                description: 'Go back and return the vehicle',
                type: 'destination',
                settings: {
                    blip: {
                        sprite: 1,
                        color: 2
                    },
                    location: base,
                    distance: 10.0
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
            {
                id: 'leaveVehicle',
                description: 'Leave the vehicle',
                type: 'leaveVehicle',
                settings: {
                    model: 'boxville',
                    event: 'vrp-jobs:dodo:leftTheVehicle'
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
        ]
        StartActivity(pSource, {
            activityId: 'postop',
            name: 'Post OP',
            deadline: Date.now() + 2.7e+6,
            owner: pSource,
            tasks: tasks,
            stage: 'head_to_location',
        })
    })

    onNet('vrp-jobs:dodo:leftTheVehicle', (pTask: any, pNetId: any) => {
        const src = source
        const pEntity = NetworkGetEntityFromNetworkId(pNetId)
        DeleteEntity(pEntity)
        CompleteActivity(src)
        setTimeout(() => {
            SendPaycheckToMembers(src, 'Post OP', getRandomNumber(2000, 3000))
        }, 1500)
    })

    onNet('vrp-jobs:dodo:getVehicle', async() => {
        const src = source
        const group = GetGroupByPlayer(src)
        const vehicle = await globalThis.exports['vrp-vehicles'].BasicSpawn(src, 'boxville2', base, 44.67)
        group.activity.vehicle = vehicle
        UpdateGroupState(src, {
            activity: group.activity
        })
        TriggerEventForGroup(src, 'vrp-jobs:dodo:vehicleSpawned', vehicle.netId)
    })

    on('vrp:jobs:activityAbandoned', (pSource: any, pGroup: any) => {
        const pEntity = NetworkGetEntityFromNetworkId(pGroup.activity.vehicle.netId)
        if (!pEntity) {
            return
        }
        DeleteEntity(pEntity)
    })

    onNet('vrp-dodo:server:dropGoods', () => {
        const src = source
        const objective = getObjective(src)
        if (!objective) {
            return
        }
        const playerCoords = GetEntityCoords(GetPlayerPed(src))
        const coords = objective.settings.location
        const targetCoords = {
            x: playerCoords[0],
            y: playerCoords[1],
            z: playerCoords[2],
        }
        const distance = getDistance(coords.x, coords.y, coords.z, targetCoords.x, targetCoords.y, targetCoords.z)
        if (distance > 4) {
            emitNet('DoLongHudText', src, 'Get closer to drop off location', 2)
            return
        }
        emitNet("animation:carry", src, "none")
        emitNet("vrp-jobs:dodo:canDropGoods", src, false)
        updateObjective(src, objective.id, objective.count + 1)
    })
}
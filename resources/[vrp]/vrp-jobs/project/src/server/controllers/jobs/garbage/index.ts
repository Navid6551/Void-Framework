import { CompleteActivity, GetGroupByPlayer, SendPaycheckToMembers, StartActivity, UpdateGroupState, getObjective, getRandomNumber, updateObjective } from "server/controllers/group-system"

const garbageLocations = [
    {
        id: 'Hawick',
        x: 2.27,
        y: -135.54, 
        z: 56.44,
        raiduis: 300
    },
    {
        id: 'Eclipse Boulevard',
        x: -248.99,
        y: 262.31,
        z: 92.63,
        raiduis: 300
    },
    {
        id: 'Morning Wood',
        x: -1290.89,
        y: -270.61,
        z: 39.09,
        raiduis: 300
    },
    {
        id: 'Didion Drive',
        x: 21.65,
        y: 375.44,
        z: 112.67,
        raiduis: 300
    },
    {
        id: 'Magellan Avenue',
        x: -1243.73,
        y: -1359.72,
        z: 3.93,
        raiduis: 300
    },
    {
        id: 'Elgin Avenue',
        x: 239.19,
        y: -681.5,
        z: 37.15,
        raiduis: 300
    },
    {
        id: 'Elgin Avenue',
        x: 239.19,
        y: -681.5,
        z: 37.15,
        raiduis: 300
    },
    {
        id: 'Forum drive',
        x: -168.07,
        y: -1662.8,
        z: 33.31,
        raiduis: 300
    },
    {
        id: 'Sandcastleway',
        x: -1350.0,
        y: -895.64,
        z: 13.36,
        raiduis: 300
    },
    {
        id: 'Davis ave',
        x: 424.98,
        y: -1523.57,
        z: 29.28,
        raiduis: 300
    },
    {
        id: 'Power street',
        x: 268.72,
        y: -25.92,
        z: 73.36,
        raiduis: 300
    },
    {
        id: 'Alta street',
        x: 267.03,
        y: 276.01,
        z: 105.54,
        raiduis: 300
    },
    {
        id: 'Milton road',
        x: -546.9,
        y: 286.57,
        z: 82.85,
        raiduis: 300
    },
    {
        id: 'East bourneway',
        x: -683.23,
        y: -169.62,
        z: 37.74,
        raiduis: 300
    },
    {
        id: 'East bourneway2',
        x: -771.02,
        y: -218.06,
        z: 37.05,
        raiduis: 300
    },
    {
        id: 'Industry passage',
        x: -1057.06,
        y: -515.45,
        z: 35.83,
        raiduis: 300
    },
]

export const GarbageServerJob = async() => {
    const base = {
        x: -337.34,
        y: -1562.74,
        z: 24.97
    }
    on('vrp-jobs:giveContract', async(pSource: any, pJob: any) => {
        const group = GetGroupByPlayer(pSource)
        const random = garbageLocations[getRandomNumber(0, garbageLocations.length)]
        if (pJob !== 'sanitation_worker') {
            return
        }

        const result = await RPC.execute('vrp-jobs:phone:giveContract', pSource, 'Sanitation Worker')
        if (!result) {
            return
        }

        const box = 10 * group.members.length
        const tasks = [
            {
                id: 'ask_foremn',
                description: 'Go to the foreman',
                type: 'askForeman',
                settings: {
                    event: 'vrp-jobs:garbage:getVehicle',
                    text: '[E] Ask the foreman for a vehicle',
                    key: 38,
                    location: {
                        x: -355.13,
                        y: -1547.42,
                        z: 27.72
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
                    model: 'trash',
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
            {
                id: 'head_to_location',
                description: `Head over to the located zone (${random.id})`,
                type: 'destination',
                settings: {
                    location: {
                        x: random.x,
                        y: random.y,
                        z: random.z,
                    },
                    distance: random.raiduis
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
            {
                id: 'get_trash',
                description: 'Collect the trash',
                count: 0,
                wanted: box,
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
                    model: 'trash',
                    event: 'vrp-jobs:garbage:leftTheVehicle'
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
        ]

        StartActivity(pSource, {
            activityId: 'sanitation_worker',
            name: 'Sanitation Worker',
            deadline: Date.now() + 2.7e+6,
            owner: pSource,
            tasks: tasks,
        })
    })

    onNet('vrp-jobs:garbage:getVehicle', async() => {
        const src = source
        const group = GetGroupByPlayer(src)
        const vehicle = await globalThis.exports['vrp-vehicles'].BasicSpawn(src, 'trash', base, 58.64)
        group.activity.vehicle = vehicle
        UpdateGroupState(src, {
            activity: group.activity
        })
        // TriggerEventForGroup(src, 'vrp-jobs:dodo:vehicleSpawned', vehicle.netId)
    })

    onNet('vrp-jobs:garbage:leftTheVehicle', (pTask: any, pNetId: any) => {
        const src = source
        const group = GetGroupByPlayer(src)
        const pEntity = NetworkGetEntityFromNetworkId(pNetId)
        DeleteEntity(pEntity)
        CompleteActivity(src)
        setTimeout(() => {
            SendPaycheckToMembers(src, 'Sanitation Worker', 2000)
            for (const[k, v] of Object.entries(group.members) as any) {
                emitNet('player:receiveItem', v.src, 'recyclablematerial', 50);
            }
        }, 1500)
    })

    RPC.register('vrp-jobs:sanitationWorker:dropTrash', async(pSource: any) => {
        const objective = getObjective(pSource)
        if (!objective || objective.id !== 'get_trash') {
            return false
        }
        updateObjective(pSource, objective.id, objective.count + 1)
        return true
    })
}
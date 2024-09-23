import { CompleteActivity, GetGroupByPlayer, StartActivity, getRandomNumber, updateObjective } from "server/controllers/group-system"

export const FinishServerJob = async() => {
    const fishLocations = [
        {
            x: -222.05,
            y: 6678.29,
            z: 1.82,
            distance: 150.0,
        }
    ]
    on('vrp-jobs:giveContract', async(pSource: any, pJob: any) => {
        const random = fishLocations[0]
        console.log('contract', random)
        if (pJob !== 'fishing') {
            return
        }
        const result = await RPC.execute('vrp-jobs:phone:giveContract', pSource, 'Fishing')
        if (!result) {
            return
        }
        const group = GetGroupByPlayer(pSource)
        if (!group) {
            return
        }
        const fishCount = 20 * group.members.length
        const tasks = [
            {
                id: 'head_to_location',
                description: 'Go to the fishing location',
                type: 'destination',
                settings: {
                    blip: {
                        type: 'radius',
                        delete: false,
                        color: 3,
                        alpha: 90
                    },
                    location: {
                        x: random.x,
                        y: random.y,
                        z: random.z,
                        r: 500
                    },
                    distance: random.distance
                },
                count: 0,
                wanted: 1,
                tracked: []
            },
            {
                id: 'get_fishes',
                description: 'Test the water',
                count: 0,
                wanted: fishCount,
                settings: {
                    location: {
                        x: random.x,
                        y: random.y,
                        z: random.z,
                    },
                },
                tracked: []
            },
        ]
        StartActivity(pSource, {
            activityId: 'fishing',
            name: 'Fishing',
            deadline: Date.now() + 2.7e+6,
            owner: pSource,
            tasks: tasks,
            stage: 'head_to_location',
            fishCount: fishCount
        })
    })
    onNet('vrp-jobs:fishing:gotFish', () => {
        const src = source
        const group = GetGroupByPlayer(src)?.activity
        const pChance = getRandomNumber(1, 8)
        if (pChance === 1) {
            emitNet("DoLongHudText", src, "You caught a Bass" , 1)
            emitNet("player:receiveItem", src, 'fishingbass', 1)
        } else if (pChance === 2) {
            emitNet("DoLongHudText", src, "You caught a Bluefish" , 1)
            emitNet("player:receiveItem", src, 'fishingbluefish', 1)
        } else if (pChance === 3) {
            emitNet("DoLongHudText", src, "You caught a Flounder" , 1)
            emitNet("player:receiveItem", src, 'fishingflounder', 1)
        } else if (pChance === 4) {
            emitNet("DoLongHudText", src, "You caught a Mackerel" , 1)
            emitNet("player:receiveItem", src, 'fishingmackerel', 1)
        } else if (pChance === 5) {
            emitNet("DoLongHudText", src, "You caught a Cod" , 1)
            emitNet("player:receiveItem", src, 'fishingcod', 1)
        } else if (pChance === 6) {
            emitNet("DoLongHudText", src, "You caught a Whale" , 1)
            emitNet("player:receiveItem", src, 'fishingwhale', 1)
        } else if (pChance === 7) {
            emitNet("DoLongHudText", src, "You caught a Dolphin" , 1)
            emitNet("player:receiveItem", src, 'fishingdolphin', 1)
        } else if (pChance === 8) {
            emitNet("DoLongHudText", src, "You caught a Shark" , 1)
            emitNet("player:receiveItem", src, 'fishingshark', 1)
        }
        const task = group.tasks[1]?.count + 1
        updateObjective(src, 'get_fishes', task)
        if (task >= group.fishCount) {
            CompleteActivity(src)
        }
    })
}
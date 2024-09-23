local NPCs = {}
local NPCsPool = {}
local Created = false

function GetNPCJobData(pId)
    for jobId, data in pairs(NPCsPool) do
        local id = GetHashKey(jobId)

        if id == pId then
           return {id = jobId}
        end
    end
end

exports('GetNPCJobData', GetNPCJobData)

AddEventHandler('vrp:jobs:createNPCs', function(pNPCs)
    if not Created then
        Created = true

        for _, npc in ipairs(pNPCs) do
            local vectors = npc.headquarters
            npc.data.id = npc.jobid
            npc.data.position = {
              coords = vector3(vectors.x, vectors.y, vectors.z - 1.0),
              heading = vectors.h or 0.0
            }
            npc.data.position.heading = npc.data.position.heading
            NPCs[npc.jobid] = exports["vrp-npcs"]:RegisterNPC(npc.data, 'vrp-jobs')
        end
    end
end)



RegisterNetEvent('vrp-jobs:npc:added')
AddEventHandler('vrp-jobs:npc:added', function(pSpawn)
    local data = pSpawn

    local vectors = data.position.coords

    data.position.coords = vector3(vectors.x, vectors.y, vectors.z)

    NPCsPool[data.id] = exports["vrp-npcs"]:RegisterNPC(data, 'vrp-jobs')
end);

RegisterNetEvent('vrp-jobs:npc:edited')
AddEventHandler('vrp-jobs:npc:edited', function(pId, pVectors, pHeading)
    local coords = vector3(pVectors.x, pVectors.y, pVectors.z)
    local heading = pHeading + 0.0

    local position = { coords = coords, heading = heading}

    exports["vrp-npcs"]:UpdateNPCData(pId, 'position', position)
end);

RegisterNetEvent('vrp-jobs:npc:removed')
AddEventHandler('vrp-jobs:npc:removed', function(pId)
    exports["vrp-npcs"]:RemoveNPC(pId)
end);

Citizen.CreateThread(function()
    Citizen.Wait(2000)
    local npcs = RPC.execute('vrp-jobs:npc:getNPCs')
    for _, npc in pairs(npcs) do
        local data = npc

        local vectors = data.position.coords
        -- print('npcs', vectors.x, vectors.y, vectors.z)

        data.position.coords = vector3(vectors.x, vectors.y, vectors.z - 1.0)

        NPCsPool[data.id] = exports["vrp-npcs"]:RegisterNPC(data, 'vrp-jobs')
        exports["vrp-npcs"]:EnableNPC(data.id)
    end
end)
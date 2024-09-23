import { Tools } from "client/tools"

let CurrentJob = 'unemployed'

export const hasPermission = async(pBiz: any, pPerm: any, pCid: any) => {
    const result = await RPC.execute('vrp-business:hasPermission', pBiz, pPerm, pCid);
    return result;
}

export const JobCheckIn = async(pJob: any) => {
    const pResult: any = await RPC.execute('vrp:jobs:checkIn', pJob)
    CurrentJob = pJob?.job?.jobId ?? 'unemployed'
    if (!pResult) {
        return false
    }
    SendUIMessage({
        source: 'vrp-nui',
        app: 'phone',
        data: {
            action: 'jobs-update',
            state: pResult
        }
    })
    emit('vrp-ui:jobs:sendNotification', 'Job Center', 'Checked In as a ' + pResult.job.name, true)
}
export const JobCheckOut = async() => {
    const result = await RPC.execute('vrp:jobs:checkOut')
    CurrentJob = 'unemployed';
    emit('vrp-jobs:jobChanged', CurrentJob);
    SendUIMessage({
        source: 'vrp-nui',
        app: 'phone',
        data: {
            action: 'jobs-update',
            state: result
        }
    });
}

export const MainActions = async() => {
    on('jobs:checkIn', (pArgs: any, pEntity: any, pContext: any) => {
        JobCheckIn(pContext.job.id)
    })
    on('jobs:checkOut', (pArgs: any, pEntity: any, pContext: any) => {
        JobCheckOut()
    })
    RPC.register('vrp-jobs:phone:giveContract', async(pTitle: string) => {
        return Tools.phoneConfirmation('Job Offer', pTitle, 'people-carry')
    })
    globalThis.exports('JobCheckOut', JobCheckOut)
    globalThis.exports('JobCheckIn', JobCheckIn)
}
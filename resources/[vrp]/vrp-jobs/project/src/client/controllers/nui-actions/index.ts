import { JobCheckOut } from "../main";

export const NuiActions = async() => {
    onNet('vrp-ui:updateJobState', function (pState: any) {
        SendUIMessage({
            source: 'vrp-nui',
            app: 'phone',
            data: {
                action: 'jobs-update',
                state: pState
            }
        })
    })
    
    onNet('vrp-ui:jobs:groupInviteRequest', function (pId: any, pGid: any, pMember: any) {
        SendUIMessage({
            source: 'vrp-nui',
            app: 'phone',
            data: {
                action: 'job-group-join-request',
                member: pMember,
                group_id: pGid,
                request_id: pId
            }
        });
    });

    onNet('vrp-ui:jobs:groupInviteCompleted', function (pReqId: any, pAccepted: any) {
        SendUIMessage({
            source: 'vrp-nui',
            app: 'phone',
            data: {
                action: pAccepted ? 'job-group-join-accept' : 'job-group-join-deny',
                requestId: pReqId
            }
        });
    });

    onNet('vrp-ui:jobs:requestResponse', function (pReqId: any, pAction: any) {
        SendUIMessage({
            source: 'vrp-nui',
            app: 'phone',
            data: {
                action: pAction,
                requestId: pReqId
            }
        });
    });

    onNet('vrp-ui:jobs:groupActivityOffer', function (pActivityId: any, pMessage: any, pGroupId: any) {
        SendUIMessage({
            source: 'vrp-nui',
            app: 'phone',
            data: {
                action: 'job-group-offer-activity',
                activity_id: pActivityId,
                group_id: pGroupId,
                message: pMessage
            }
        });
    });

    onNet('vrp-ui:jobs:pendingSelection', function (pActivityId: any, pGotIt: any) {
        SendUIMessage({
            source: 'vrp-nui',
            app: 'phone',
            data: {
                action: 'jobs-pending-selection',
                activity_id: pActivityId,
                got_job: pGotIt
            }
        });
    });

    onNet('vrp-ui:jobs:sendNotification', function (pTitle: any, pBody: any, pForceShow: any) {
        SendUIMessage({
            source: 'vrp-nui',
            app: 'phone',
            data: {
                action: 'notification',
                target_app: 'jobs',
                title: pTitle,
                body: pBody,
                show_even_if_app_active: pForceShow
            }
        });
    });

    RegisterUICallback('vrp-ui:getJobCenterJobs', async(data: any, cb: any) => {
        const result = await RPC.execute('vrp-jobs:getJobCenterJobs')
        cb({
            data: result,
            meta: {
                ok: true,
                message: ''
            }
        })
    })

    RegisterUICallback('vrp-ui:createJobCenterGroup', function (data: any, cb: any) {
        RPC.execute('phone:createJobCenterGroup', data.requestId, data.character.id);
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:jobCenterGroupDisband', function (data: any, cb: any) {
        RPC.execute('phone:jobCenterGroupDisband', data.group_id);
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:jobCenterGroupReady', function (data: any, cb: any) {
        RPC.execute('phone:jobCenterGroupReady');
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:jobCenterGroupNotReady', function (data: any, cb: any) {
        RPC.execute('phone:jobCenterGroupNotReady');
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:jobCenterGroupLeave', function (data: any, cb: any) {
        RPC.execute('phone:jobCenterGroupLeave');
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:requestToJoinJobCenterGroup', function (data: any, cb: any) {
        RPC.execute('phone:requestToJoinJobCenterGroup', data.requestId, data.group.id);
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:requestToJoinJobCenterGroupAccept', function (data: any, cb: any) {
        RPC.execute('phone:requestToJoinJobCenterGroupAccept', data.request_id, data.member_id);
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:jobCenterGroupLeave', function (data: any, cb: any) {
        RPC.execute('phone:jobCenterGroupLeave');
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:jobCenterActivityAbandon', function (data: any, cb: any) {
        RPC.execute('phone:jobCenterActivityAbandon');
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:jobCenterCheckout', function (data: any, cb: any) {
        JobCheckOut()
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });

    RegisterUICallback('vrp-ui:setGPSMarker', function (data: any, cb: any) {
        if (IsWaypointActive()) {
            DeleteWaypoint();
        }
        SetNewWaypoint(data.coords[0], data.coords[1]);
        emit('DoLongHudText', 'GPS Set!')
        cb({
            data: {},
            meta: {
                ok: true,
                message: ''
            }
        });
    });
}
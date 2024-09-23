import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"
import { AddResourceToIncident } from '../incidents';

export const StaffRoute = Router();

export const GetUserById = async(pId: any) => {
    const [result]: any = await db.query('SELECT * FROM _mdt_profile_officer WHERE character_id = ?', [pId])

    if (!result[0]) {
        return undefined
    }

    return result[0]
}

const GetPlayerById = async(pId: any) => {
    const [result]: any = await db.query('SELECT * FROM players WHERE citizenid = ?', [pId])

    return {
        charinfo: JSON.parse(result[0].charinfo)
    }
}

const GetRankById = async(pId: any) => {
    const [result]: any = await db.query('SELECT * FROM _mdt_rank WHERE id = ?', [pId])
    if (!result) {
        return {
            name: 'No Rank'
        }
    }
    return result[0]
}

const GetDepartmentById = async(pId: any) => {
    const [result]: any = await db.query('SELECT * FROM _mdt_department WHERE id = ?', [pId])
    if (!result) {
        return {
            name: 'No Department'
        }
    }
    return result[0]
}

const GetRoleById = async(pId: any) => {
    const [result]: any = await db.query('SELECT * FROM _mdt_profile_officer_role WHERE id = ?', [pId])
    if (!result) {
        return undefined
    }
    return {
        ...result[0],
        permissions: []
    }
}

const GetPlayerRoles = async(pId: any) => {
    const pRoles = []
    const [result]: any = await db.query('SELECT * FROM _mdt_role_access WHERE profile_id = ?', [pId])
    if (!result) {
        return []
    }
    for (const [k, v] of Object.entries(result) as any) {
        const role = await GetRoleById(v.role_id)
        if (role) {
            pRoles.push(role)
        }
    }

    return pRoles
}

const perms = [
    '{"name": "tags.createCategory", "id": "" }',
    '{"name": "config.charges", "id": "" }',
    '{"name": "reports.viewCategory", "id": "" }',
    '{"name": "reports.editCategory", "id": "" }',
    '{"name": "staff.strikes.view", "id": "" }',
    '{"name": "staff.giveCert", "id": "" }',
    '{"name": "certs.createCert", "id": "" }',
]

StaffRoute.post('/mdt/getOfficerProfiles', async(req, res) => {
    Logger.debug('[Mdt API] getOfficerProfiles')
    const [result]: any = await db.query('SELECT * FROM _mdt_profile_officer')
    const ofiicers = []
    for (const [k, pItem] of Object.entries(result) as any) {
        const player = await Promise.all([
            GetPlayerRoles(pItem.id),
            GetPlayerById(pItem.character_id),
            GetDepartmentById(pItem.department_id),
            GetRankById(pItem.rank_id)
        ])
        ofiicers.push({
            ...pItem,
            name: `${player[1].charinfo.firstname} ${player[1].charinfo.lastname}`,
            department: player[2].name,
            rank: player[3].name,
            roles: player[0],
            permissions: [],
            certs: [],
            strikes: []
        })
    }

    res.json({data: ofiicers, meta: {ok: true, message: ''}})
})

StaffRoute.post('/mdt/getRolePermissions', async(req, res) => {
    Logger.debug('[Mdt API] getRolePermissions')
    const perms = await GetRoleById(req.body.data.roleId)
    res.json({data: perms?.permissions ?? [], meta: {ok: true, message: ''}})
})

StaffRoute.post('/mdt/getCerts', async(req, res) => {
    Logger.debug('[Mdt API] getCerts')
    res.json({data: [
        {
            'id': 1,
            'name': 'cert',
            'description': 'hi'
        },
        {
            'id': 1,
            'name': 'cert',
            'description': 'hi'
        }
    ], meta: {ok: true, message: ''}})
})

StaffRoute.post('/mdt/addResourceLink', async(req, res) => {
    const pData = req.body.data
    Logger.debug('addResourceLink', req.body)
    if (pData.source_type === 'officer') {
        const user = await GetUserById(pData.source_id)
        const Player = await GetPlayerById(pData.source_id)
        await AddResourceToIncident(pData.resource_id, 'officers', {
            name: `${Player.charinfo.firstname} ${Player.charinfo.lastname}`,
            character_id: pData.source_id,
            callsign: user.callsign,
            resource_link_id: pData.source_id
        })
        res.json({data: pData, meta: {ok: true, message: ''}})
    }
})
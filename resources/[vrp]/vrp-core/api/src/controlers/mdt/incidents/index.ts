import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"

export const IncidentRoute = Router();

const getIncidentById = async(pId: any) => {
    const [result]: any = await db.query('SELECT * FROM _mdt_incident WHERE id = ?', [pId])
    if (!result[0]) {
        return undefined
    }

    return {
        ...result[0],
        civs: JSON.parse(result[0].civs),
        evidence: JSON.parse(result[0].evidence),
        officers: JSON.parse(result[0].officers),
        persons: JSON.parse(result[0].persons),
        vehicles: JSON.parse(result[0].vehicles),
        tags: JSON.parse(result[0].tags),
    }
}

export const AddResourceToIncident = async(pId:any, pType: any, pData: any) => {
    const result: any = await getIncidentById(pId)
    const pPushData = result[pType]
    if (!result) {
        return false
    }

    pPushData.push(pData)

    await db.query(
        `UPDATE _mdt_incident SET ${pType} = ? WHERE id = ?`,
        [
            JSON.stringify(pPushData),
            pId
        ]
    );

    return true
}

IncidentRoute.post('/mdt/getReports', async(req, res) => {
    Logger.debug('[Mdt API] getReports')
    res.json({data: [], meta: {ok: true, message: ''}})
})

IncidentRoute.post('/mdt/getIncidents', async(req, res) => {
    Logger.debug('[Mdt API] getIncidents')
    const [result]: any = await db.query('SELECT * FROM _mdt_incident')
    res.json({data: result.map((pItem: any) => {
        return {
            ...pItem,
            civs: JSON.parse(pItem.civs),
            evidence: JSON.parse(pItem.evidence),
            officers: JSON.parse(pItem.officers),
            persons: JSON.parse(pItem.persons),
            vehicles: JSON.parse(pItem.vehicles),
            tags: JSON.parse(pItem.tags),
        }
    }), meta: {ok: true, message: ''}})
})

IncidentRoute.post('/mdt/getIncident', async(req, res) => {
    Logger.debug('[Mdt API] getIncident', req.body)
    const result: any = await getIncidentById(req.body.data.id)
    if (!result) {
        res.json({data: req.body.data, meta: {ok: true, message: ''}})
    }
    res.json({data: result, meta: {ok: true, message: ''}})
})

IncidentRoute.post('/mdt/editIncident', async(req, res) => {
    const pIncident = req.body.data
    const pCharacter = req.body.character
    Logger.debug('[Mdt API] editIncident')
    if (!pIncident.id) {
        await db.query('INSERT INTO _mdt_incident (created_by, created_by_name, title, description, timestamp) VALUES (?, ?, ?, ?, ?)', [pCharacter.id, `${pCharacter.first_name} ${pCharacter.last_name}`, pIncident.title, pIncident.description, Date.now()])
    }
    await db.query(
        `UPDATE _mdt_incident SET title = ?, description =? WHERE id = ?`,
        [
            pIncident.title,
            pIncident.description,
            pIncident.id
        ]
    );
    res.json({data: req.body.data, meta: {ok: true, message: ''}})
})

IncidentRoute.post('/mdt/getWarrants', async(req, res) => {
    Logger.debug('[Mdt API] getWarrants')
    res.json({data: [{
        'incident_id': 1,
        'incident_title': 'Some shit happened...',
        'warrant_expiry_timestamp': 1606599364,
        'civ_name': 'Devlin Weloper',
        'profile_image_url': 'https://i.imgur.com/ttNVaPp.png'
    }], meta: {ok: true, message: ''}})
})
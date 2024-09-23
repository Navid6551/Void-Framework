import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"
import { AddResourceToIncident } from '../incidents';

export const EvidenceRoute = Router();

export const getEvidenceByData = async(pKey: any, pValue: any) => {
    const [result]: any = await db.query(`SELECT * FROM _mdt_evidences WHERE ${pKey} =?`, [pValue])
    
    if (!result[0]) {
        return undefined
    }

    return {
        ...result[0],
        tags: JSON.parse(result[0].tags)
    }
}

EvidenceRoute.post('/mdt/getEvidence', async(req, res) => {
    Logger.debug('[Mdt API] getEvidence')
    const [result] = await db.query('SELECT * FROM _mdt_evidences')
    res.json({data: result, meta: {ok: true, message: ''}})
})

EvidenceRoute.post('/mdt/getSingleEvidence', async(req, res) => {
    Logger.debug('[Mdt API] getSingleEvidence', req.body)
    const pData = req.body.data
    const evidence = await getEvidenceByData('id', pData.id)
    res.json({data: evidence, meta: {ok: true, message: ''}})
})


EvidenceRoute.post('/mdt/addEvidenceToResource', async(req, res) => {
    const pData = req.body.data
    if (pData.create) {
        const insert: any = await db.query('INSERT INTO _mdt_evidences (type, identifier, description, cid) VALUES (?, ?, ?, ?)', [pData.evidence.type, pData.evidence.identifier, pData.evidence.description, pData.evidence.cid])
        if (pData.type === 'incident') {
            await AddResourceToIncident(pData.source_id, 'evidence', {
                ...pData.evidence,
                id: insert[0].insertId
            })
        }
    } else {
        const evidence = await getEvidenceByData('identifier', pData.identifier)
        await AddResourceToIncident(pData.source_id, 'evidence', evidence)
    }
    Logger.debug('[Mdt API] addEvidenceToResource', req.body.data)
    res.json({data: pData.evidence, meta: {ok: true, message: ''}})
})
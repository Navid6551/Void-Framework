import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"


export const ProfilesRoute = Router();

export const GetProfileById = async(pId: any) => {
    const [profiles]: any = await db.query('SELECT * FROM _mdt_profiles WHERE state_id = ?', [pId])
    if (!profiles[0]) {
        return undefined
    }

    return {
        ...profiles[0],
        is_wanted: profiles[0].is_wanted === 0 ? false : true,
        licenses: JSON.parse(profiles[0].licenses),
        tags: JSON.parse(profiles[0].tags),
        evidence: JSON.parse(profiles[0].evidence),
        priors: JSON.parse(profiles[0].priors),
    }
}

ProfilesRoute.post('/mdt/editCivilianProfile', async(req, res) => {
    const pData = req.body.data
    Logger.debug('[Mdt API] editCivilianProfile', pData)
    const doesExist = await GetProfileById(pData.character_id)
    if (!doesExist) {
        await db.query('INSERT INTO _mdt_profiles (state_id, name, profile_image_url, summary) VALUES (?, ?, ?, ?)', [pData.state_id, pData.name, pData.profile_image_url, pData.summary])
        res.json({data: req.body.data, meta: {ok: true, message: ''}})
    }
    res.json({data: req.body.data, meta: {ok: true, message: ''}})
})

ProfilesRoute.post('/mdt/getCivilianProfiles', async(req, res) => {
    Logger.debug('[Mdt API] getCivilianProfiles')
    const [profiles]: any = await db.query('SELECT * FROM _mdt_profiles')
    res.json({data: profiles.map((pItem: any) => {
        return {
           ...pItem,
           is_wanted: pItem.is_wanted === 0 ? false : true,
           licenses: JSON.parse(pItem.licenses),
           tags: JSON.parse(pItem.tags),
           evidence: JSON.parse(pItem.evidence),
           priors: JSON.parse(pItem.priors),
        }
    }), meta: {ok: true, message: ''}})
})
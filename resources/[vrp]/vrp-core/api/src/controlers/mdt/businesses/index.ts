import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"

export const BusinessRoute = Router();

BusinessRoute.post('/mdt/getBusinesses', async(req, res) => {
    Logger.debug('[Mdt API] getBusinesses')
    const bussiness = []
    const [result] = await db.query('SELECT * FROM businesses')
    for (const [k, v] of Object.entries(result)) {
        bussiness.push({
            ...v,
            account_id: v.bank_account_id
        })
    }
    res.json({data: bussiness, meta: {ok: true, message: ''}})
})

BusinessRoute.post('/mdt/getStashByBusinessCode', async(req, res) => {
    Logger.debug('[Mdt API] getBusinessStash')
    res.json({data: {exists: true}, meta: {ok: true, message: ''}})
})

BusinessRoute.post('/mdt/getEmployeesByBusinessId', async(req, res) => {
    Logger.debug('[Mdt API] getBusinessEmployees')
    const bussiness = []
    const [result]: any = await db.query('SELECT * FROM businesses WHERE id = ?', [req.body.data.businessId])
    if (!result) {
        res.json({data: undefined, meta: {ok: false, message: 'Bussiness do not exist'}})
        return
    }

    res.json({data: JSON.parse(result[0].employees), meta: {ok: true, message: ''}})
})
import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"

export const getCharges = Router();

export const GetChargeCatById = async(pId: any) => {
    const [result]: any = await db.query('SELECT * FROM _mdt_charge_category WHERE id =?', [pId])

    if (!result[0]) {
        return undefined
    }

    return result[0].name
}

getCharges.post('/mdt/getCharges', async(req, res) => {
    Logger.debug('[Mdt API] getCharges')
    const [result] = await db.query('SELECT * FROM _mdt_charge')
    res.json({data: result, meta: {ok: true, message: ''}})
})
import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"
import { GetChargeCatById } from '../charges/getCharges';

export const ConfigRoute = Router();

ConfigRoute.post('/mdt/hasConfigPermission', async(req, res) => {
    Logger.debug('[Mdt API] hasConfigPermission')
    res.json({data: {
        steam: true
    }, meta: {ok: true, message: ''}})
})

ConfigRoute.post('/mdt/getAllConfigOptions', async(req, res) => {
    Logger.debug('[Mdt API] getAllConfigOptions')
    const [result] = await db.query(`SELECT * FROM ${req.body.data.table}`)
    res.json({data: result, meta: {ok: true, message: ''}})
})

ConfigRoute.post('/mdt/insertConfigOption', async(req, res) => {
    Logger.debug('[Mdt API] insertConfigOption', req.body.data)

    const valuesData = req.body.data.data
    if (req.body.data.table === '_mdt_charge') {
        const catname = await GetChargeCatById(valuesData.charge_category_id)
        console.log('catname', catname)
        valuesData.category_title = catname
    }
    const columns = Object.keys(valuesData).join(', ');
    const values = Object.values(valuesData);
    const placeholders = values.map(() => `?`).join(', ');
    await db.query(`INSERT INTO ${req.body.data.table} (${columns}) VALUES (${placeholders})`, values);
    res.json({data: true, meta: {ok: true, message: ''}})
})

ConfigRoute.post('/mdt/updateConfigOption', async(req, res) => {
    Logger.debug('[Mdt API] updateConfigOption', req.body.data)
    
    const { data, table } = req.body.data;
    const columns = Object.keys(data).filter(key => key !== 'id');
    const values = columns.map(column => data[column]);
    const setClause = columns.map(column => `${column} = ?`).join(', ');

    await db.query(`UPDATE ${table} SET ${setClause} WHERE id = ?`, [...values, data.id]);
    res.json({data: true, meta: {ok: true, message: ''}})
})
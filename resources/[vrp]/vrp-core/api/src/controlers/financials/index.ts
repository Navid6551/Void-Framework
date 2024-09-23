// financials/getTransactions
import { Router } from 'express';
import db from '../../db';
import { Logger } from '../../tools/logger';
const wow = [
    {
        'id': 'bfad16b2-b1a3-491b-820f-06a08092e426',
        'direction': 'in',
        'amount': 1500,
        'type': 'venmo',
        'date': '2020-06-03T12:55:37Z',
        'comment': 'commentcommentcomment commentcomment comment comment comment comment',
        'from_account_id': 33333,
        'from_account_name': 'Not Drugs',
        'from_civ_name': 'Siz Fulker',
        'to_account_id': 11111,
        'to_account_name': 'Personal',
        'to_civ_name': 'Siz Fulker'
    },
    {
        'id': 'bfad16b2-b1a4-491b-820f-06a08092e426',
        'direction': 'out',
        'amount': 1500,
        'type': 'venmo',
        'date': '2020-06-03T12:55:37Z',
        'comment': 'comment',
        'from_account_id': 33333,
        'from_account_name': 'Not Drugs',
        'from_civ_name': 'Siz Fulker',
        'to_account_id': 11111,
        'to_account_name': 'Personal',
        'to_civ_name': 'Siz Fulker'
    }
]

export const FinancialsApi = Router();
Logger.debug('[Financials API] Initilaze')

FinancialsApi.post('financials/getTransactions', async(req, res) => {
    Logger.debug('[Financials API] getTransactions')
    // const [result]: any = await db.query('SELECT * FROM bank_logs WHERE to_account_id = ? OR from_account_id = ? ORDER BY id DESC', [req.body.data.account_id, req.body.data.account_id])
    // if (!result) {
    //     res.json({data: [], meta: {ok: true, message: ''}})
    //     return
    // }
    res.json({data: wow, meta: {ok: true, message: ''}})
})
import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"

export const LifeinvaderRoute = Router();

LifeinvaderRoute.post('/phone/createEmail', async(req, res) => {
  Logger.debug('[Phone API] createEmail', req.body)
  
  res.json({data: {
    insertId: 1
  }, meta: {ok: true, message: ''}})
})
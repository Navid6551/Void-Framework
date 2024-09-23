import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"

export const TagsRoute = Router();

TagsRoute.post('/mdt/getTags', async(req, res) => {
  Logger.debug('[Mdt API] getTags')
  const [result] = await db.query('SELECT * FROM _mdt_tag_category')
  res.json({data: result, meta: {ok: true, message: ''}})
})

TagsRoute.post('/mdt/editTag', async(req, res) => {
  Logger.debug('[Mdt API] editTag', req.body)
  // const [result] = await db.query('SELECT * FROM _mdt_tag_category')
  res.json({data: [], meta: {ok: true, message: ''}})
})

TagsRoute.post('/mdt/getTagCategories', async(req, res) => {
  Logger.debug('[Mdt API] getTagCategories')
  const [result] = await db.query('SELECT * FROM _mdt_tag_category')
  res.json({data: result, meta: {ok: true, message: ''}})
})
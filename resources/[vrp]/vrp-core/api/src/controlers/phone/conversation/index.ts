import { Router } from 'express';
import db from "../../../db"
import { Logger } from "../../../tools/logger"

export const ConversationRoute = Router();

ConversationRoute.post('/phone/getConversations', async(req, res) => {
  Logger.debug('[Phone API] getConversations', req.body)
  
  res.json({data: [{
    number_from: "1234567444",
    number_to: "1231234321",
    message: "Hello 1",
    timestamp: "2020-06-29T17:00:00Z"
  }, {
    number_from: "1234567441",
    number_to: "1231234321",
    message: "Hello 1",
    timestamp: "2020-06-28T15:00:00Z"
  }], meta: {ok: true, message: ''}})
})

ConversationRoute.post('/phone/getMessages', async(req, res) => {
    Logger.debug('[Phone API] getMessages', req.body)
    var _0x2df50d = "1231234321";
    res.json({data: [{
        number_from: "1234567444",
        number_to: _0x2df50d,
        message: "Hello 2",
        timestamp: "2020-06-28T00:00:00Z"
    }, {
        number_from: _0x2df50d,
        number_to: "1234567444",
        message: "Hello 4",
        timestamp: "2020-06-26T00:00:00Z"
    }, {
        number_from: "1234567444",
        number_to: _0x2df50d,
        message: "Hello 3",
        timestamp: "2020-06-27T00:00:00Z"
    }, {
        number_from: "1234567444",
        number_to: _0x2df50d,
        message: "hello  https://i.imgur.com/D5TdiNt.png  https://i.imgur.com/D5TdiNt.png  https://i.imgur.com/D5TdiNt.png this is my message with images https://i.imgur.com/D5TdiNt.gif?12323 image https://i.imgur.com/D5TdiNt.png another one https://i.imgur.com/D5TdiNt.png",
        timestamp: "2020-06-29T17:00:00Z"
    }, {
        number_from: "1234567441",
        number_to: _0x2df50d,
        message: "Hello 2",
        timestamp: "2020-06-28T00:00:00Z"
    }, {
        number_from: _0x2df50d,
        number_to: "1234567441",
        message: "Hello 4",
        timestamp: "2020-06-21T00:00:00Z"
    }, {
        number_from: "1234567441",
        number_to: _0x2df50d,
        message: "Hello 1",
        timestamp: "2020-06-28T15:00:00Z"
    }], meta: {ok: true, message: ''}})
  })
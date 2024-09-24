import { Router } from 'express';
import { LifeinvaderRoute } from './lifeinvader';
import { ConversationRoute } from './conversation';

export const PhoneApi = Router();

//// Phone Lifeinvader
PhoneApi.use(LifeinvaderRoute)

PhoneApi.use(ConversationRoute)

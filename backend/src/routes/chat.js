import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { chatRequestSchema } from '../schemas/chatSchema.js';
import { chatLimiter } from '../middleware/rateLimiter.js';
import { handleChat } from '../controllers/chatController.js';

const router = Router();

router.post('/', chatLimiter, validate(chatRequestSchema), handleChat);

export default router;
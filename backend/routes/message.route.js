import express from 'express';
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import upload from '../config/fileUpload.js';


const router = express.Router();

// Add file upload middleware for sending messages with media
router.post('/send/:id', isAuthenticated, upload.single('media'), sendMessage);
router.post('/:id', isAuthenticated, getMessage);

export default router;

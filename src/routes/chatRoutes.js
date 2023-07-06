import express from 'express';
import chatController from '../controllers/chatroomController';

// SETUP ROUTER
const router = express.Router();

router.get('/rooms/:userId', chatController.getRoomsList);
router.get('/chats/:roomId', chatController.getChat);
router.post('/rooms', chatController.createRoom);
router.post('/participants', chatController.createParticipant);
router.post('/rooms/participants', chatController.createRoomWithParticipants);

export default router;

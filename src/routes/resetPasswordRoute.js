import express from 'express';
import {
  requestReset,
  processReset,
  checkExpired,
} from '../controllers/resetPassword';

const resetPasswordRoute = express.Router();

resetPasswordRoute.post('/requestReset', requestReset);

resetPasswordRoute.post('/resetPassword/:token', processReset);

resetPasswordRoute.get('/checkExpired', checkExpired);

export default resetPasswordRoute;

import express from 'express';
import { requestReset, processReset } from '../controllers/resetPassword';

const resetPasswordRoute = express.Router();

resetPasswordRoute.post('/requestReset', requestReset);

resetPasswordRoute.post('/resetPassword/:token', processReset);

export default resetPasswordRoute;

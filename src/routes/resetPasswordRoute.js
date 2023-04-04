import express from 'express';
import { requestReset, processReset } from '../controller/resetPassword';

const resetPasswordRoute = express.Router();

resetPasswordRoute.post('/requestReset', requestReset);

resetPasswordRoute.post('/reset-password/:token', processReset);

export default resetPasswordRoute;
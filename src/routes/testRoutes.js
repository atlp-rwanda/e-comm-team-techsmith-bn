/* eslint-disable linebreak-style */
import express from 'express';

const router = express.Router();

router.get('/sample_test', (req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});

export default router;
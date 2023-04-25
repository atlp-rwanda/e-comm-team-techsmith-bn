import express from 'express';
import isBuyer from '../middlewares/verifyIsBuyer';
import feedbackController from '../controllers/feedbackController';
import checkIsLoggedIn from '../middlewares/checkIsLoggedIn';

const router = express.Router();

// CREATING FEEDBACK ON PRODUCTS

router.post('/:pId', isBuyer, feedbackController.createFeedback);

// GETTING FEEDBACK ON A PRODUCT

router.get('/:pId', checkIsLoggedIn, feedbackController.allFeedback);

export default router;

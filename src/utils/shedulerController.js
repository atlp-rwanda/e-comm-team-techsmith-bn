import cron from 'node-cron';
import ProductController from '../controllers/productController.js';
import backUp from './backingUp.js';
import { checkExpired } from '../controllers/resetPassword.js';

// send email every 2 weeks
cron.schedule(' 0 0 24 * *', async () => {
  // console.log('Running product expiration check...');

  // Check the expiration of all products
  await ProductController.expirationOfProducts();
});

// Database back up every day midnight
cron.schedule('0 0 0 * * *', async () => {
  backUp();
});
// send email every month to users who didn't change their password
cron.schedule('0 0 1 */1 *', async () => {
  await checkExpired();
});

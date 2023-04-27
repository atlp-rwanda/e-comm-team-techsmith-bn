import cron from 'node-cron';
import ProductController from '../controllers/productController';
import backUp from './backingUp';

// send email every 2 weeks
cron.schedule(' 0 0 */2 * *', async () => {
  // console.log('Running product expiration check...');

  // Check the expiration of all products
  await ProductController.expirationOfProducts();
});

// Database back up every day midnight
cron.schedule('0 0 0 * * *', async () => {
  backUp();
});

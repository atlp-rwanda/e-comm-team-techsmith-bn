import cron from 'node-cron';
import ProductController from '../controllers/productController';
// send email every 2 weeks
cron.schedule(' 0 0 */2 * *', async () => {
  console.log('Running product expiration check...');

  // Get the current date and time

  // Check the expiration of all products
  const result = await ProductController.expirationOfProducts();

  // Log the result
  console.log(result);
});

// Start the cron scheduler

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import options from '../docs/index';

// SETUP ROUTER

const router = express.Router();

// SETUP SWAGGER

router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(options)));

export default router;

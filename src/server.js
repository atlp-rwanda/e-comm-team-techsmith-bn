/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import allRoutes from './routes/allRoutes.js';
import db from '../database/models/index.js';
// CONFIGURE DOTENV
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => {
  res.send('welcome');
});
app.use('/api', allRoutes);

const { PORT, NODE_ENV } = process.env;

const dbCon = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`DB connected successfully on ${NODE_ENV}`);
  } catch (error) {
    console.log(`db error: ${error.message}`);
  }
};

try {
  app.listen(PORT, () => {
    /* eslint-disable */
    dbCon()
    console.log(`Server listening on port:${PORT}`);
  });
} catch (error) {
  /* eslint-disable */
  console.log(error);
}

export default app;
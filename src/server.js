import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import Sequelize from 'sequelize';
import allRoutes from './routes/allRoutes.js';

// CONFIGURE DOTENV
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', allRoutes);

const { PORT, HOST } = process.env;

const sequelize = new Sequelize(
  process.env.DB_URL,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

sequelize
  .authenticate()
  .then(() => {
    /* eslint-disable */
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    /* eslint-disable */
    console.error('Unable to connect to the database:', err);
  });
try {
  app.listen(PORT, () => {
    /* eslint-disable */
    console.log(`Server listening on port ${HOST}:${PORT}`);
  });
} catch (error) {
  /* eslint-disable */
  console.log(error);
}

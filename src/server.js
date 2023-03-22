import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// CONFIGURE DOTENV
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const { PORT } = process.env;

try {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
} catch (error) {
  console.log(error);
}

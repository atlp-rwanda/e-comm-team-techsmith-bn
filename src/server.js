/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable indent */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import allRoutes from './routes/allRoutes';

// CONFIGURE DOTENV
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', allRoutes);

app.get('/', async(req, res) => {
    res.json(process.env.ENTRY_MESSAGE);
});
const { PORT } = process.env;

try {
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
} catch (error) {
    console.log(error);
}
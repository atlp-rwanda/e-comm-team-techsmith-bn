const dotenv = require("dotenv");
const logger = require('../../src/controllers/logger')
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_URL, PROD_DB_USER, PROD_DB_PASSWORD, PROD_DB_NAME, PROD_DB_URL, PROD_DB_HOST } = process.env;
module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        database_url: DB_URL,
        host: DB_HOST,
        port: DB_PORT,
        dialect: "postgres",
        dialectOptions: {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    },
    production: {
        username: PROD_DB_USER,
        password: PROD_DB_PASSWORD,
        database: PROD_DB_NAME,
        database_url: PROD_DB_URL,
        port: DB_PORT,
        host: PROD_DB_HOST,
        dialect: "postgres",
        dialectOptions: {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    }
}
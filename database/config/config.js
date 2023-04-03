const dotenv = require("dotenv");
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_URL } = process.env;
module.exports =  {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database_name: DB_NAME,
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
    username: DB_USER,
    password: DB_PASSWORD,
    database_name: DB_NAME,
    database_url: DB_URL,
    port: DB_PORT,
    host: DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
  }
}
}
import dotenv from 'dotenv';

const { execute } = require('@getvim/execute');
const logger = require('../controllers/logger');

dotenv.config();

const { DB_PASSWORD, DB_NAME } = process.env;

function restoring() {
  execute(
    `PGPASSWORD="${DB_PASSWORD}" pg_restore -C -d postgres ${DB_NAME}.pgsql`
  )
    .then(async () => {
      logger.databaseLogger.info('Database restore complete');
    })
    .catch((err) => {
      logger.databaseLogger.error(
        `/  Database restore failed : ${err.message}`
      );
    });
}

// In case you want to restore your database uncomment the next line
// for the function to be invoked

// restoring()

export default restoring;

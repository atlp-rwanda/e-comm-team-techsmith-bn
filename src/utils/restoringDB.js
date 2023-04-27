import dotenv from 'dotenv';

const { execute } = require('@getvim/execute');

dotenv.config();

const { DB_PASSWORD, DB_NAME } = process.env;

function restoring() {
  execute(
    `PGPASSWORD="${DB_PASSWORD}" pg_restore -C -d postgres ${DB_NAME}.pgsql`
  )
    .then(async () => {
      console.log('Database restore complete');
    })
    .catch((err) => {
      console.log('error', err);
    });
}

// In case you want to restore your database uncomment the next line
// for the function to be invoked

// restoring()

export default restoring;

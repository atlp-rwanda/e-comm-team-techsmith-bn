import dotenv from 'dotenv';
import { spawn } from 'child_process';

dotenv.config();

const { DB_USER, DB_NAME, DB_PASSWORD, DB_HOST } = process.env;

function backUp() {
  // Use 'cmd.exe' as the shell on Windows
  const shell = process.platform === 'win32' ? 'cmd.exe' : '/bin/bash';

  const command =
    process.platform === 'win32'
      ? `set PGPASSWORD=${DB_PASSWORD} pg_dump -Fc -U ${DB_USER} -d ${DB_NAME} -h ${DB_HOST} -f ${DB_NAME}.pgsql`
      : `PGPASSWORD=${DB_PASSWORD} pg_dump -Fc -U ${DB_USER} -d ${DB_NAME} -h ${DB_HOST} -f ${DB_NAME}.pgsql`;
  // Pass the command and arguments as separate strings to spawn
  const args = process.platform === 'win32' ? ['/c', command] : ['-c', command];

  const childProcess = spawn(shell, args);

  childProcess.stderr.on('message', (data) => {
    // eslint-disable-next-line no-console
    console.error(`stderr: ${data}`);
  });

  childProcess.on('close', (code) => {
    // eslint-disable-next-line no-console
    console.log(`child process exited with code ${code}`);
  });
}

export default backUp;

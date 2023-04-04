import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;
const servers = [
  {
    url: `http://localhost:${PORT}/api`,
    description: 'Local server',
  },
  {
    url: 'https://e-comm-team-techsmith-bn-staging.onrender.com/api/',
    description: 'Production server',
  },
];

export default servers;

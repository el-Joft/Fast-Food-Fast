// import {} from 'dotenv/config';

// const { Pool } = require('pg');

// const connectionString = process.env.DATABASE_URL;

// const pool = new Pool({
//   connectionString,
// });

// export default pool;
import { Pool } from 'pg';
import dbConfig from './config';

const pool = (process.env.NODE_ENV === 'test') ? new Pool(dbConfig.test) : new Pool(dbConfig.database);

export default pool;

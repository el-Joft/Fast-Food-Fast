import {} from 'dotenv/config';

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const testPool = new Pool({
  connectionString,
});

export default testPool;

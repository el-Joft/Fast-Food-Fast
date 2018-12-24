import { Pool } from 'pg';
import dbConfig from './config';

const pool = (process.env.NODE_ENV === 'test') ? new Pool(dbConfig.test) : new Pool(dbConfig.database);

export default pool;


import pool from '../config/databaseConfig';

export const dropOrderTables = () => {
  const queryText = 'DROP TABLE IF EXISTS orders';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export const dropMenuTables = () => {
  const queryText = 'DROP TABLE IF EXISTS menus';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export const dropUsersTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
  
});

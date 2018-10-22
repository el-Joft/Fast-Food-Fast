import pool from '../config/databaseConfig';

/**
 * Drop Tables
 */
const dropUsersTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

const dropMenusTables = () => {
  const queryText = 'DROP TABLE IF EXISTS menus';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

const dropOrdersTables = () => {
  const queryText = 'DROP TABLE IF EXISTS orders';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

dropUsersTables();
dropMenusTables();
dropOrdersTables();

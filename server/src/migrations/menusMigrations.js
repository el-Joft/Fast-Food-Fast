import pool from '../config/databaseConfig';

/**
 * Create Tables
 */
const createMenusTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      menus(
        id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        description TEXT NOT NULL,
        image TEXT NULL,
        price MONEY NOT NULL,
        categoryId INT NOT NULL,
        isAvailable BOOLEAN NOT NULL,
        created_date TIMESTAMP DEFAULT NOW(),
        modified_date TIMESTAMP DEFAULT NOW()
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

export default createMenusTables;

/**
 * Drop Tables
 */
// const dropMenuTables = () => {
//   const queryText = 'DROP TABLE IF EXISTS menus';
//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });

// export {
//   createMenusTables,
//   dropMenuTables,
// };

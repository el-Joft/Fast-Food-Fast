import pool from '../config/databaseConfig';

/**
 * Create Tables
 */
const createOrderTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    orders(
      id SERIAL PRIMARY KEY,
      menuId INT NOT NULL,
      timeOrdered TIME WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
      orderedBy INT NOT NULL,
      quantity   INT NOT NULL,
      totalPrice MONEY NOT NULL,
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

export default createOrderTables;
// /**
//  * Drop Tables
//  */
// const dropOrderTables = () => {
//   const queryText = 'DROP TABLE IF EXISTS orders';
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
//   createOrderTables,
//   dropOrderTables,
// };

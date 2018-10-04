import bcrypt from 'bcryptjs';
import pool from '../config/databaseConfig';
import config from '../../../config';

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
    })
    .catch((err) => {
      console.log(err);
    });
};

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
    })
    .catch((err) => {
      console.log(err);
    });
};

const createUsersTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    users(
    id SERIAL PRIMARY KEY NOT NULL,
    role INT DEFAULT 0,
    email CHARACTER (26) NOT NULL,
    password CHARACTER (250) NOT NULL,
    phone CHARACTER (15),
    firstName CHARACTER varying(26) NOT NULL,
    lastName CHARACTER(26),
    address TEXT,
    city TEXT,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    zipCode CHARACTER VARYING(15)
    )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  const defaultAdmin = () => {
    const password = '123456';
    const hashedPassword = bcrypt.hashSync(password, config.SALT);
    const adminData = {
      role: 1,
      email: 'ottimothy@gmail.com',
      adminPassword: hashedPassword,
      firstname: 'Timothy',
    };
    const values = [
      adminData.role,
      adminData.email,
      adminData.adminPassword,
      adminData.firstname,
    ];
    const userText = 'INSERT INTO users(role, email, password, firstname) VALUES($1, $2, $3, $4 ) RETURNING *';

    pool.query(userText, values, (error, data) => {
      if (error) {
        console.log(`create error --- ${error}`);
      } else {
        console.log('sucessfully created');
      }
    });
  };
  defaultAdmin();
};


dropOrderTables();
dropMenuTables();
dropUsersTables();

createOrderTables();
createMenusTables();
createUsersTables();

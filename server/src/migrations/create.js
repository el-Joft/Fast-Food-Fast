import bcrypt from 'bcryptjs';
import dotEnv from 'dotenv';
import pool from '../config/databaseConfig';

dotEnv.config();

/**
 * Create Tables
 */

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
      pool.end();
    });

  const defaultAdmin = () => {
    const password = '123456';
    const hashedPassword = bcrypt.hashSync(password, 10);
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


const createMenusTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      menus(
        id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        description TEXT NOT NULL,
        image TEXT NULL,
        price INT NOT NULL,
        categoryid INT,
        FOREIGN KEY (categoryid) REFERENCES category (id),
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
      pool.end();
    });
};


const createOrderTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    orders(
      id SERIAL PRIMARY KEY,
      menuid INT NOT NULL,
      FOREIGN KEY (menuId) REFERENCES menus (id),
      timeordered TIME WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
      orderedby INT NOT NULL,
      FOREIGN KEY (orderedby) REFERENCES users (id),
      quantity   INT NOT NULL,
      status VARCHAR(50) DEFAULT 'NEW',
      totalprice INT NOT NULL,
      created_date TIMESTAMP DEFAULT NOW(),
      modified_date TIMESTAMP DEFAULT NOW()
    )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


createUsersTables();
createMenusTables();
createOrderTables();

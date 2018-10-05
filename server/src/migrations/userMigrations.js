import bcrypt from 'bcryptjs';
import pool from '../config/databaseConfig';
// import config from '../../../config';
import {} from 'dotenv/config';

const createUsersTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    users(
    id SERIAL PRIMARY KEY NOT NULL,
    role INT DEFAULT 0,
    email varchar(250) NOT NULL,
    password varchar(250) NOT NULL,
    phone varchar(15),
    firstName varchar(250) NOT NULL,
    lastName varchar(250),
    address TEXT,
    city TEXT,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    zipCode varchar(15)
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
    const hashedPassword = bcrypt.hashSync(password, process.env.SALT);
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

export default createUsersTables;

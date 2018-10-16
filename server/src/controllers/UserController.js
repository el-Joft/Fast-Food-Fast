import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userText, find } from '../helpers/queryHelpers';
import pool from '../config/databaseConfig';
// import config from '../../../config';
dotenv.config();

class UserController {
  static createUser(req, res) {
    const email = req.body.email.trim();
    const hashedPassword = bcrypt.hashSync(req.body.password.trim(), 10);
    /* check if Email address is already existing */
    pool.query(find('email', 'users', 'email', email), (err, response) => {
      if (err) {
        return res.status(500).send('Could not establish database connection');
      }
      if (response.rowCount > 0) {
        return res.status(400).json({ message: 'Email Already Exist' });
      }
      const values = [
        req.body.firstname,
        req.body.lastNnme,
        email,
        req.body.phone,
        hashedPassword,
        req.body.address,
        req.body.city,
        req.body.zipcode,
      ];
      pool.query(userText, values, (error, data) => {
        if (error) {
          res.status(500).json({
            message: 'Could not succesfully create your account, Try Again',
          });
        } else {
          const results = data.rows[0];
          const token = jwt.sign({
            role: results.role,
            email: results.email,
          }, process.env.secret, {
            expiresIn: 86400, // expires in 24 hours
          });
          delete results.password;
          res.status(201).json({
            message: 'Your account was created successfully',
            token,
            results,
          });
        }
      });
    });
  }

  static loginUser(req, res) {
    /* Get the email addres and password from the request body */
    /* Search for user */
    const { email, password } = req.body;
    pool.query(find('*', 'users', 'email', email), (err, user) => {
      if (err) {
        console.log(err);

        res.status(500).json({ message: 'Could not establish database connection' });
      } else {
        const userResult = user.rows[0];
        if (userResult) {
          const token = jwt.sign({
            role: userResult.role,
            email: userResult.email,
          }, process.env.secret, {
            expiresIn: 86400, // expires in 24 hours
          });
          if (bcrypt.compareSync(password, userResult.password.trim())) {
            delete userResult.password;
            res.status(200).json({
              message: 'User login successfull', token, userResult,
            });
          } else {
            res.status(400).json({ message: 'Username or password is not correct' });
          }
        } else {
          res.status(404).json({ message: 'Could not find any user matching your request' });
        }
      }
    });
  }
}
export default UserController;

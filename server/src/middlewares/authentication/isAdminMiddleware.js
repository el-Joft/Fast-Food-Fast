import jwt from 'jsonwebtoken';
// import config from '../../../../config';
import dotenv from 'dotenv';

dotenv.config();

const isAdmin = (req, res, next) => {
  const token = req.body.token || req.headers.token || req.query.token;
  try {
    const verifiedToken = jwt.verify(token, process.env.secret);
    req.userData = verifiedToken;
    if (verifiedToken.role === 0) {
      res.status(403).json({
        message: 'Unauthorized, Not an Admin',
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({
      message: 'Unauthorized',
    });
  }
};
export default isAdmin;

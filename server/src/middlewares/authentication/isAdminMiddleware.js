import jwt from 'jsonwebtoken';
import config from '../../../../config';


const isAdmin = (req, res, next) => {
  const token = req.body.token || req.headers.token || req.query.token;
  try {
    const verifiedToken = jwt.verify(token, config.secret);
    console.log(verifiedToken);
    
    req.userData = verifiedToken;

    if (verifiedToken.role === 0) {
      console.log(verifiedToken.role);
      res.send(403).json({
        message: 'Unauthorized, Not an Admin',
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }
};
export default isAdmin;

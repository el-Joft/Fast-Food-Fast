import jwt from 'jsonwebtoken';
import config from '../../../../config';


export const ensureAutheticated = (req, res, next) => {
  const token = req.body.token || req.headers.token || req.query.token;
  try {
    const verifiedToken = jwt.verify(token, config.secret);
    req.userId = verifiedToken.id;
    return next();
  } catch (error) {
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }
};

export const isAuthorize = (req, res, next) => next();

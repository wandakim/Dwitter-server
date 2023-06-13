import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(' ')[1];
  //Todo: Make it secure

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ error: AUTH_ERROR, message: error.message });
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      console.log(decoded);
      console.log('not user!');
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    req.token = token;
    next();
  });
};

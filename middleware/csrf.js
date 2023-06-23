import bcrypt from 'bcrypt';
import { config } from '../config.js';

export const csrfCheck = (req, res, next) => {
  if (
    req.method === 'GET' ||
    req.method === 'HEAD' ||
    req.method === 'OPTIONS'
  ) {
    return next();
  }

  const csrfHeader = req.get('dwitter-csrf-token');

  if (!csrfHeader) {
    console.warn('Missing CSRF Token', req.headers.origin);
    return res.status(403).json({ message: 'Missing CSRF Token' });
  }

  validateCsrfToken(csrfHeader)
    .then((valid) => {
      if (!valid) {
        console.warn('Invalid CSRF Token', req.headers.origin, csrfHeader);
        return res.status(403).json({ message: 'Invalid CSRF Token' });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    });
};

async function validateCsrfToken(csrfHeader) {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}

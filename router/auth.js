import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/valitator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username should be ad least 5 charactors'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 charactors'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.post('/signup', validateSignup, authController.signUp);
router.post('/login', validateCredential, authController.login);

//사용자가 앱을 열기만 하면 실행되는 코드.
//사용자의 정보를 먼저 받아 와서, 사용자 정보가 있다면 사용자를 설정하고, 그렇지 않다면 로그인 페이지로 이동
router.get('/me', isAuth, authController.me);

export default router;

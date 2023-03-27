import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function signUp(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exist` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId); // 고유한 id로 토큰을 생성.
  res.status(201).json({ token, username });

  res.status();
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  } // 보안과 연결되어있기 때문에 어떤것이 틀린지 알려주지  않음
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username }); // ? username은 왜 같이 보내주는지?
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

// 토큰은 내가 가지고 있는 것이 아니다. 서버에는 시크릿키만 가지고 있는것.
// 데이터베이스에서는 비번을 해쉬화 해서 가지고 있는다. 단방향만 가능하게 해둔 것임.
// 헤드에 토큰 보내주는건 그냥 제이슨으로 보내주는거였음. 유저네임은 왜 보내는지 아직 모르겠음

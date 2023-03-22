import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny')); // 사용할 미들웨어들

app.use('/tweets', tweetsRouter); // 라우터 등록

app.use((req, res, next) => {
  // 처리해 줄 수 없다면 Not Found를 전달
  res.sendStatus(404); // 404만으로도 의미가 충분
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(8080);

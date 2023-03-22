import express from 'express';
import 'express-async-errors';

const router = express.Router();

const tweets = [
  {
    id: '1',
    text: 'I am Maker!',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
  },
  {
    id: '2',
    text: 'Me either Maker!',
    createdAt: Date.now().toString(),
    name: 'Vincent',
    username: 'vincent',
  },
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((t) => t.username === username)
    : tweets;
  res.status(200).json(data);
});

// GET /tweets/:id
// POST /tweets
// PUT /tweets/:id
// DELETE /tweets/:id

export default router;

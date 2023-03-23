// 데이터를 읽고 쓰는 리파티지토리

let tweets = [
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
    name: 'Ellie',
    username: 'ellie',
  },
];

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export async function getAllById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}

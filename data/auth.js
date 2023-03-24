// abcd1234: ~~
let users = [
  {
    id: '1',
    text: 'I am Maker!',
    password: '$2b$10$dM3bFf1mqx2peDdu4Nmu8ux0TJ2RPKqe1jya2CDLF4Xth45lxV.vi',
    name: 'Bob',
    username: 'bob',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}

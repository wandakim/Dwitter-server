// let users = [
//   {
//     id: '1',
//     text: 'I am Maker!',
//     password: '$2b$10$dM3bFf1mqx2peDdu4Nmu8ux0TJ2RPKqe1jya2CDLF4Xth45lxV.vi',
//     name: 'Bob',
//     username: 'bob',
//     url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
//   },
//   {
//     id: '2',
//     username: 'ellie',
//     password: '$2b$10$dM3bFf1mqx2peDdu4Nmu8ux0TJ2RPKqe1jya2CDLF4Xth45lxV.vi',
//     name: 'Ellie',
//     email: 'ellie@gmail.com',
//   },
// ];
import { /* db, */ sequelize } from '../db/database.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  'user',
  {
    // 사용자 모델 정의
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  {
    timestamps: false,
  }
);

export async function findByUsername(username) {
  return User.findOne({ where: { username } });
  // return users.find((user) => user.username === username);
  // return db
  //   .execute('SELECT * FROM users WHERE username=?', [username])
  //   .then((result) => result[0][0]);
}

export async function findById(id) {
  return User.findByPk(id);
  // return users.find((user) => user.id === id);
  // return db
  //   .execute('SELECT * FROM users WHERE id=?', [id])
  //   .then((result) => result[0][0]);
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
  // const created = { ...user, id: Date.now().toString() }; //고유한 id를 만든다.
  // users.push(created);
  // return created.id;

  // const { username, password, name, email, url } = user;
  // return db
  //   .execute(
  //     'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
  //     [username, password, name, email, url]
  //   )
  //   .then((result) => result[0].insertId);
}

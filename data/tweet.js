// 데이터를 읽고 쓰는 리파지토리
// import * as userRepository from './auth.js';
// let tweets = [
//   {
//     id: '1',
//     text: 'I am Maker!',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
//   {
//     id: '2',
//     text: 'Me either Maker!',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
// ];
// ==> use database
// import { db } from '../db/database.js';
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequielize = SQ.Sequelize;

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(User); // 이렇게만 해 주면 알아서 foriegn key 만들어 주고 관계를 정의해 준다.

// const SELECT_JOIN =
//   'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
// const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequielize.col('user.name'), 'name'],
    [Sequielize.col('user.username'), 'username'],
    [Sequielize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};
const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
};

export async function getAll() {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
  });

  // return db
  //   .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
  //   .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });
  // return db
  //   .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
  //   .then((result) => result[0]);
}

export async function getById(id) {
  return Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
  // return db
  //   .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
  //   .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return Tweet.create({ text, userId }).then((data) =>
    this.getById(data.dataValues.id)
  );

  // return db
  //   .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [
  //     text,
  //     new Date(),
  //     userId,
  //   ])
  //   .then((result) => {
  //     console.log(result[0].insertId);
  //     return getById(result[0].insertId);
  //   });
}

export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
    tweet.text = text;
    return tweet.save();
  });
  // return db
  //   .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
  //   .then(() => getById(id));
}

export async function remove(id) {
  return Tweet.findByPk(id).then((tweet) => {
    tweet.destroy();
  });
  // return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}

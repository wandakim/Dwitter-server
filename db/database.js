// import mysql from 'mysql2'; => sequelize에서 자동으로 해준다.
import { config } from '../config.js';
import SQ from 'sequelize';

const { host, port, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// const pool = mysql.createPool({
//   host,
//   user,
//   database,
//   password,
// });

// export const db = pool.promise();

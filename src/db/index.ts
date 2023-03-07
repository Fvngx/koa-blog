import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import config from '../config';
import { dbLogger } from '../logger';

const sequelize = new Sequelize(
  config.db.db_name,
  config.db.db_user,
  config.db.db_pass,
  {
    host: config.db.db_host,
    port: +config.db.db_port,
    // dialect: /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    dialect: 'mysql',
    logging: (msg) => dbLogger.info(msg),
    define: {
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    },
    models: [
      path.join(__dirname, '..', 'model/**/*.ts'),
      path.join(__dirname, '..', 'model/**/*.js'),
    ],
  }
);

const db = async () => {
  await sequelize
    .sync()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log('Unable to connect to the database: ', err);
    });
  // try {
  //   await sequelize.authenticate();
  //   // 自动创建表
  //   sequelize.sync();
  //   console.log('Connection has been established successfully.');
  // } catch (err) {
  //   console.log('Unable to connect to the database: ', err);
  // }
};

export default db;

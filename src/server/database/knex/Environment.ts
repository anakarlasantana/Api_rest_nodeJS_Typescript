import {Knex} from 'knex';
import path from 'path';

export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname,'..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  // No caso de SQLite é necessário fazer uma configuração para atualização de foreign keys//
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
};


export const test: Knex.Config = {
  ...development,
  connection: ':memory:',
};

export const production: Knex.Config = {
  ...development,
};
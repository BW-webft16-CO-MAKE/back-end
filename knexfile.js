const pgConnection = process.env.HEROKU_POSTGRESQL_CHARCOAL_URL

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/comake.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
    pool: {
    	afterCreate: (conn, done) => {
    // runs after a connection is made to the sqlite engine
    	conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
    production: {
      client: "pg",
      connection: pgConnection,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: "./data/migrations",
      },
      seeds: {
        directory: "./data/seeds",
      },
    },
    testing: {
      client: 'sqlite3',
      useNullAsDefault: true, // needed for sqlite
      connection: {
        filename: './data/test.db3',
      },
      migrations: {
        directory: './data/migrations'
      },
      seeds: {
        directory: './data/seeds'
      },
      pool: {
        afterCreate: (conn, done) => {
          // runs after a connection is made to the sqlite engine
          conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
        },
      },
    },
};

// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            charset: 'utf8'
        },
        migrations: {
            directory: __dirname + '/server/data/db/migrations'
        },
        seeds: {
            directory: __dirname + '/server/data/db/seeds/development'
        }
    },

    test: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            database: 'test',
            charset: 'utf8'
        },
        migrations: {
            directory: __dirname + '/server/data/db/migrations'
        },
        seeds: {
            directory: __dirname + '/server/data/db/seeds/test'
        }
    },

    staging: {
        client: 'mysql',
        connection: process.env.CLEARDB_DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/test'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/production'
        }
    }

};

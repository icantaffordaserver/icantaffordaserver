const dotenv = require('dotenv');

// Require this here for the case that we just run the migration scripts
dotenv.config();

// TODO: include process.env.NODE_ENV on export rather than in files using this module
module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL || {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: __dirname + '/server/data/migrations'
        },
        seeds: {
            directory: __dirname + '/server/data/seeds'
        }
    },
    test: {
        client: 'pg',
        connection: 'postgres://localhost:5432/testing',
        migrations: {
            directory: __dirname + '/server/data/migrations'
        },
        seeds: {
            directory: __dirname + '/server/data/seeds'
        }
    }
};

module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/migrahack-db'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
}

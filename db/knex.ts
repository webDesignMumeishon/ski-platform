import knex from 'knex'

const pgsql = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        database : 'ski'
    },
    postProcessResponse: (result) => {
      console.log("PostgreSQL was executed");
      return result
    }
})


export default pgsql
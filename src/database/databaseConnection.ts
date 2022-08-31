import pg from 'pg';

const { Pool } = pg;

const databaseConfig = {
    connectionString: "postgres://postgres:123456@localhost:5432/starfighters"
}

const connection = new Pool(databaseConfig);

export default connection;


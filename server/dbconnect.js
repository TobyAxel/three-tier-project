const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'admin',
  host: 'localhost', // localhost by default
  port: 5432, // 5432 by default
  database: 'postgres' // preppi_db by default
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
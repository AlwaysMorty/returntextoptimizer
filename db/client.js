const { Pool } = require('pg');

const connectionString = process.env.DB_URL;

let pool = null;
if (connectionString) {
  pool = new Pool({ connectionString });
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};

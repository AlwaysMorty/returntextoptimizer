const { pool } = require('./client');

async function runMigrations(customPool = pool) {
  if (!customPool) {
    console.log('No DB_URL provided. Skipping migrations.');
    return;
  }

  await customPool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL
  );`);

  await customPool.query(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT
  );`);

  await customPool.query(`CREATE TABLE IF NOT EXISTS returns (
    id SERIAL PRIMARY KEY,
    product_id TEXT REFERENCES products(id),
    return_reason TEXT
  );`);

  await customPool.query(`CREATE TABLE IF NOT EXISTS suggestions (
    id SERIAL PRIMARY KEY,
    product_id TEXT REFERENCES products(id),
    suggestion TEXT,
    accepted BOOLEAN,
    applied BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
  );`);

  await customPool.query(`CREATE TABLE IF NOT EXISTS analyses (
    id SERIAL PRIMARY KEY,
    product_id TEXT REFERENCES products(id),
    categories JSONB,
    suggestion_id INTEGER REFERENCES suggestions(id),
    created_at TIMESTAMP DEFAULT now()
  );`);

  console.log('Migrations completed');
}

if (require.main === module) {
  runMigrations().then(() => process.exit()).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runMigrations };

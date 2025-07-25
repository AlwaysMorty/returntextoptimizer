const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { pool } = require('./client');

async function loadProducts() {
  if (pool) {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
  }
  const data = fs.readFileSync(path.join(__dirname, '..', 'products.json'), 'utf-8');
  return JSON.parse(data);
}

async function loadReturns() {
  if (pool) {
    const { rows } = await pool.query('SELECT * FROM returns');
    return rows;
  }
  const csv = fs.readFileSync(path.join(__dirname, '..', 'returns.csv'), 'utf-8');
  const records = parse(csv, { columns: true, skip_empty_lines: true });
  return records;
}

module.exports = { loadProducts, loadReturns };
